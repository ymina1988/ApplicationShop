using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
/// <summary>
/// کلاس کار با رشته ها و کارکترهای داده
/// </summary>
/// 
/**
 * Name : i-Data Strings
 * Description : For Work with strings
 * Version: 0.2
 * Status: Ready To Test
 * Lasted Modified : 1394/11/19 - 13:40
 * Modified By : S.M.Safavi
 * */
namespace Utilities.DateTime
{
    public static class iDataStrings
    {

        static string[,] One = new string[10, 2];
        static string[,] Tow = new string[10, 2];
        static string[,] Tree = new string[10, 2];
        static string[,] Four = new string[10, 2];
        static string[] Cut3Str = new string[6];
        static int HezarehControl;
        /// <summary>
        /// متد تبدیل رقم عددی به حروف
        /// </summary>
        /// <param name="k"></param>
        /// <returns></returns>
        public static string MSMNumStFar(string k)
        {
            One[0, 0] = "0"; One[0, 1] = "";
            One[1, 0] = "1"; One[1, 1] = "يك";
            One[2, 0] = "2"; One[2, 1] = "دو";
            One[3, 0] = "3"; One[3, 1] = "سه";
            One[4, 0] = "4"; One[4, 1] = "چهار";
            One[5, 0] = "5"; One[5, 1] = "پنج";
            One[6, 0] = "6"; One[6, 1] = "شش";
            One[7, 0] = "7"; One[7, 1] = "هفت";
            One[8, 0] = "8"; One[8, 1] = "هشت";
            One[9, 0] = "9"; One[9, 1] = "نه";

            Tow[1, 0] = "11"; Tow[1, 1] = "يازده";
            Tow[2, 0] = "12"; Tow[2, 1] = "دوازده";
            Tow[3, 0] = "13"; Tow[3, 1] = "سيزده";
            Tow[4, 0] = "14"; Tow[4, 1] = "چهارده";
            Tow[5, 0] = "15"; Tow[5, 1] = "پانزده";
            Tow[6, 0] = "16"; Tow[6, 1] = "شانزده";
            Tow[7, 0] = "17"; Tow[7, 1] = "هفده";
            Tow[8, 0] = "18"; Tow[8, 1] = "هجده";
            Tow[9, 0] = "19"; Tow[9, 1] = "نوزده";

            Tree[1, 0] = "10"; Tree[1, 1] = "ده";
            Tree[2, 0] = "20"; Tree[2, 1] = "بيست";
            Tree[3, 0] = "30"; Tree[3, 1] = "سي";
            Tree[4, 0] = "40"; Tree[4, 1] = "چهل";
            Tree[5, 0] = "50"; Tree[5, 1] = "پنجاه";
            Tree[6, 0] = "60"; Tree[6, 1] = "شصت";
            Tree[7, 0] = "70"; Tree[7, 1] = "هفتاد";
            Tree[8, 0] = "80"; Tree[8, 1] = "هشتاد";
            Tree[9, 0] = "90"; Tree[9, 1] = "نود";

            Four[1, 0] = "100"; Four[1, 1] = "صد";
            Four[2, 0] = "200"; Four[2, 1] = "دويست";
            Four[3, 0] = "300"; Four[3, 1] = "سيصد";
            Four[4, 0] = "400"; Four[4, 1] = "چهارصد";
            Four[5, 0] = "500"; Four[5, 1] = "پانصد";
            Four[6, 0] = "600"; Four[6, 1] = "ششصد";
            Four[7, 0] = "700"; Four[7, 1] = "هفتصد";
            Four[8, 0] = "800"; Four[8, 1] = "هشتصد";
            Four[9, 0] = "900"; Four[9, 1] = "نهصد";

            string MsmStr = "";
            string[] Hezareh = new string[5];
            Hezareh[2] = " هزار و ";
            Hezareh[3] = " ميليون و ";
            Hezareh[4] = " ميليارد و ";
            Hezareh[4] = " بيليون و ";
            if (k.Length <= 3)
                return MSMNumFarLen3(k);
            else
            {
                MSMCut3(k);
                for (int h = HezarehControl; h >= 1; --h)
                    if (Cut3Str[h] != "000") MsmStr = MsmStr + MSMNumFarLen3(Cut3Str[h]) + Hezareh[h];
            }
            //1000 - 10000 , ...
            if (k.PadRight(3) == "000")
                return MsmStr.PadLeft(MsmStr.Length - 2).Trim();
            else
                return MsmStr.Trim();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="mehr"></param>
        static void MSMCut3(string mehr)
        {
            HezarehControl = 1;
            while (mehr != "")
            {
                if (mehr.Length > 3)
                {
                    Cut3Str[HezarehControl] = mehr.Substring(mehr.Length - 3);
                }
                else
                {
                    Cut3Str[HezarehControl] = mehr;
                    return;
                }
                mehr = mehr.Substring(0, mehr.Length - 3);
                HezarehControl = HezarehControl + 1;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        static string MSMNumFarLen3(string i)
        {
            switch (i.Length)
            {
                case 1:
                    return One[Convert.ToInt16(i), 1];
                //break;
                case 2:
                    if (i.Substring(i.Length - 1, 1) == "0")
                        return Tree[Convert.ToInt16(i.Substring(0, 1)), 1];
                    else if (Convert.ToInt16(i) >= 11 && Convert.ToInt16(i) <= 19)
                        return Tow[Convert.ToInt16(i.Substring(i.Length - 1, 1)), 1];
                    else
                        return Tree[Convert.ToInt16(i.Substring(0, 1)), 1]
                            + " و " + One[Convert.ToInt16(i.Substring(i.Length - 1, 1)), 1];
                case 3:
                    if (i.Substring(1, 1) == "0" && i.Substring(0, 1) != "0")
                    {
                        //001
                        if (Four[Convert.ToInt16(i.Substring(0, 1)), 1] != "")
                            if (One[Convert.ToInt16(i.Substring(i.Length - 1, 1)), 1] == "")
                                return Four[Convert.ToInt16(i.Substring(0, 1)), 1];
                            else
                                return Four[Convert.ToInt16(i.Substring(0, 1)), 1] +
                                    " و " + One[Convert.ToInt16(i.Substring(i.Length - 1, 1)), 1];
                        else
                            return One[Convert.ToInt16(i.Substring(i.Length - 1, 1)), 1];
                    }
                    else if (i.Substring(1, 1) == "0" && i.Substring(i.Length - 1, 1) == "0")
                        return Four[Convert.ToInt16(i.Substring(0, 1)), 1];
                    else if (i.Substring(i.Length - 1, 1) == "0")
                        return Four[Convert.ToInt16(i.Substring(0, 1)), 1] + " و " +
                            Tree[Convert.ToInt16(i.Substring(1, 1)), 1];
                    else if (Convert.ToInt16(i.Substring(1, 2)) >= 11 && Convert.ToInt16(i.Substring(1, 2)) <= 19)
                        return Four[Convert.ToInt16(i.Substring(0, 1)), 1] + " و " +
                            Tow[Convert.ToInt16(i.Substring(2, 1)), 1];
                    else
                        return Four[Convert.ToInt16(i.Substring(0, 1)), 1] + " و " +
                            Tree[Convert.ToInt16(i.Substring(1, 1)), 1] + " و " +
                            One[Convert.ToInt16(i.Substring(i.Length - 1, 1)), 1];
            }
            return "";
        }
        /// <summary>
        /// متد تبدیل تاریخ عدیدی به حروفی شمسی
        /// </summary>
        /// <param name="Date"></param>
        /// <returns></returns>
        public static string Datetostr(string Date)
        {
            string month, day, year;
            day = Date.Substring(6, 2);
            month = Date.Substring(4, 2);
            year = Date.Substring(0, 4);
            if ((Convert.ToInt32(year) > 1300) || (Convert.ToInt32(year) < 1499))
            {
                switch (Convert.ToInt32(month))
                {
                    case 1: month = "فروردين"; break;
                    case 2: month = "ارديبهشت"; break;
                    case 3: month = "خرداد"; break;
                    case 4: month = "تير"; break;
                    case 5: month = "مرداد"; break;
                    case 6: month = "شهريور"; break;
                    case 7: month = "مهر"; break;
                    case 8: month = "آبان"; break;
                    case 9: month = "آذر"; break;
                    case 10: month = "دي"; break;
                    case 11: month = "بهمن"; break;
                    case 12: month = "اسفند"; break;
                }

                day = MSMNumStFar(day) + "م ";
                //day=copy(day,3,length(day));
                if (day == " و سهم ")
                    day = " سوم ";
                if (day == "بيست و سهم ")
                    day = " بيست و سوم ";
                if (day == "سيم ")
                    day = " سي ام ";
                if (day.Substring(0, 2) == " و")
                    day = day.Substring(2, day.Length - 2);
                year = MSMNumStFar(year);

                return (day + month + " ماه " + year);
            }
            else return ("تاريخ نامعتبر است");
        }

        /// <summary>
        /// متد برگرداندن یک اسپیلیت از یک رشته اسپیلیت شده با یک کارکتر  ثابت
        /// </summary>
        /// <param name="index"></param>
        /// <returns></returns>
        public static string getOneSplitOFString(string str, char chr, int index)
        {
            string[] split = str.Split(new char[] { chr }, StringSplitOptions.RemoveEmptyEntries);
            return split[index].ToString();
        }
        /// <summary>
        /// متد برگرداندن چندین اسپیلیت از یک رشته با استفاده از ایندکس شروع و پایان
        /// </summary>
        /// <param name="str">رشته</param>
        /// <param name="chr">کارکتر اسپیلیت کننده رشته</param>
        /// <param name="startIndex">ایندکس شروع</param>
        /// <param name="endIndex">ایندکس پایان</param>
        /// <returns></returns>
        public static string getMultiSplitOfString(string str, char chr, int startIndex, int endIndex)
        {
            string returnedStr = string.Empty;
            for (int i = startIndex; i <= endIndex; i++)
            {
                returnedStr += getOneSplitOFString(str, chr, i) + "/";
            }
            return returnedStr;
        }

        /// <summary>
        /// متد جداسازی رشته بر حسب طول جداسازی و قراردادن آن در لیست
        /// </summary>
        /// <param name="value">رشته</param>
        /// <param name="chunkSize">سایز جداسازی</param>
        /// <returns>لیست جدا سازی شده</returns>
        public static List<string> GetChunkss(string value, int chunkSize)
        {
            List<string> triplets = new List<string>();
            for (int i = 0; i < value.Length; i += chunkSize)
                if (i + chunkSize > value.Length)
                    triplets.Add(value.Substring(i));
                else
                    triplets.Add(value.Substring(i, chunkSize));

            return triplets;
        }
        /// <summary>
        /// متد اصلاح حروف خاص برای استفاده در کویری های جستجو فارسی در پایگاه داده
        /// </summary>
        /// <param name="textString">رشته فارسی</param>
        /// <returns>رشته فارسی اصلاح شده</returns>
        public static string CorrectPersianString(this string textString)
        {
            return textString.Trim().Replace("ی", "ي").Replace("ك", "ک").Replace("ك", "ک");
        }
        /// <summary>
        /// تبدیل اعداد انگلیسی به فارسی
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string ToPersianNumber(this string input)
        {
            if (input.Trim() == "") return "";

            //۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹
            input = input.Replace("0", "۰");
            input = input.Replace("1", "۱");
            input = input.Replace("2", "۲");
            input = input.Replace("3", "۳");
            input = input.Replace("4", "۴");
            input = input.Replace("5", "۵");
            input = input.Replace("6", "۶");
            input = input.Replace("7", "۷");
            input = input.Replace("8", "۸");
            input = input.Replace("9", "۹");
            return input;
        }

        public static string ConvertPersianNumber(this string input)
        {
            return input.Replace('0', '\u06f0')
                    .Replace('1', '\u06f1')
                    .Replace('2', '\u06f2')
                    .Replace('3', '\u06f3')
                    .Replace('4', '\u06f4')
                    .Replace('5', '\u06f5')
                    .Replace('6', '\u06f6')
                    .Replace('7', '\u06f7')
                    .Replace('8', '\u06f8')
                    .Replace('9', '\u06f9');

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="strhtml"></param>
        /// <returns>Boolean</returns>
        public static bool isContainsHTML(this string strhtml)
        {
            //not used this method!
            if (strhtml.Contains("<html>"))
                return true;
            if (strhtml.Contains("<p>"))
                return true;
            if (strhtml.Contains("<div>"))
                return true;
            if (strhtml.Contains("<h1>"))
                return true;
            if (strhtml.Contains("<span>"))
                return true;
            if (strhtml.Contains("&nbsp;"))
                return true;
            if (strhtml.Contains("<br/>"))
                return true;
            if (strhtml.Contains("<img>"))
                return true;
            if (strhtml.Contains("<table>"))
                return true;
            if (strhtml.Contains("<tbody>"))
                return true;
            if (strhtml.Contains("<tr>"))
                return true;
            if (strhtml.Contains("<td>"))
                return true;
            if (strhtml.Contains("</a>"))
                return true;
            if (strhtml.Contains("<table>"))
                return true;
            if (strhtml.Contains("<table>"))
                return true;
            if (strhtml.Contains("<table>"))
                return true;
            if (strhtml.Contains("<table>"))
                return true;
            if (strhtml.Contains("<table>"))
                return true;
            if (strhtml.Contains("<table>"))
                return true;
            if (strhtml.Contains("<table>"))
                return true;
            if (strhtml.Contains("<table>"))
                return true;
            return false;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns>Boolean</returns>
        public static bool isHTML(this string CheckString)
        {
            return Regex.IsMatch(CheckString, "<(.|\n)*?>");
        }
        /// <summary>
        /// متد چک کردن عکس در رشته 
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns>Boolean</returns>
        public static bool isImage(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpg|gif|png|jpeg|ttf))(?:\?([^#]*))?(?:#(.*))?");
        }
        /// <summary>
        /// متد چک کردن عکس در آدرس وب
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isImageWeb(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"https?://[\w./]+\/[\w./]+\.(bmp|png|jpg|gif)");
        }
        /// <summary>
        /// متد چک کردن فقط عدد
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns>Boolean</returns>
        public static bool isNumber(this string CheckString)
        {
            //چک کردن اعداد انگلیسی
            if (Regex.IsMatch(CheckString, @"^\d$"))
                return true;
            //چک کردن اعداد فارسی
            else if (Regex.IsMatch(CheckString, @"^[\p{N}\.]+$"))
                return true;
            else return false;
        }
        /// <summary>
        /// متد چک کردن ایمیل
        /// </summary>
        /// <param name="EmailAddress"></param>
        /// <returns>Boolean</returns>
        public static bool isEmail(this string EmailAddress)
        {
            Regex _regex = new Regex(@"^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$");
            if (_regex != null && !_regex.IsMatch(EmailAddress))
                return false;
            else return true;
        }
        /// <summary>
        /// متد چک کردن معتبر بودن متن فقط فارسی
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns>Boolean</returns>
        public static bool isPersianText(this string CheckString)
        {
            //stackoverflow.com/questions/10561590/regex-for-check-the-input-string-is-just-in-persian-language
            //^[\u0600-\u06ff\s]+$|[\u0750-\u077f\s]+$|[\ufb50-\ufc3f\s]+$|[\ufe70-\ufefc\s]+$|[\u06cc\s]+$|[\u067e\s]+$|[\u06af\s]$|[\u0691\s]+$|^$
            return Regex.IsMatch(CheckString, @"^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]+$");
        }

        /// <summary>
        /// متد چک کردن متن فقط انگلیسی
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns>Boolean</returns>
        public static bool isLatinText(this string CheckString)
        {
            //چک کردن حروف انگلیسی
            if (Regex.IsMatch(CheckString, @"^[A-Za-z]+$"))
                return true;
            //چک کردن حروف اسکی انگلیسی
            else if (Regex.IsMatch(CheckString, @"^[^\W\d_]+$"))
                return true;
            else return false;
        }
        /// <summary>
        /// متد چک کردن معتبر بودن آدرس وب URL
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns>Boolean</returns>
        public static bool isURL(this string CheckString)
        {
            //stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
            return Regex.IsMatch(CheckString, @"(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6}|:[0-9]{3,4})\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)");
        }
        /// <summary>
        /// متد چک کردن آدرس مسیر سرور مثال : c:\\intetop
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isMapPath(this string CheckString)
        {
            //stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
            return Regex.IsMatch(CheckString, @"([A-Z]:\\[^/:\*\?<>\|]+\.\w{2,6})|(\\{2}[^/:\*\?<>\|]+\.\w{2,6})");
        }

        /// <summary>
        /// متد چک کردن پسورد
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isPassword(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"(^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}");
        }

        /// <summary>
        /// متد چک آی پی
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isIP(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"^(?:(?:1\d{0,2}|[3-9]\d?|2(?:[0-5]{1,2}|\d)?|0)\.){3}(?:1\d{0,2}|[3-9]\d?|2(?:[0-5]{1,2}|\d)?|0)$");
        }
        /// <summary>
        /// متد چککردن مک آدرس
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isMacAddress(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$");
        }
        /// <summary>
        /// متد چک کردن موبایل بین المللی
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isMobile(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @" ^[0]{1}[19]{1}[0-9]{8,9}$");
        }
        /// <summary>
        /// متد چک کردن موبایل ایران
        ///matches :  09124455444 00989124455444 +989124455444
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isIranMobile(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"^(((\+{1})|(0{2}))98|(0{1}))9[1-9]{1}\d{8}\Z$");
        }

        /// <summary>
        ///matches :  {CA373C30-293E-4DB8-A5E4-07AEA8D3F16E} | {01234567-8998-7654-3210-012345678998} | {ABCDEFFE-DCBA-ABCD-EFFE-DCBAABCDEFFE}
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isGUID(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"^\{[A-Fa-f\d]{8}-[A-Fa-f\d]{4}-[A-Fa-f0\d]{4}-[A-Fa-f\d]{4}-[A-Fa-f\d]{12}\}$");
        }
        /// <summary>
        /// متد چک کردن تاریخ شمسی
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isPersianDate(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$");
        }

