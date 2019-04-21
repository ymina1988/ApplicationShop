using ApplicationShop.Models.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApplicationShop.Models.BLL.Main
{
    public class AccountBLL
    {
        public long AdminLogin(string Email, string Password)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                return 0;
            }
        }
    }
}