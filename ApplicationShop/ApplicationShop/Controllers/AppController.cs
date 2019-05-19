using ApplicationShop.Models.BLL.Main;
using ApplicationShop.Models.ViewModel.Main;
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
        CommentBLL _commentBLL = new CommentBLL();
        // GET: App
        public ActionResult Index(int id)
        {
            return View(_appBLL.GetAppDetail(id));
        }


        public ActionResult GetComment(int id)
        {
            var comment = _commentBLL.GetComment(id);
            return PartialView("/Views/App/partial/_commentList.cshtml", comment);
        }

        [HttpPost]
        public ActionResult InsertComment(CommentViewModel model)
        {
            var comment = _commentBLL.InsertComment(model);
            return RedirectToAction("Index", new { id = model.id });

        }

        [HttpPost]
        public JsonResult DownloadApp(int IdApp)
        {
            var result = _appBLL.DownloadApp(IdApp);
            return Json(new { Status = "1" });
        }
    }
}