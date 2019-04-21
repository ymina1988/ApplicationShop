using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using ApplicationShop.Models.BLL.Main;

namespace ApplicationShop.Controllers
{
    public class As_AdminController : Controller
    {
        // GET: As_Admin
        AccountBLL _accountBLL = new AccountBLL();
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(string User, string Password)
        {
            var result = _accountBLL.AdminLogin(User, Password);

            if (result == 0)
            {
                return Json(new { Status = result, Msg = "نام کاربری یا رمز عبور اشتباه است" });
            }
            else
            {
                FormsAuthentication.SetAuthCookie(result.ToString(), true);
                return Json(new { Status = result, Msg = "ورود با موفقیت انجام شد" });
            }
        }
    }
}