        /// <summary>
        /// 	متد چک کردن تاریخ میلادی
        ///Matches Format : yyyy/MM/dd
        ///Matches : 2010/12/09 1987-01-01 1988.2.1
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isMiladiDate(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"^(19|20)\d\d[-/.]([1-9]|0[1-9]|1[012])[- /.]([1-9]|0[1-9]|[12][0-9]|3[01])$");
        }

        /// <summary>
        /// متد چک کردن کد هگزاری رنگ : #fffaa0;
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool IsColorHex(this string checkString)
        {
            return Regex.IsMatch(checkString, @"^#(\d{6})|^#([A-F]{6})|^#([A-F]|[0-9]){6}");
        }
        /// <summary>
        /// متد چک کردن شماره تلفن بین المللی
        /// Matches : 073-386-2612 , 0443862612 , 076 858 7777 , +27 76 858 7777 , 0027 765877777 , 0956 33 8881234
        /// </summary>
        /// <param name="CheckString"></param>
        /// <returns></returns>
        public static bool isPhoneNumber(this string CheckString)
        {
            return Regex.IsMatch(CheckString, @"[0](\d{9})|([0](\d{2})( |-|)((\d{3}))( |-|)(\d{4}))|[0](\d{2})( |-|)(\d{7})|(\+|00|09)(\d{2}|\d{3})( |-|)(\d{2})( |-|)((\d{3}))( |-|)(\d{4})");
        }
        /// <summary>
        /// متد چک کردن صحت کد ملی
        /// </summary>
        /// <param name="idMelli">شماره ملی</param>
        /// <returns>boolean</returns>
        public static bool CheckCodeMelli(this string idMelli)
        {
            int index = 10;//موقعيت مکاني که در اعداد آرايه ضرب ميشود
            int mul = 0;//جهت ذخيره حاصل ضرب
            int result = 0;//جهت ذخيره جمع حاصل ضرب ها
            int mod = 0;//جهت ذخيره باقيمانده
            bool check = false;// براي درست يا غلط بودن کد <span class="highlight">ملي</span> (خروجي تابع)ا
            bool equal = true;//براي مقايسه اعداد آرايه
            int[] arrIdMelli = new int[10];
            int lentgh = idMelli.Length;
            try
            {
                if (idMelli.Length >= 8 && idMelli.Length <= 10)
                {
                    for (int i = index; i > 0; i--)
                    {
                        try
                        {
                            arrIdMelli[i - 1] = Convert.ToInt16(idMelli.Substring(lentgh - 1, 1));//برداشتن يک به يک اعداد از انتها و قرار دادن در آرايه از انديس 0
                            lentgh--;
                        }
                        catch { }
                    }
                    for (int i = 0; i <= 9; i++)// اين حلقه براي مقايسه اعداد استفاده مي شود
                    {
                        if (arrIdMelli[i] != arrIdMelli[i + 1])
                        {
                            equal = false; break;
                        }
                    }
                    if (!equal)
                    {
                        for (int i = 0; i < 9; i++)
                        {
                            try
                            {
                                mul = arrIdMelli[i] * index;
                            }
                            catch { }
                            index--;
                            result += mul;
                        }
                        mod = result % 11;
                        if (mod < 2)
                        {
                            if (arrIdMelli[9] == mod)
                                check = true;
                        }
                        else if (11 - mod == arrIdMelli[9])
                        {
                            check = true;
                        }
                    }
                }
            }
            catch { }
            return check;
        }

