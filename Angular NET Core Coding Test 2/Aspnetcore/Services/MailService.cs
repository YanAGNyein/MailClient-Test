using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Helpers;

using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Microsoft.Win32.SafeHandles;
using System.Runtime.InteropServices;
using Microsoft.Extensions.Options;
using System.IO;
using System.Net.Mail;
using CsvHelper;
using System.Text;
using System.Globalization;
using System.Net.Mime;
using Microsoft.Extensions.Logging;
using WebApi.Models.Messaging;

namespace WebApi.Services
{
    public enum MailLabels : int
    {
        ASSET_LOAN = 0,
        ASSET_VERIFICATION = 1,
        ASSET_SERVICING = 2,
        ASSET_LOST_DAMAGED = 3,
        ASSET_DONATED = 4,
        ASSET_TRANSFER = 5,
        OTHERS = 6
    };

    public interface IMailService
    {
        Mail CreateResendMail(Mail originMail, List<MailAttachment> originMailAttachments);
        PagedResult<MailModel> GetMails(int userID, int folderID, int pageNumber, int pageSize);
    }

    public class MailService : IMailService, IDisposable
    {
        // Flag: Has Dispose already been called?
        bool disposed = false;
        // Instantiate a SafeHandle instance.
        SafeHandle handle = new SafeFileHandle(IntPtr.Zero, true);
        private DataContext _context;
        private readonly AppSettings _appSettings;
        private ILogger _log;

        public MailService(DataContext context, IOptions<AppSettings> appSettings, ILogger<MailService> log)
        {
            _context = context;
            _appSettings = appSettings.Value;
            _log = log;
        }

        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            Dispose(true);
            GC.Collect(GC.MaxGeneration, GCCollectionMode.Forced);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                handle.Dispose();
                // Free any other managed objects here.
                //
                _context.Dispose();
            }

            disposed = true;
        }

        public Mail CreateResendMail(Mail originMail, List<MailAttachment> originMailAttachments)
        {
            Mail newMail = new Mail();
            List<MailAttachment> newMailAttachments = new List<MailAttachment>();

            newMail._appSettings = originMail._appSettings;
            newMail._log = originMail._log;

            newMail.OriginMailID = originMail.Id;
            newMail.ReceivingUser = originMail.ReceivingUser;
            newMail.SendingUser = originMail.SendingUser;

            newMail.Label = originMail.Label;
            newMail.SentTime = DateTime.Now;
            newMail.SendingUserID = originMail.SendingUserID;
            newMail.ReceivingUserID = originMail.ReceivingUserID;
            newMail.Subject = originMail.Subject;
            newMail.Message = originMail.Message;
            newMail.HasAttachments = originMail.HasAttachments;


            // using var transaction = _context.Database.BeginTransaction();
            // try
            // { 
            AddtoDB(newMail);
            CommittoDB(newMail);

            if (newMail.HasAttachments)
            {
                foreach (var a in originMailAttachments)
                {
                    string filePath = a.SavedPath;
                    string fileName = a.Filename;
                    Attachment attachment = new Attachment(filePath);
                    attachment.Name = fileName;
                    newMail.attachments.Add(attachment);

                    MailAttachment mailAttachment = new MailAttachment();
                    mailAttachment.MailID = newMail.Id;
                    mailAttachment.Filename = fileName;
                    mailAttachment.SavedPath = filePath;
                    newMailAttachments.Add(mailAttachment);
                }
            }

            CommittoDB(newMailAttachments);
                // transaction.Commit();
            // }
            // catch (Exception ex)
            // {
            //     transaction.Rollback();
            // }

            return newMail;
        }

        // Get paginated mails by user id and folder id
        public PagedResult<MailModel> GetMails(int userID, int folderID, int pageNumber, int pageSize)
        {
            var userIdParam = new SqlParameter("@UserID", userID);
            var folderIdParam = new SqlParameter("FolderID", folderID);
            
            // Get Sent Mail
            var queryResult = _context.Mail.Include(g => g.SendingUser).Include(g => g.ReceivingUser)
                                .Where(g => g.SendingUserID == userID);

            if (folderID != 0)
            {
                // Get Inbox Mail
                queryResult = _context.Mail.Include(g => g.SendingUser).Include(g => g.ReceivingUser)
                                .Where(g => g.ReceivingUserID == userID);
            }

           var result = queryResult.OrderByDescending(m => m.SentTime).Select(g => new MailModel
                                {
                                    Id = g.Id,
                                    SendingStaffName = g.SendingUser.StaffName,
                                    SendingStaffEmail = g.SendingUser.StaffEmail,
                                    ReceivingStaffName = g.ReceivingUser.StaffName,
                                    ReceivingStaffEmail = g.ReceivingUser.StaffEmail,
                                    Subject = g.Subject,
                                    Message = g.Message,
                                    SentTime = g.SentTime,
                                    SentSuccessToSMTPServer = g.SentSuccessToSMTPServer,
                                    Read = g.Read,
                                    Starred = g.Starred,
                                    Important = g.Important,
                                    HasAttachments = g.HasAttachments,
                                    Label = g.Label,
                                    Folder = folderID
                                }).AsNoTracking();                                

            var paginResult = DataHelper.GetPaginationList<MailModel>(result, pageNumber, pageSize);
            return paginResult;
        }
        
        private void AddtoDB(Mail newMail, DataContext _context)
        {
            try
            {
                _context.Mail.Add(newMail);
                return;
            }
            //XL add to catch Database update Exception
            catch (DbUpdateException ex)
            {

                throw new AppException(ex.InnerException.Message);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                throw new AppException(ex.Message);
            }
        }

        private void AddtoDB(Mail newMail)
        {
            try
            {
                _context.Mail.Add(newMail);
                return;
            }
            //XL add to catch Database update Exception
            catch (DbUpdateException ex)
            {

                throw new AppException(ex.InnerException.Message);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                throw new AppException(ex.Message);
            }
        }

        private void CommittoDB(IEnumerable<MailAttachment> newMailAttachments)
        {
            try
            {
                _context.MailAttachments.AddRange(newMailAttachments);
                _context.SaveChanges();
                return;
            }
            //XL add to catch Database update Exception
            catch (DbUpdateException ex)
            {

                throw new AppException(ex.InnerException.Message);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                throw new AppException(ex.Message);
            }
        }

        private void AddtoDB(MailAttachment newMailAttachment)
        {
            try
            {
                _context.MailAttachments.Add(newMailAttachment);
                return;
            }
            //XL add to catch Database update Exception
            catch (DbUpdateException ex)
            {

                throw new AppException(ex.InnerException.Message);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                throw new AppException(ex.Message);
            }
        }

        private void CommittoDB(Object obj)
        {
            try
            {
                _context.Entry(obj).State = EntityState.Added;
                _context.SaveChanges();
                return;
            }
            //XL add to catch Database update Exception
            catch (DbUpdateException ex)
            {

                throw new AppException(ex.InnerException.Message);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                throw new AppException(ex.Message);
            }
        }

        // Zack DB-Refactor
        private void DbTracking(object obj, DataContext _context)
        {
            try 
            {
                _context.Entry(obj).State = EntityState.Added;
                return;
            }
            //XL add to catch Database update Exception
            catch (DbUpdateException ex)
            {

                throw new AppException(ex.InnerException.Message);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                throw new AppException(ex.Message);
            }
        }  
    }
}