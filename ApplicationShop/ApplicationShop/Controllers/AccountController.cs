using ApplicationShop.Models.BLL.Main;
using ApplicationShop.Models.ViewModel.Main;
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Text;
using System.IO;
using System.Web.Mvc;
using System.Web.Security;

namespace ApplicationShop.Controllers
{
    public class AccountController : Controller
    {
        AccountBLL _accountBLL = new AccountBLL();
        // GET: Account
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Register(RegisterVM model)
        {
           
            if (_accountBLL.ChekkEmail(model.Email))
            {
                return Json(new { Status = "4", Msg = "ایمیل وارد شده تکراری است" });
            }

            long a = _accountBLL.Register(model);
            if (a > 0)
            {

                FormsAuthentication.SetAuthCookie(a.ToString(), true);

                return Json(new { Status = "3", Msg = "ثبت نام با موفقیت انجام شد" });
            }
            else
            {
                return Json(new { Status = "2", Msg = "خطا در ثبت نام در سایت" });
            }
        }

        public ActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                Response.Redirect(@"~/User/Default");
            }

            return View();
        }
        [HttpPost]
        public JsonResult Login(LoginVM model)
        {
            var t = _accountBLL.Login(model.Email, model.Password);

            if (t == 0)
            {
                return Json(new { Status = t, Msg = "نام کاربری یا رمز عبور اشتباه است" });
            }
            else
            {
                FormsAuthentication.SetAuthCookie(t.ToString(), true);
                return Json(new { Status = t, Msg = "ورود با موفقیت انجام شد" });
            }
        }

      

        public ActionResult SignOut()
        {
            FormsAuthentication.SignOut();
            return Redirect(@"~/");
        }
        public ActionResult RecoveryPassword()
        {
            return View();
        }
    }
}