using ApplicationShop.Models.DataBase;
using ApplicationShop.Models.ViewModel.Main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Utilities.DateTime;

namespace ApplicationShop.Models.BLL.Main
{
    public class AppBLL
    {
        public List<AppViewModel> GetAppList()
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                var result = _Db.Applications.Select(v => new AppViewModel()
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

        public List<AppViewModel> GetAppVistList()
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                var result = _Db.Database.SqlQuery<AppViewModel>(
                         @"EXEC [applicationshopAdmin].[SP_MostDownloadedApp]"
                         ).ToList();
                return result;
            }
        }

        public List<AppSearchViewModel> SearchApp(string text)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                var result = _Db.Applications.Where(v => v.AppName.Contains(text)).Select(v => new AppSearchViewModel()
                {
                    Id = v.Id,
                    AppName = v.AppName
                }).Take(3).ToList();

                return result;
            }
        }

        public AppViewModel GetAppDetail(int id)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                var result = _Db.Applications.Where(v=> v.Id == id).Select(v => new AppViewModel()
                {
                    Id = v.Id,
                    AppName = v.AppName,
                    AppUrl = v.AppURL,
                    ImgUrl = v.ImgURL,
                    GroupName = v.Groups.GroupName,
                    Description = v.Description
                }).FirstOrDefault();

                return result;
            }
        }

        public int DownloadApp(int idApp)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                var iduser = int.Parse(HttpContext.Current.User.Identity.Name);

                var result = _Db.Downloads.Any(v => v.IdApp == idApp && v.IdUser == iduser);

                if (!result)
                {
                    var download = new Downloads
                    {
                        IdApp = idApp,
                        IdUser = int.Parse(HttpContext.Current.User.Identity.Name),
                        CreateDateTime = DateTime.Now
                    };

                    _Db.Downloads.Add(download);
                    if (_Db.SaveChanges() > 0)
                    {
                        return download.Id;
                    }
                    else
                    {
                        return 0;
                    }
                }
                else
                {
                    return 0;
                }
            }
        }

        public List<AppDownloadViewModel> AppDownloadList(int id)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                var result = _Db.Downloads.Where(v => v.IdUser == id).Select(v => new AppDownloadViewModel()
                {
                    Id = v.Applications.Id,
                    AppName = v.Applications.AppName,
                    GroupName = v.Applications.Groups.GroupName,
                    ImgUrl = v.Applications.ImgURL,
                    AppUrl = v.Applications.AppURL
                }).ToList();

                return result;
            }
        }
    }
}