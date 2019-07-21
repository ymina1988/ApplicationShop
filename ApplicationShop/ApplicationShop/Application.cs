using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.ComponentModel;
using System.Web.Mvc;
using ApplicationShop.Models.ViewModel.Admin;

namespace ApplicationShop
{
    public class Application
    {
        private int Id;
        private int idUser;
        private int idGroup;
        private string AppName;
        private int size;
        private string version;
        private string AppUrl;
        private string ImgUrl;
        private string Description;
        private bool IsActive;

        public ActionResult AddApps(AddAppViewModel Model)
        {
            throw new System.NotImplementedException();
        }

        public ActionResult EditApps(AddAppViewModel Model)
        {
            throw new System.NotImplementedException();
        }

        public ActionResult DeleteApp(int AppId)
        {
            throw new System.NotImplementedException();
        }
    }
}