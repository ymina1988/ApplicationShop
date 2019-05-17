using ApplicationShop.Models.BLL.Main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApplicationShop.Controllers
{
    public class AppController : Controller
    {
        AppBLL _appBLL = new AppBLL();
        // GET: App
        public ActionResult Index(int id)
        {
            return View(_appBLL.GetAppDetail(id));
        }
    }
}