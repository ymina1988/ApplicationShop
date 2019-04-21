using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApplicationShop.Classes
{
    public static class Replace
    {
        public static string R(string Text)
        {
            return Text.Trim().Replace("۰", "0").Replace("۱", "1").Replace("۲", "2").Replace("۳", "3").Replace("۴", "4").Replace("۵", "5").Replace("۶", "6").Replace("۷", "7").Replace("۸", "8").Replace("۹", "9");
        }


        public static string toRial(this string price)
        {
            decimal pricedec = decimal.Parse(price);
            return pricedec.ToString("#,0 ریال");
        }
        public static string toRial(this decimal price)
        {
            return price.ToString("#,0 ریال");
        }
    }
}