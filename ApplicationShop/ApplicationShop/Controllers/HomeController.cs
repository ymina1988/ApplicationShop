using ApplicationShop.Models.BLL.Main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApplicationShop.Controllers
{
    public class HomeController : Controller
    {

        AppBLL _appBLL = new AppBLL();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AppList()
        {
            var result = _appBLL.GetAppList();
            return PartialView("/Views/Home/partial/_appList.cshtml", result);
        }
    }
}