        /// <summary>
        /// متد چک کردن مناسب بودن پسوند فایل برای مشاهده در وب
        /// </summary>
        /// <param name="Extension">پسوند فایل</param>
        /// <returns>boolean</returns>
        public static bool isFileViewableForWeb(this string Extension)
        {
            Extension = Extension.ToLower();
            if (Extension.Contains(".pdf"))
            {
                return true;
            }
            else if (Extension.Contains(".doc") || Extension.Contains(".docx"))
            {
                return true;
            }
            else if (Extension.Contains(".xls") || Extension.Contains(".xlsx"))
            {
                return true;
            }
            else if (Extension.Contains(".ppt") || Extension.Contains(".pptx"))
            {
                return true;
            }
            else if (Extension.Contains(".psd"))
            {
                return false;
            }
            else if (Extension.Contains(".jpg") || Extension.Contains(".gif") || Extension.Contains(".png") || Extension.Contains(".jpeg") || Extension.Contains(".bmp"))
            {
                return true;
            }
            else if (Extension.Contains(".rar"))
            {
                return false;
            }
            else if (Extension.Contains(".zip"))
            {
                return false;
            }
            else if (Extension.Contains(".txt"))
            {
                return true;
            }
            else if (Extension.Contains(".mp4"))
            {
                return false;
            }
            else if (Extension.Contains(".wmv"))
            {
                return false;
            }
            else if (Extension.Contains(".mp3"))
            {
                return false;
            }
            else if (Extension.Contains(".tif") || Extension.Contains(".tiff"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public static string LatinNumber(this string numebr)
        {
            if (string.IsNullOrEmpty(numebr)) return "";
            return numebr.Trim().Replace("۰", "0").Replace("۱", "1").Replace("۲", "2").Replace("۳", "3").Replace("۴", "4").Replace("۵", "5").Replace("۶", "6").Replace("۷", "7").Replace("۸", "8").Replace("۹", "9");
        }
        public static string PersianToday()
        {
            PersianCalendar pc = new PersianCalendar();
            string Year = pc.GetYear(System.DateTime.Now).ToString();
            string Month = pc.GetMonth(System.DateTime.Now).ToString();
            string Day = pc.GetDayOfMonth(System.DateTime.Now).ToString();
            return Year + "/" + (Month.Length == 1 ? "0" + Month : Month) + "/" + (Day.Length == 1 ? "0" + Day : Day);
        }

        private static int RandomNumber(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }

        /// <summary>
        /// Generates a random string with the given length
        /// </summary>
        /// <param name="size">Size of the string</param>
        /// <param name="lowerCase">If true, generate lowercase string</param>
        /// <returns>Random string</returns>
        private static string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }
        public static string GetPassword()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(4, true));
            builder.Append(RandomNumber(1000, 9999));
            builder.Append(RandomString(2, true));
            return builder.ToString();
        }

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
   
