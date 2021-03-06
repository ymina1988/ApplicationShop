﻿using System;
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

        [HttpPost]
        public JsonResult GetAppList()
        {
            return Json(_manageAppBLL.GetAppList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddApps()
        {
            var result = _manageAppBLL.LoadManageApp();
            return View(result);
        }

        [HttpPost]
        public ActionResult AddApps(AddAppViewModel model)
        {
            var result = _manageAppBLL.Insert(model);
            return RedirectToAction("AddApps");
        }

        public ActionResult EditApps(int Id)
        {
            var result = _manageAppBLL.GetManageAppForEdit(Id);
            return View(result);
        }
        [HttpPost]
        public ActionResult EditApps(AddAppViewModel model)
        {
            var result = _manageAppBLL.Edit(model);
            return RedirectToAction("Index");
        }


        public int DeleteApp(int Id)
        {
            return _manageAppBLL.ChangeStatus(Id);
        }
    }
}