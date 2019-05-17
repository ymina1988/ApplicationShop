using System.ComponentModel.DataAnnotations;

namespace ApplicationShop.Models.ViewModel.Main
{
    public class MainSiteHomeLoginVM
    {
        public string FullName { get; set; }
        public string CodeMeli { get; set; }
        public string Photo { get; set; }
        public string CreateShamsiDate { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }

        public string UserName { get; set; }
        public string CreateDate { get; set; }
    }
}