        public static string GenerateSlug(this string name)
        {
            string str = RemoveAccent(name).ToLower();
            // invalid chars           
            str = Regex.Replace(str, @"[^a-z0-9آ-ی\s-]", "");
            // convert multiple spaces into one space   
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // cut and trim 
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            str = Regex.Replace(str, @"\s", "-"); // hyphens   
            return str;
        }

        private static string RemoveAccent(this string text)
        {
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(text);
            return System.Text.Encoding.ASCII.GetString(bytes);
        }
 

        public static string ToSecureForSafeString(this string Value)
        {
            if (Value == null) { return ""; }
            Value = Value.ToLower();
            Value = Value.Replace("'", "''");
            if (Value.Contains(" ") || Value.Contains(";") || Value.Contains("select") || Value.Contains("delete") ||
                Value.Contains("update") || Value.Contains("insert") || Value.Contains("go") || Value.Contains("from") || Value.Contains("drop"))
                Value = Value.Replace(";", "").Replace("select", "").Replace("delete", "").Replace("update", "").Replace("insert", "").Replace("go", "").Replace("from", "").Replace("drop", "");
            return Value.Replace("ي", "ی").Replace("ك", "ک");
        }

        public static string getActiveMenu(string PageURL)
        {
            String curentpage = @HttpContext.Current.Request.Url.ToString().ToLower();
            if (curentpage.Contains(PageURL.ToLower()))
            {
                return "active";
            }
            return "";
        }
        /// <summary>
        /// متد گرفتن نوع فایل برای همه فایلها
        /// </summary>
        /// <param name="fileName">مسیرو نام فابل</param>
        /// <returns>نوع محتوای فایل</returns>
        public static string GetMimeType(string fileName)
        {
            string mimeType = "application/unknown";
            string ext = System.IO.Path.GetExtension(fileName).ToLower();
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null)
                mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }
    }
}