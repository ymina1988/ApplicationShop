using ApplicationShop.Models.DataBase;
using ApplicationShop.Models.ViewModel.Main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Utilities.DateTime;

namespace ApplicationShop.Models.BLL.Main
{
    public interface IMainSite
    {
        MainSiteHomeLoginVM GetMainSiteHomeLogin(int IdUser);
        bool IsUser(int Id);
    }

    public class MainSiteBLL : IMainSite
    {
        public MainSiteHomeLoginVM GetMainSiteHomeLogin(int IdUser)
        {
            try
            {
                using (var Db = new ApplicationShopEntities())
                {
                    return Db.Users.AsNoTracking().Where(b => b.Id == IdUser).Select(x => new MainSiteHomeLoginVM()
                    {
                        Email = x.Email,
                        FullName = x.Name + " " + x.Family,
                        UserName = x.UserName
                    }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                return new MainSiteHomeLoginVM();
            }
        }

        public bool IsUser(int Id)
        {
            try
            {
                using (var Db = new ApplicationShopEntities())
                {
                    if (Db.UserToRoll.AsNoTracking().FirstOrDefault(b => b.IdUser == Id ) != null)
                    {
                        return true;
                    }
                    return false;
                }
            }
            catch (System.Exception ex)
            {
                return false;
            }
        }
    }
}
