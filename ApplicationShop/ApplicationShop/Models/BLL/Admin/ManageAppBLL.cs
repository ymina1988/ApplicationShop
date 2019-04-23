using ApplicationShop.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ApplicationShop.Models.ViewModel.Admin;

namespace ApplicationShop.Models.BLL.Admin
{
    public class ManageAppBLL
    {
        public long Insert(AddAppViewModel Model, HttpPostedFile imageURL, HttpPostedFile downloadURL)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {

                return 0;
            }
        }
    }
}