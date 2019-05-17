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
    }
}