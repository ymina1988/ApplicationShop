using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using ApplicationShop.Models.BLL.Admin;
using ApplicationShop.Models.ViewModel.Admin;

namespace ApplicationShop.Areas.Admin.Controllers
{
    public class ManageAppsController : Controller
    {
        ManageAppBLL _manageAppBLL = new ManageAppBLL();
        // GET: Admin/ManageApps
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddApps(AddAppViewModel model,HttpPostedFile imageURL,HttpPostedFile downloadURL)
        {
            var result = _manageAppBLL.Insert(model,imageURL,downloadURL);
            return View();
        }

        public ActionResult EditApps()
        {
            return View();
        }
    }
}