using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ApplicationShop.Models.ViewModel.Admin
{
    public class ManageAppViewModel
    {
        public string AppName { get; set; }
        public string Description { get; set; }
    }
    public class AddAppViewModel
    {
        public int Id { get; set; }
        public string AppName { get; set; }
        [AllowHtml]
        public string Description { get; set; }
        public HttpPostedFileBase ImageURL { get; set; }
        public HttpPostedFileBase AppFile { get; set; }

        public string Version { get; set; }
        public Int32 IdGroup { get; set; }
        public List<SelectListItem> GroupItems = new List<SelectListItem>();
    }

}