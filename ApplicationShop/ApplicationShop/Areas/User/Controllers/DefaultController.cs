using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApplicationShop.Areas.User.Controllers
{
    public class DefaultController : Controller
    {
        // GET: User/Default
        public ActionResult Index()
        {
            return View();
        }
    }
}