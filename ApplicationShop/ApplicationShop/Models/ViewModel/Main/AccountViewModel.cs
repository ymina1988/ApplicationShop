using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ApplicationShop.Models.ViewModel.Main
{
    public class RegisterVM
    {
        public RegisterVM()
        {

        }

        [Required(ErrorMessage = "لطفا نام را وارد کنید")]
        public string Name { get; set; }
        [Required(ErrorMessage = "لطفا نام خانوادگی را وارد کنید")]
        public string Family { get; set; }


        [Required(ErrorMessage = "لطفا موبایل را وارد کنید")]
        public string Mobile { get; set; }

        [Required(ErrorMessage = "لطفا ایمیل را وارد کنید")]
        [EmailAddress(ErrorMessage = "ایمیل معتبر نیست")]
        public string Email { get; set; }
        [Required(ErrorMessage = "لطفا پسورد را وارد کنید")]
        [StringLength(255, ErrorMessage = "پسورد حداقل 6 کارکتر باشد", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

    public class LoginVM
    {
        public LoginVM()
        {

        }
        [Required(ErrorMessage = "لطفا ایمیل را وارد کنید")]
        [EmailAddress(ErrorMessage = "ایمیل معتبر نیست")]
        public string Email { get; set; }
        [Required(ErrorMessage = "لطفا پسورد را وارد کنید")]
        [StringLength(255, ErrorMessage = "پسورد حداقل 6 کارکتر باشد", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        [Display(Name = "حاصل جمع")]
        public string Captcha { get; set; }
    }
}