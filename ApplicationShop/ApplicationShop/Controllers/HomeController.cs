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

        public ActionResult AppVistList()
        {
            var result = _appBLL.GetAppVistList();
            return PartialView("/Views/Home/partial/_appVistList.cshtml", result);
        }
   public ActionResult AppLowSize()
        {
            var result = _appBLL.GetAppLowSize();
            return PartialView("/Views/Home/partial/_appLowSize.cshtml", result);
        }


        public JsonResult Search(string q)
        {
            var result = _appBLL.SearchApp(q);
            var json = Json(result, JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;
        }
    }
}