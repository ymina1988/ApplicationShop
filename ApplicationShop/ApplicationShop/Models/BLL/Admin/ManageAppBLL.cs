using ApplicationShop.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ApplicationShop.Models.ViewModel.Admin;
using System.IO;

namespace ApplicationShop.Models.BLL.Admin
{
    public class ManageAppBLL
    {
        public long Insert(AddAppViewModel Model)
        {
            using (ApplicationShopEntities db = new ApplicationShopEntities())
            {
                string Appname = null;
                string Imgname = null;
                if (Model.ImageURL != null)
                {
                    try
                    {
                        Imgname = Guid.NewGuid().ToString().Replace("-", "_") + Path.GetExtension(Model.ImageURL.FileName);
                        Model.ImageURL.SaveAs(System.Web.HttpContext.Current.Server.MapPath(@"~/Content/Upload/img/" + Imgname));
                    }
                    catch (Exception ex)
                    {
                        Imgname = "Error";
                    }
                }

                if (Model.AppFile != null)
                {
                    try
                    {
                        Appname = Guid.NewGuid().ToString().Replace("-", "_") + Path.GetExtension(Model.AppFile.FileName);
                        Model.AppFile.SaveAs(System.Web.HttpContext.Current.Server.MapPath(@"~/Content/Upload/app/" + Appname));
                    }
                    catch (Exception ex)
                    {
                        Appname = "Error";
                    }
                }

                var Applications = new Applications()
                {
                    IdUser = 2,
                    IdGroup = 1,
                    AppName = Model.AppName,
                    Size = Model.AppFile.ContentLength,
                    Version = "1.0.0",
                    AppURL = Appname,
                    ImgURL = Imgname,
                    Description = Model.Description,
                    IsActive = true
                };


                db.Applications.Add(Applications);
                if (db.SaveChanges() > 0)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }

            }
        }
    }
}