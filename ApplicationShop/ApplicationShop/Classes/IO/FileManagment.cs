using System;
using System.Collections.Specialized;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Net;
using System.Web;
using System.Web.UI.WebControls;

namespace Utilities.IO
{
    public class FileManagment
    {
        /// <summary>
        /// متد حذف فایل برروی سرور
        /// </summary>
        /// <param name="FileName">نام فایل به همراه پسوند</param>
        /// <param name="PathFile">مسیر فایل در سرور ، مثال : ~ , upload </param>
        /// <returns>وضعیت عملیات حذف</returns>
        public static bool DeleteFile(string[] Folders, string FileName)
        {
            try
            {
                if (Folders.Length <= 0)
                {
                    return false;
                }
                string _path = string.Empty;
                if (Folders[0] != "~")
                {
                    _path = Path.Combine("~", Path.Combine(Folders), FileName);
                }
                else
                {
                    _path = Path.Combine(Path.Combine(Folders), FileName);
                }
                string pathFile = System.Web.HttpContext.Current.Server.MapPath(_path);
                bool IsValid = System.IO.File.Exists(pathFile);
                if (IsValid)
                {
                    System.IO.File.Delete(pathFile);
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        private static string correctionPath(string URL)
        {
            char _char = URL[0];
            if (_char != '~')
            {
                if (_char == '/')
                {
                    URL = "~" + URL;
                }
                else
                {
                    URL = "~/" + URL;
                }
            }
            return URL;
        }
        /// <summary>
        /// متد ریسایزر تصاویر و آپلود آن در مسیر پیشفرض سرور
        /// </summary>
        /// <param name="newWidthIn">عرض جدید عکس</param>
        /// <param name="newHeightIn">طول جدید عکس</param>
        /// <param name="FileUploadpic">کنترل فایل آپلود</param>
        /// <returns>وضعیت بولین انجام آپلود</returns>
        public static bool ImageResizer(int newWidthIn, int newHeightIn, System.Web.UI.WebControls.FileUpload FileUploadpic)
        {

            // file name sample : 20121025112236cv3d.jpg   Or 20121025112236cv3d_s.jpg

            if (FileUploadpic.HasFile)
            {
                if (!CheckFileType(FileUploadpic.FileName))
                {
                    //lblResult.Text += "<br />" + "نوع فایل نادرست می باشد";
                    return false;
                }
                else if (!CheckFileSize(FileUploadpic))
                {
                    // lblResult.Text += "<br />" + "اندازه فایل بزرگتر از یک مگا بایت می باشد";
                    return false;
                }
                else
                {
                    try
                    {
                        Random rnd = new Random();

                        string uploadPath = string.Empty;
                        uploadPath = "~/assets/fileuploaded/";

                        // Specify the upload directory
                        string FileAddress = string.Empty;

                        string fileName = Path.GetFileNameWithoutExtension(FileUploadpic.FileName) + "_" + rnd.Next(1000, 10000).ToString();
                        string ext = Path.GetExtension(FileUploadpic.FileName);
                        fileName = fileName + ext;
                        FileAddress = uploadPath + fileName;

                        // Specify the upload directory
                        string directory = string.Empty;
                        directory = HttpContext.Current.Server.MapPath(@"..\assets\fileuploaded\");

                        // Create a bitmap of the content of the fileUpload control in memory
                        Bitmap originalBMP = new Bitmap(FileUploadpic.FileContent);

                        // Calculate the new image dimensions
                        int origWidth = originalBMP.Width;
                        int origHeight = originalBMP.Height;
                        float sngRatio = 1;
                        int newWidth = 0;
                        int newHeight = 0;

                        if (origWidth > newWidthIn || origHeight > newHeightIn)
                        {
                            if (origWidth > origHeight)
                            {
                                sngRatio = (float)origWidth / (float)origHeight;
                                newWidth = newWidthIn;
                                newHeight = Convert.ToInt32(newWidthIn / sngRatio);
                            }
                            else if (origWidth < origHeight)
                            {
                                sngRatio = (float)origHeight / (float)origWidth;
                                newHeight = newHeightIn;
                                newWidth = Convert.ToInt32(newHeightIn / sngRatio);
                            }
                            else
                            {
                                if (origWidth > newWidthIn)
                                {
                                    sngRatio = (float)origWidth / (float)newWidthIn;
                                    newWidth = newWidthIn;
                                    newHeight = Convert.ToInt32(origHeight / sngRatio);
                                }
                                else if (origHeight > newHeightIn)
                                {
                                    sngRatio = (float)origHeight / (float)newHeightIn;
                                    newHeight = newHeightIn;
                                    newWidth = Convert.ToInt32(origWidth / sngRatio);
                                }
                            }

                            // Create a new bitmap which will hold the previous resized bitmap
                            Bitmap newBMP = new Bitmap(originalBMP, newWidth, newHeight);

                            // Create a graphic based on the new bitmap
                            Graphics oGraphics = Graphics.FromImage(newBMP);
                            // Set the properties for the new graphic file
                            oGraphics.SmoothingMode = SmoothingMode.HighQuality;
                            //Quality of picture
                            oGraphics.InterpolationMode = InterpolationMode.High;

                            // Draw the new graphic based on the resized bitmap
                            oGraphics.DrawImage(originalBMP, 0, 0, newWidth, newHeight);

                            // >------ Save resize Image ------------- //
                            newBMP.Save(directory + fileName);

                            // Once finished with the bitmap objects, we deallocate them.
                            originalBMP.Dispose();
                            newBMP.Dispose();
                            oGraphics.Dispose();

                            return true;
                        }
                        else
                        {
                            FileUploadpic.SaveAs(HttpContext.Current.Server.MapPath(FileAddress));

                            return true;
                        }

                    }
                    catch (Exception)
                    {
                        return false;
                    }
                }
            }
            else return false;

        }
        /// <summary>
        /// متد ریسایزر تصاویر و ذخیره ی آنها در مسیر تعیین شده
        /// </summary>
        /// <param name="newWidthIn">عرض جدید عکس</param>
        /// <param name="newHeightIn">طول جدید عکس</param>
        /// <param name="originalBMP">عکس بیت مپ</param>
        /// <param name="imageName">نام انتخاب شده برای عکس</param>
        /// <param name="uploadPath">مسیر ذخیره ی عکس</param>
        /// <returns>وضعیت بولین انجام آپلود</returns>
        public static bool ImageResizer(int newWidthIn, int newHeightIn, Bitmap originalBMP, string imageName, string uploadPath)
        {
            // uploadPath="~/assets/fileuploaded/";

            try
            {
                // Specify the upload directory
                string directory = string.Empty;

                if (!Directory.Exists(HttpContext.Current.Server.MapPath(uploadPath)))
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(uploadPath));



                directory = HttpContext.Current.Server.MapPath(uploadPath);




                // Calculate the new image dimensions
                int origWidth = originalBMP.Width;
                int origHeight = originalBMP.Height;
                float sngRatio = 1;
                int newWidth = 0;
                int newHeight = 0;

                if (origWidth > newWidthIn || origHeight > newHeightIn)
                {
                    if (origWidth > origHeight)
                    {
                        sngRatio = (float)origWidth / (float)origHeight;
                        newWidth = newWidthIn;
                        newHeight = Convert.ToInt32(newWidthIn / sngRatio);
                    }
                    else if (origWidth < origHeight)
                    {
                        sngRatio = (float)origHeight / (float)origWidth;
                        newHeight = newHeightIn;
                        newWidth = Convert.ToInt32(newHeightIn / sngRatio);
                    }
                    else
                    {
                        if (origWidth > newWidthIn)
                        {
                            sngRatio = (float)origWidth / (float)newWidthIn;
                            newWidth = newWidthIn;
                            newHeight = Convert.ToInt32(origHeight / sngRatio);
                        }
                        else if (origHeight > newHeightIn)
                        {
                            sngRatio = (float)origHeight / (float)newHeightIn;
                            newHeight = newHeightIn;
                            newWidth = Convert.ToInt32(origWidth / sngRatio);
                        }
                    }

                    // Create a new bitmap which will hold the previous resized bitmap
                    Bitmap newBMP = new Bitmap(originalBMP, newWidth, newHeight);

                    // Create a graphic based on the new bitmap
                    Graphics oGraphics = Graphics.FromImage(newBMP);
                    // Set the properties for the new graphic file
                    oGraphics.SmoothingMode = SmoothingMode.HighQuality;
                    //Quality of picture
                    oGraphics.InterpolationMode = InterpolationMode.High;

                    // Draw the new graphic based on the resized bitmap
                    oGraphics.DrawImage(originalBMP, 0, 0, newWidth, newHeight);

                    // >------ Save resize Image ------------- //
                    newBMP.Save(directory + imageName);

                    // Once finished with the bitmap objects, we deallocate them.
                    originalBMP.Dispose();
                    newBMP.Dispose();
                    oGraphics.Dispose();

                    return true;
                }
                else
                {
                    //FileUploadpic.SaveAs(HttpContext.Current.Server.MapPath(FileAddress));
                    originalBMP.Save(directory + imageName);
                    return true;
                }

            }
            catch (Exception)
            {
                return false;
            }
        }
        /// <summary>
        /// متد ریسایز تصاویر و آپلود آن در مسیر پیشفرض به همراه برگرداندن نام فایل
        /// </summary>
        /// <param name="newWidthIn">عرض جدید عکس</param>
        /// <param name="newHeightIn">طول جدید عکس</param>
        /// <param name="FileUploadpic">کنترل فایل آپلود</param>
        /// <returns>وضعیت و نام فایل آپلود شده</returns>
        public static string ImageResizerAndGetImageName(int newWidthIn, int newHeightIn, System.Web.UI.WebControls.FileUpload FileUploadpic)
        {

            // file name sample : 20121025112236cv3d.jpg   Or 20121025112236cv3d_s.jpg

            if (FileUploadpic.HasFile)
            {
                if (!CheckFileType(FileUploadpic.FileName))
                {
                    //lblResult.Text += "<br />" + "نوع فایل نادرست می باشد";
                    return "invalid!";
                }
                else if (!CheckFileSize(FileUploadpic))
                {
                    // lblResult.Text += "<br />" + "اندازه فایل بزرگتر از یک مگا بایت می باشد";
                    return "invalid";
                }
                else
                {
                    try
                    {
                        Random rnd = new Random();
                        string uploadPath = string.Empty;
                        uploadPath = "~/assets/fileuploaded/";
                        // Specify the upload directory
                        string FileAddress = string.Empty;

                        string fileName = Path.GetFileNameWithoutExtension(FileUploadpic.FileName) + "_" + rnd.Next(1000, 10000).ToString();
                        string ext = Path.GetExtension(FileUploadpic.FileName);
                        fileName = fileName + ext;
                        FileAddress = uploadPath + fileName;

                        // Specify the upload directory
                        string directory = string.Empty;
                        directory = HttpContext.Current.Server.MapPath(@"..\assets\fileuploaded\");

                        // Create a bitmap of the content of the fileUpload control in memory
                        Bitmap originalBMP = new Bitmap(FileUploadpic.FileContent);

                        // Calculate the new image dimensions
                        int origWidth = originalBMP.Width;
                        int origHeight = originalBMP.Height;
                        float sngRatio = 1;
                        int newWidth = 0;
                        int newHeight = 0;

                        if (origWidth > newWidthIn || origHeight > newHeightIn)
                        {
                            if (origWidth > origHeight)
                            {
                                sngRatio = (float)origWidth / (float)origHeight;
                                newWidth = newWidthIn;
                                newHeight = Convert.ToInt32(newWidthIn / sngRatio);
                            }
                            else if (origWidth < origHeight)
                            {
                                sngRatio = (float)origHeight / (float)origWidth;
                                newHeight = newHeightIn;
                                newWidth = Convert.ToInt32(newHeightIn / sngRatio);
                            }
                            else
                            {
                                if (origWidth > newWidthIn)
                                {
                                    sngRatio = (float)origWidth / (float)newWidthIn;
                                    newWidth = newWidthIn;
                                    newHeight = Convert.ToInt32(origHeight / sngRatio);
                                }
                                else if (origHeight > newHeightIn)
                                {
                                    sngRatio = (float)origHeight / (float)newHeightIn;
                                    newHeight = newHeightIn;
                                    newWidth = Convert.ToInt32(origWidth / sngRatio);
                                }
                            }

                            // Create a new bitmap which will hold the previous resized bitmap
                            Bitmap newBMP = new Bitmap(originalBMP, newWidth, newHeight);

                            // Create a graphic based on the new bitmap
                            Graphics oGraphics = Graphics.FromImage(newBMP);
                            // Set the properties for the new graphic file
                            oGraphics.SmoothingMode = SmoothingMode.AntiAlias;
                            //Quality of picture
                            oGraphics.InterpolationMode = InterpolationMode.Default;

                            // Draw the new graphic based on the resized bitmap
                            oGraphics.DrawImage(originalBMP, 0, 0, newWidth, newHeight);

                            // >------ Save resize Image ------------- //
                            newBMP.Save(directory + fileName);

                            // Once finished with the bitmap objects, we deallocate them.
                            originalBMP.Dispose();
                            newBMP.Dispose();
                            oGraphics.Dispose();

                            return fileName;
                        }
                        else
                        {
                            FileUploadpic.SaveAs(HttpContext.Current.Server.MapPath(FileAddress));

                            return fileName;
                        }

                    }
                    catch (Exception)
                    {
                        return "invalid!";
                    }
                }
            }
            else return "invalid!";
        }
        /// <summary>
        /// متد بررسی پسوند یا نوع فایل
        /// </summary>
        /// <param name="fileName">نام فایل به همراه پسوند</param>
        /// <returns>وضعیت معتبر بودن پسوند و نوع فایل</returns>
        static bool CheckFileType(string fileName)
        {
            string ext = Path.GetExtension(fileName);
            switch (ext.ToLower())
            {
                case ".gif":
                    return true;
                case ".png":
                    return true;
                case ".jpg":
                    return true;
                case ".jpeg":
                    return true;
                default:
                    return false;
            }
        }
        /// <summary>
        /// بررسی اندازه فایل
        /// </summary>
        /// <param name="fileName">نام کنترل فایل آپلود</param>
        /// <returns>وضعیت معتبر بودن اندازه فایل</returns>
        static bool CheckFileSize(FileUpload fileName)
        {
            //max file size 2M
            if (fileName.PostedFile.ContentLength >= Math.Pow(2, 20))
                return false;
            else
                return true;
        }
        /// <summary>
        /// متد تغییر نام فایل
        /// </summary>
        /// <param name="OldFileName">نام قبلی فایل</param>
        /// <param name="NewFileName">نام جدید فایل</param>
        /// <param name="FilePath">مسیر جاری فایل</param>
        /// <returns></returns>
        public static bool RenameFile(string OldFileName, string NewFileName, string FilePath)
        {
            string theFileName = Path.Combine(HttpContext.Current.Server.MapPath(FilePath), OldFileName);
            if (File.Exists(theFileName))
            {
                File.Move(HttpContext.Current.Server.MapPath(FilePath) + "\\" + OldFileName,
                    HttpContext.Current.Server.MapPath(FilePath) + "\\" + NewFileName);
                // File.Move(OldFileName, NewFileName);
                return true;
            }
            else return false;
        }
        /// <summary>
        /// متد جا به جایی فایل از یک مسیر دایرکتوری به مسیر جدید
        /// </summary>
        /// <param name="FileName">نام فایل</param>
        /// <param name="oldFilePath">مسیر قبلی فایل</param>
        /// <param name="NewPathFile">مسیر جدید فایل</param>
        /// <returns></returns>
        public static bool MoveFile(string FileName, string oldFilePath, string NewPathFile)
        {
            string theFileName = Path.Combine(HttpContext.Current.Server.MapPath(oldFilePath), FileName);
            if (File.Exists(theFileName))
            {
                File.Move(HttpContext.Current.Server.MapPath(oldFilePath) + "\\" + FileName,
                    HttpContext.Current.Server.MapPath(NewPathFile) + "\\" + FileName);
                // File.Move(OldFileName, NewFileName);
                return true;
            }
            else return false;
        }
        /// <summary>
        /// متد ایجاد فولدر جدید در مسیر مورد نظر
        /// </summary>
        /// <param name="CurrentPath">مسیر جاری که میخواهید فولدر جدید ایجاد کنید</param>
        /// <param name="NewFolderName">نام پوشه جدید</param>
        /// <returns></returns>
        public static bool NewFolder(string[] Folders, string NewFolderName)
        {

            if (Folders.Length <= 0)
            {
                return false;
            }
            string _path = string.Empty;
            if (Folders[0] != "~")
            {
                _path = Path.Combine("~", Path.Combine(Folders), NewFolderName);
            }
            else
            {
                _path = Path.Combine(Path.Combine(Folders), NewFolderName);
            }
            string pathFolder = System.Web.HttpContext.Current.Server.MapPath(_path);
            bool IsValid = System.IO.Directory.Exists(pathFolder);

            if (!IsValid)
            {
                Directory.CreateDirectory(pathFolder);
                return true;
            }
            else
                return false;
        }
        /// <summary>
        /// متد حذف پوشه مسیر مشخص شده
        /// </summary>
        /// <param name="CurrentPath">مسیر جاری</param>
        /// <param name="FolderName">نام فولدری که میخواهید حذف کنید</param>
        /// <param name="DeleteAll">حذف کامل فولدر به همراه فایل ها و زیرفولدرهای موجود در آن</param>
        /// <returns></returns>
        public static bool DeleteFolder(string CurrentPath, string FolderName, bool DeleteAll)
        {
            var folder = HttpContext.Current.Server.MapPath(CurrentPath + FolderName);
            if (Directory.Exists(folder))
            {
                Directory.Delete(folder, DeleteAll);
                return true;
            }
            else
                return false;
        }
        /// <summary>
        /// متد ایجاد فایل و ذخیره سازی
        /// </summary>
        /// <param name="CurrentPath">مسیر جاری ذخیره فایل</param>
        /// <param name="FileName">نام فایل به همراه پسوند . مثال index.html</param>
        /// <returns>وضعیت اجرای فایل</returns>
        public static bool NewFile(string CurrentPath, string FileName)
        {
            var folder = HttpContext.Current.Server.MapPath(CurrentPath);


            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
                File.Create(folder + FileName);
                return true;
            }
            else
                return false;
        }
        /// <summary>
        /// متد ایجاد فایل به همراه محتوای متنی داخلی و ذخیره سازی
        /// </summary>
        /// <param name="CurrentPath">مسیر جاری ذخیره فایل</param>
        /// <param name="FileName">نافایل به همراه پسوند . مثال : index.html</param>
        /// <param name="textContentinFile">محتوای متنی داخل فایل</param>
        /// <returns>وضعیت ایجاد فایل</returns>
        public static bool NewFile(string CurrentPath, string FileName, string[] textContentinFile)
        {
            var folder = HttpContext.Current.Server.MapPath(CurrentPath);


            //if (!Directory.Exists(folder))
            //{
            Directory.CreateDirectory(folder);
            // This text is added only once to the file.
            if (!File.Exists(folder + FileName))
            {
                // Create a file to write to.
                File.WriteAllLines(folder + FileName, textContentinFile);
            }
            // This text is always added, making the file longer over time
            // if it is not deleted.
            // string appendText = "This is extra text" + Environment.NewLine;
            // File.AppendAllText(folder + FileName, appendText);
            return true;
            //}
            //else
            //    return false;
        }
        /// <summary>
        /// متد دانلود فایل و ذخیره سازی آن در مسیر جاری
        /// </summary>
        /// <param name="CurrentPath">مسیر ذخیره سازی فایل </param>
        /// <param name="imageURL">آدرس URL فایل</param>
        /// <returns>وضعیت دانلود فایل</returns>
        public static bool DownloadFile(string CurrentPath, string imageURL)
        {
            var folder = HttpContext.Current.Server.MapPath(CurrentPath);
            string exts = Path.GetExtension(imageURL);
            string strRealname = Path.GetFileName(imageURL);
            WebClient webClient = new WebClient();
            webClient.DownloadFile(imageURL, HttpContext.Current.Server.MapPath(CurrentPath) + strRealname);
            return true;
        }


        public static bool IsFileValid(System.Web.UI.WebControls.FileUpload fileUpload)
        {

            string[] allowedImageTyps = { "image/gif", "image/jpeg", "image/tiff", "image/x-png", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "audio/mpeg", "video/mpeg", "video/x-msvideo", "application/x-zip-compressed", "application/x-rar-compressed", "application/x-compressed", "application/pdf", "application/zip", "application/vnd.ms-powerpoint", " 	video/x-flv", "video/mp4", "video/x-ms-wmv", "application/x-shockwave-flash" };
            StringCollection imageTypes = new StringCollection();
            imageTypes.AddRange(allowedImageTyps);
            if (imageTypes.Contains(fileUpload.PostedFile.ContentType))
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}