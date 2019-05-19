using ApplicationShop.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ApplicationShop.Models.ViewModel.Admin;
using System.IO;
using ApplicationShop.Models.ViewModel.Main;
using System.Web.Mvc;

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
                    IdGroup = Model.IdGroup,
                    AppName = Model.AppName,
                    Size = Model.AppFile.ContentLength,
                    Version = Model.Version,
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

        public long Edit(AddAppViewModel Model)
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
                var Applications = db.Applications.FirstOrDefault(v => v.Id == Model.Id);
                Applications.AppName = Model.AppName;
                Applications.Description = Model.Description;
                Applications.IdGroup = Model.IdGroup;
                Applications.Version = Model.Version;
                Applications.ImgURL = (Model.ImageURL != null ? Imgname : Applications.ImgURL) ;
                Applications.AppURL = (Model.AppFile != null ? Appname : Applications.AppURL);
                return db.SaveChanges() + 1;
            }
        }

        public AddAppViewModel GetManageAppForEdit(int Id)
        {
            try
            {
                AddAppViewModel vm = new AddAppViewModel();

                using (ApplicationShopEntities db = new ApplicationShopEntities())
                {
                    var _Applications = db.Applications.Where(x => x.Id == Id).FirstOrDefault();

                    vm.GroupItems = db.Groups.Select(x => new SelectListItem
                    {
                        Value = x.Id.ToString(),
                        Text = x.GroupName
                    }).ToList();

                    vm.Id = _Applications.Id;
                    vm.Description = _Applications.Description;
                    vm.AppName = _Applications.AppName;
                    vm.IdGroup = _Applications.IdGroup.Value;
                    vm.Version = _Applications.Version;

                    return vm;
                }
            }
            catch (Exception ex)
            {
                return new AddAppViewModel();
            }
        }

        public AddAppViewModel LoadManageApp()
        {
            try
            {
                AddAppViewModel vm = new AddAppViewModel();
                using (ApplicationShopEntities db = new ApplicationShopEntities())
                {
                    vm.GroupItems = db.Groups.Select(x => new SelectListItem
                    {
                        Value = x.Id.ToString(),
                        Text = x.GroupName
                    }).ToList();

                    return vm;
                }
            }
            catch (Exception ex)
            {
                return new AddAppViewModel();
            }
        }

        public List<AppViewModel> GetAppList()
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                var result = _Db.Applications.Where(v => v.IsActive == true).Select(v => new AppViewModel()
                {
                    Id = v.Id,
                    AppName = v.AppName,
                    AppUrl = v.AppURL,
                    ImgUrl = v.ImgURL,
                    GroupName = v.Groups.GroupName,
                    Description = v.Description
                }).ToList();

                return result;
            }
        }

        public int ChangeStatus(int Id)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                var t = _Db.Applications.FirstOrDefault(b => b.Id == Id);
                t.IsActive = !t.IsActive;
                return _Db.SaveChanges() + 1;
            }
        }
    }
}