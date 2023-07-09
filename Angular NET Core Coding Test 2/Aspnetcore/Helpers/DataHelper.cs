using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.Helpers
{
    /// <summary>
    /// This is data manipulation utility like paging, sorting, order, etc.
    /// </summary>
    public static class DataHelper
    {        
        public static PagedResult<T> GetPaginationList<T>(this IQueryable<T> query, 
                                         int page, int pageSize) where T : class
        {
            var result = new PagedResult<T>();
            // Set max limit count
            if(pageSize > result.maxLimit)
            {
                pageSize = result.maxLimit;
            }

            result.CurrentPage = page;
            result.PageSize = pageSize;
            result.RowCount = query.Count();            

            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);
        
            var skip = (page - 1) * pageSize;     
            result.Results = query.Skip(skip).Take(pageSize).ToList();
        
            return result;
        }
    }

    public abstract class PagedResultBase
    {
        public int CurrentPage { get; set; } 
        public int PageCount { get; set; } = 1;
        public int PageSize { get; set; } = 50;         
        public int RowCount { get; set; }
        public int maxLimit = 100;
    
        public int FirstRowOnPage
        {
    
            get { return (CurrentPage - 1) * PageSize + 1; }
        }
    
        public int LastRowOnPage
        {
            get { return Math.Min(CurrentPage * PageSize, RowCount); }
        }
    }

    public class PagedResult<T> : PagedResultBase where T : class
    {
        public IList<T> Results { get; set; }
    
        public PagedResult()
        {
            Results = new List<T>();
        }
    }
}