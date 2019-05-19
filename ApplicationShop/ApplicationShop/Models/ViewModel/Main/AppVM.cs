using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApplicationShop.Models.ViewModel.Main
{
    public class AppViewModel
    {
        public int Id { get; set; }
        public string AppName { get; set; }
        public string GroupName { get; set; }
        
        public string AppUrl { get; set; }

        public string ImgUrl { get; set; }
        public string Description { get; set; }
    }

    public class AppDownloadViewModel
    {
        public int Id { get; set; }
        public string AppName { get; set; }
        public string GroupName { get; set; }

        public string AppUrl { get; set; }

        public string ImgUrl { get; set; }
        public string Description { get; set; }
    }
}