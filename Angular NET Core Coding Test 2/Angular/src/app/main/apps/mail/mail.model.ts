import { AngularMaterialElementsComponent } from "@/main/angular-material-elements/angular-material-elements.component";

export class Mail
{
    id: string;
    sendingStaffName: string;
    sendingStaffEmail: string;
    receivingStaffName: string;
    receivingStaffEmail: string;
    subject: string;
    message: string;
    sentTime: Date;
    sentSuccessToSMTPServer: boolean;
    read: boolean;
    starred: boolean;
    important: boolean;
    hasAttachments: boolean;
    label: number;
    folder: number;
    /**
     * Constructor
     *
     * @param mail
     */
    constructor(mail)
    {
        this.id = mail.id;
        this.sendingStaffName = mail.sendingStaffName;
        this.sendingStaffEmail = mail.sendingStaffEmail;
        this.receivingStaffName = mail.receivingStaffName;
        this.receivingStaffEmail = mail.receivingStaffEmail;
        this.subject = mail.subject;
        this.message = mail.message;
        this.sentTime = new Date(mail.sentTime);
        this.sentSuccessToSMTPServer = mail.sentSuccessToSMTPServer;
        this.read = mail.read;
        this.starred = mail.starred;
        this.important = mail.important;
        this.hasAttachments = mail.hasAttachments;
        this.label = mail.label;
        this.folder = mail.folder;
    }

    /**
     * Toggle star
     */
    toggleStar(): void
    {
        this.starred = !this.starred;
    }

    /**
     * Toggle important
     */
    toggleImportant(): void
    {
        this.important = !this.important;
    }
}
export class HeaderMail{

totalRows: number;
pageNumber :number;
rowsOfPage:number;
results :Mail[];
folderId : number;
constructor(headerMail)
{
   this.totalRows = headerMail.totalRows;
   this.results = headerMail.results;
   this.pageNumber = headerMail.pageNumber;
   this.rowsOfPage = headerMail.rowsOfPage;
   this.folderId = headerMail.folderId;
}
}
