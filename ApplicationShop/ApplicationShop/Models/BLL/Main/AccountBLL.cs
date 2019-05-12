using ApplicationShop.Models.DataBase;
using ApplicationShop.Models.ViewModel.Main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Utilities.DateTime;

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

        public bool ChekkEmail(string Email)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                return _Db.Users.AsNoTracking().Any(b => b.Email.ToLower().Trim() == Email.ToLower().Trim());
            }
        }

        public long Register(RegisterVM model)
        {
            try
            {
                using (ApplicationShopEntities _Db = new ApplicationShopEntities())
                {
                    var user = new Users
                    {
                        UserName = model.Email.ToLower().Trim(),
                        Password = model.Password,
                        Name = model.Name.ToLower().Trim(),
                        Family = model.Family.ToLower().Trim(),
                        phoneNumber = model.Mobile.ToLower().Trim(),
                        Email = model.Email.ToLower().Trim(),
                        IsActive = true,
                    };
                     user.UserToRoll.Add(new UserToRoll() { IdRoll = 2 });
                    _Db.Users.Add(user);
                    if (_Db.SaveChanges() > 0)
                    {
                        return user.Id;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }
            catch (System.Exception ex)
            {
                return 0;
            }
        }

        public long Login(string Email, string Password)
        {
            using (ApplicationShopEntities _Db = new ApplicationShopEntities())
            {
                string P = Password;
                var t = _Db.Users.AsNoTracking().FirstOrDefault(b => b.Email.ToLower().Trim() == Email.ToLower().Trim() && b.Password == P && b.IsActive == true);
                if (t == null)
                {
                    return 0;
                }
                else
                {
                    return t.Id;
                }
            }
        }
    }
}