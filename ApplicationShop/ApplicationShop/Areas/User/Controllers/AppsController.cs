using ApplicationShop.Models.BLL.Main;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApplicationShop.Areas.User.Controllers
{
    public class AppsController : Controller
    {
        AppBLL _appBLL = new AppBLL();
        // GET: User/Apps
        public ActionResult Index()
        {
            var IdUser = int.Parse(User.Identity.Name);

            return View(_appBLL.AppDownloadList(IdUser));
        }

    }
}