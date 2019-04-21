using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Web;
/**
 * Name : Check Content is Image
 * Description : For Security check File Type of image
 * Version: 0.2
 * Status: Ready To Test
 * Lasted Modified : 1394/11/19 : 09:45
 * Modified By : S.M.Safavi
 * */
namespace Utilities.Image
{
    public static class CheckContentImage
    {
        public const int ImageMinimumBytes = 512;
        /// <summary>
        ///  Check the image mime types &  Check the image extension
        /// </summary>
        /// <param name="postedFile"></param>
        /// <returns></returns>
        public static bool IsImage(this HttpPostedFileBase postedFile)
        {
            if (postedFile.ContentType.ToLower() != "image/jpg" &&
                        postedFile.ContentType.ToLower() != "image/jpeg" &&
                        postedFile.ContentType.ToLower() != "image/pjpeg" &&
                        postedFile.ContentType.ToLower() != "image/gif" &&
                        postedFile.ContentType.ToLower() != "image/x-png" &&
                        postedFile.ContentType.ToLower() != "image/png")
            {
                return false;
            }
            //  Check the image extension
            if (Path.GetExtension(postedFile.FileName).ToLower() != ".jpg"
                && Path.GetExtension(postedFile.FileName).ToLower() != ".png"
                && Path.GetExtension(postedFile.FileName).ToLower() != ".gif"
                && Path.GetExtension(postedFile.FileName).ToLower() != ".jpeg")
            {
                return false;
            }
            //  Attempt to read the file and check the first bytes
            try
            {
                if (!postedFile.InputStream.CanRead)
                {
                    return false;
                }

                if (postedFile.ContentLength < ImageMinimumBytes)
                {
                    return false;
                }
                byte[] buffer = new byte[512];
                postedFile.InputStream.Read(buffer, 0, 512);
                string content = System.Text.Encoding.UTF8.GetString(buffer);
                if (Regex.IsMatch(content, @"<script|<html|<head|<title|<body|<pre|<table|<a\s+href|<img|<plaintext|<cross\-domain\-policy",
                    RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Multiline))
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
            try
            {
                using (var bitmap = new System.Drawing.Bitmap(postedFile.InputStream))
                {
                }
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
        public static bool IsFiles(HttpPostedFileBase fileUpload)
        {
            string[] allowedImageTyps = { "image/gif", "image/jpeg", "image/tiff", "image/x-png", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "audio/mpeg", "video/mpeg", "video/x-msvideo", "application/x-zip-compressed", "application/x-rar-compressed", "application/x-compressed", "application/pdf", "application/zip", "application/vnd.ms-powerpoint", "video/x-flv", "video/mp4", "video/x-ms-wmv" };
            System.Collections.Specialized.StringCollection imageTypes = new System.Collections.Specialized.StringCollection();
            imageTypes.AddRange(allowedImageTyps);
            if (imageTypes.Contains(fileUpload.ContentType))
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