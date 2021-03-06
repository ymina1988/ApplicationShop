using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;


namespace Utilities.DateTime
{
    public static class iDate
    {
        private static int[] NumDayMonthsSh = new int[12] { 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29 };
        private static int[] NumDayMonthsMi = new int[12] { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

        #region Private Methods ---- Don't Remove Or Change Methods
        /// <summary>
        /// متد کمکی جداسازی روز و ماه و سال از تاریخ عددی
        /// </summary>
        /// <param name="Mymyd"></param>
        /// <param name="MyYY"></param>
        /// <param name="MyMM"></param>
        /// <param name="MyDD"></param>
        private static void BreakDate(string Mymyd, ref string MyYY, ref string MyMM, ref string MyDD)
        {
            int posd1;
            int posd2;
            if (Mymyd.Length == 10)
            {
                posd1 = Mymyd.IndexOf("/", 1);
                posd2 = Mymyd.IndexOf("/", posd1 + 1);
                MyYY = Mymyd.Substring(0, posd1);
                MyMM = Mymyd.Substring(posd1 + 1, posd2 - posd1 - 1);
                MyDD = Mymyd.Substring(Mymyd.Length - 2);
            }
            else
            {
                MyYY = Mymyd.Substring(0, 4);
                MyMM = Mymyd.Substring(4, 2);
                MyDD = Mymyd.Substring(Mymyd.Length - 2);

            }
        }
        /// <summary>
        /// متد کمکی برنامه تولید و تبدیل تاریخ شمسی به روز
        /// </summary>
        /// <param name="myd"></param>
        /// <returns></returns>
        private static Int32 Fdate_Nday(string myd)
        {
            Int32 i = 0;
            Int32 j = 0;
            string yy = "";
            string mm = "";
            string dd = "";
            Int32 fd_nd = 0;
            BreakDate(myd, ref yy, ref mm, ref dd);
            j = Convert.ToInt32(yy) - 1300;
            for (i = 0; i <= j; i++)
            {
                if (i == j) break;
                //if ((i<74 && i%4==2) || (i>74 && i%3==3))
                if ((i < 74 && i % 4 == 2) || (i > 74 && i % 4 == 3))
                    fd_nd = fd_nd + 366;
                else
                    fd_nd = fd_nd + 365;
            }
            if (Convert.ToInt32(mm) < 7)
                fd_nd = fd_nd + ((Convert.ToInt32(mm) - 1) * 31 + Convert.ToInt32(dd));
            else
                fd_nd = fd_nd + ((Convert.ToInt32(mm) - 7) * 30 + Convert.ToInt32(dd) + 186);
            return fd_nd;
        }

        /// <summary>
        /// متد کمکی برنامه تولید و تبدیل تاریخ میلادی به شمسی
        /// </summary>
        /// <param name="myd"></param>
        /// <returns></returns>
        private static Int32 Mdate_Nday(string myd)
        {
            int i = 0;
            int j = 0;
            string yy = "";
            string mm = "";
            string dd = "";
            Int32 md_nd = 0;
            BreakDate(myd, ref yy, ref mm, ref dd);
            j = Convert.ToInt16(yy) - 1900;
            for (i = 0; i <= j; i++)
            {
                if (i == j) break;
                if (i % 4 == 0)
                    md_nd += 366;
                else
                    md_nd += 365;
            }
            j = Convert.ToInt16(mm) - 1;
            for (i = 0; i <= j; i++)
            {
                if (i == j) break;
                md_nd += NumDayMonthsMi[i];
            }
            if (Convert.ToInt16(yy) % 4 == 0 && Convert.ToInt16(mm) > 2) ++md_nd;
            md_nd += Convert.ToInt16(dd);
            return md_nd;
        }

        /// <summary>
        /// متد کمکی برنامه تولید تاریخ شمسی
        /// </summary>
        /// <param name="Nday"></param>
        /// <returns></returns>
        private static string Nday_Fdate(Int32 Nday)
        {
            //عددي به تابع داده خواهد شد  به روز و تابع تاريخ معادل آن عدد را از 1300 محاسبه كرده و برميگرداند
            int yy = 1300;
            int mm = 0;
            int j = 0;
            int dd = 0;
            string nd_fd = "";
            while (true)
            {
                if ((yy < 1374 && yy % 4 == 2) || (yy > 1374 && yy % 4 == 3))
                {
                    if (Nday < 367) break;
                    Nday -= 366;
                }
                else
                {
                    if (Nday < 366) break;
                    Nday -= 365;
                }
                ++yy;
            }
            j = 12;
            for (mm = 1; mm <= j; mm++)
            {
                if (mm == j) break;
                if (mm < 7)
                {
                    if (Nday < 32) break;
                    Nday -= 31;
                }
                else
                {
                    if (Nday < 31) break;
                    Nday -= 30;
                }
            }
            dd = Nday;
            nd_fd = yy.ToString().Substring(yy.ToString().Length - 4) + "/" +
                mm.ToString("0#") + "/" + dd.ToString("0#");
            return nd_fd;
        }

        /// <summary>
        /// متد کمکی برنامه تولید تاریخ میلادی
        /// </summary>
        /// <param name="Nday"></param>
        /// <returns></returns>
        private static string Nday_Mdate(Int32 Nday)
        {
            int yy = 1900;
            int mm = 0;
            int j;
            int dd = 0;
            string nd_md;
            while (true)
            {
                if (yy % 4 == 0)
                {
                    if (Nday < 367) break;
                    Nday -= 366;
                }
                else
                {
                    if (Nday < 366) break;
                    Nday -= 365;
                }
                ++yy;
            }
            j = 12;
            for (mm = 1; mm <= j; mm++)
            {
                if (mm == j) break;
                if ((yy % 4 == 0) && (mm == 2))
                {
                    if (Nday <= 29) break;
                }
                else
                {
                    if (Nday <= NumDayMonthsMi[mm - 1]) break;
                }
                Nday = Nday - NumDayMonthsMi[mm - 1];
                if (yy % 4 == 0 && mm == 2) --Nday;
            }
            dd = Nday;
            nd_md = yy.ToString().Substring(yy.ToString().Length - 4) + "/" +
                mm.ToString("0#") + "/" + dd.ToString("0#");
            return nd_md;
        }

        #endregion

        #region Check Validation Date And Time
        /// <summary>
        /// متد مقایسه دو تاریخ 
        /// </summary>
        /// <param name="FirstDate">تاریخ اول</param>
        /// <param name="SecondDate">تاریخ دوم</param>
        /// <returns>در صورت کوچک تر بودن تاریخ اول مقدار 1، در صورت مساوی بودن مقدار 0، و در صورت بزرکتر بودن مقدار -1</returns>
        public static int CompareDates(string FirstDate, string SecondDate)
        {
            if (string.IsNullOrEmpty(FirstDate.Trim()) || string.IsNullOrEmpty(SecondDate.Trim()))
                return -1;

            try
            {
                string[] date1Split = FirstDate.Split('/');
                string[] date2Split = SecondDate.Split('/');

                string date1 = string.Format("{0:0000}/{1:00}/{2:00}", date1Split[0], date1Split[1], date1Split[2]);
                string date2 = string.Format("{0:0000}/{1:00}/{2:00}", date2Split[0], date2Split[1], date2Split[2]);

                //int a = string.Compare("93/6/2", "93/6/2");//0
                //int b = string.Compare("93/6/2", "93/6/3");//-1
                //int c = string.Compare("93/6/3", "93/6/2");//1

                if (string.Compare(date1, date2) < 0) return 1;
                else if (string.Compare(date1, date2) == 0) return 0;
                else if (string.Compare(date1, date2) > 0) return -1;
            }
            catch (Exception ex)
            {
                string _ERRORR_MESSAGE = ex.Message;
                return -1;
            }
            return -1;
        }

        /// <summary>
        /// متد تصحیح تاریخ ورودی - مثلا 1392/1/2 به 1392/01/02
        /// </summary>
        /// <param name="DateString">تاریخ میلادی یا شمسی یا قمری</param>
        /// <returns>1392/01/02</returns>
        public static string correctDate(this string DateString)
        {
            if (DateString.Length < 9) return "تاریخ نامعتبر است";
            string[] ArrayDate = DateString.Split('/');
            string myyear = ArrayDate[0];
            DateString = myyear + "/" + string.Format("{0:D2}", int.Parse(ArrayDate[1])) + "/" + string.Format("{0:D2}", int.Parse(ArrayDate[2]));
            return DateString;
        }
        /// <summary>
        /// متد صحت سنجی تاریخ شمسی
        /// </summary>
        /// <param name="myd">تاریخ شمسی . مثال : 1392/01/30 یا 13920130</param>
        /// <returns></returns>
        public static Tuple<Boolean, String> CheckPersianDateValidate2(string myd)
        {
            string yy = "";
            string mm = "";
            string dd = "";
            if (myd.Length < 8)
            {
                //MessageBox.Show ("تاریخ کامل وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return Tuple.Create(false, "تاریخ کامل وارد نشده");
            }
            if (myd.Replace("/", "").Trim() == "")
            {
                //MessageBox.Show("تاریخ کامل وارد نشده", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return Tuple.Create(false, "تاریخ کامل وارد نشده");
            }

            BreakDate(myd, ref yy, ref mm, ref dd);

            if (yy == "")
            {
                //MessageBox.Show ("سال وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return Tuple.Create(false, "سال وارد نشده");
            }
            if (yy.Length < 4)
            {
                //MessageBox.Show ("سال کامل وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return Tuple.Create(false, "سال کامل وارد نشده");
            }
            if (mm == "")
            {
                //MessageBox.Show ("ماه وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return Tuple.Create(false, "ماه وارد نشده");
            }
            if (dd == "")
            {
                //MessageBox.Show ("روز وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return Tuple.Create(false, "روز وارد نشده");
            }
            if (Convert.ToInt16(mm) < 1 || Convert.ToInt16(mm) > 12)
            {
                //MessageBox.Show ("مقدار ماه اشتباه وارد شده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return Tuple.Create(false, "مقدار ماه اشتباه وارد شده");
            }

            if (Convert.ToInt16(dd) < 1)
            {
                //MessageBox.Show ("مقدار روز اشتباه وارد شده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return Tuple.Create(false, "مقدار روز اشتباه وارد شده");
            }
            else if (
                (Convert.ToInt16(yy) < 1374 && Convert.ToInt16(yy) % 4 == 2 && Convert.ToInt16(mm) == 12) ||
                (Convert.ToInt16(yy) > 1374 && Convert.ToInt16(yy) % 4 == 3 && Convert.ToInt16(mm) == 12)
                )
            {
                if (Convert.ToInt16(dd) > 30)
                {
                    //MessageBox.Show ("مقدار روز اشتباه وارد شده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                    return Tuple.Create(false, "مقدار روز اشتباه وارد شده");
                }

            }
            else if (Convert.ToInt16(dd) > NumDayMonthsSh[Convert.ToInt16(mm) - 1])
            {
                //MessageBox.Show ("مقدار روز اشتباه وارد شده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return Tuple.Create(false, "مقدار روز اشتباه وارد شده");
            }
            return Tuple.Create(true, "");
        }

        /// <summary>
        /// متد صحت سنجی تاریخ شمسی
        /// </summary>
        /// <param name="myd">تاریخ شمسی . مثال : 1392/01/30 یا 13920130</param>
        /// <returns></returns>
        public static Boolean CheckPersianDateValidate(string myd)
        {
            string yy = "";
            string mm = "";
            string dd = "";
            if (myd.Length < 8)
            {
                //MessageBox.Show ("تاریخ کامل وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return false;
            }
            if (myd.Replace("/", "").Trim() == "")
            {
                //MessageBox.Show("تاریخ کامل وارد نشده", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }

            BreakDate(myd, ref yy, ref mm, ref dd);

            if (yy == "")
            {
                //MessageBox.Show ("سال وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return false;
            }
            if (yy.Length < 4)
            {
                //MessageBox.Show ("سال کامل وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return false;
            }
            if (mm == "")
            {
                //MessageBox.Show ("ماه وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return false;
            }
            if (dd == "")
            {
                //MessageBox.Show ("روز وارد نشده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return false;
            }
            if (Convert.ToInt16(mm) < 1 || Convert.ToInt16(mm) > 12)
            {
                //MessageBox.Show ("مقدار ماه اشتباه وارد شده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return false;
            }

            if (Convert.ToInt16(dd) < 1)
            {
                //MessageBox.Show ("مقدار روز اشتباه وارد شده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return false;
            }
            else if (
                (Convert.ToInt16(yy) < 1374 && Convert.ToInt16(yy) % 4 == 2 && Convert.ToInt16(mm) == 12) ||
                (Convert.ToInt16(yy) > 1374 && Convert.ToInt16(yy) % 4 == 3 && Convert.ToInt16(mm) == 12)
                )
            {
                if (Convert.ToInt16(dd) > 30)
                {
                    //MessageBox.Show ("مقدار روز اشتباه وارد شده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                    return false;
                }

            }
            else if (Convert.ToInt16(dd) > NumDayMonthsSh[Convert.ToInt16(mm) - 1])
            {
                //MessageBox.Show ("مقدار روز اشتباه وارد شده","توجه",MessageBoxButtons.OK,MessageBoxIcon.Error);
                return false;
            }
            return true;
        }
        /// <summary>
        /// متد صحت سنجی تاریخ میلادی
        /// </summary>
        /// <param name="myd">تاریخ میلای . مثال : 2014/02/30 یا 20140230</param>
        /// <returns></returns>
        public static Boolean CheckGregorianDateValidate(string myd)
        {
            string yy = "";
            string mm = "";
            string dd = "";
            if (myd.Length < 8)
            {
                // MessageBox.Show("تاریخ کامل وارد نشده", "توجه", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
            if (myd.Replace("/", "").Trim() == "")
            {
                //MessageBox.Show("تاریخ کامل وارد نشده", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }


            BreakDate(myd, ref yy, ref mm, ref dd);

            if (yy == "" && mm == "" && dd == "") return false;
            if (Convert.ToInt16(mm) < 1 || Convert.ToInt16(mm) > 12) return false;
            if (Convert.ToInt16(dd) < 1)
                return false;
            else if (Convert.ToInt16(yy) % 4 == 0 && Convert.ToInt16(mm) == 2)
            {
                if (Convert.ToInt16(dd) > 29) return false;
            }
            else if (Convert.ToInt16(dd) > NumDayMonthsMi[Convert.ToInt16(mm) - 1])
                return false;
            return true;
        }

        /// <summary>
        /// متد صحت سنجی تاریخ میلادی
        /// </summary>
        /// <param name="myd">تاریخ میلای . مثال : 2014/02/30 یا 20140230</param>
        /// <returns></returns>
        public static Tuple<Boolean, String> CheckGregorianDateValidate2(string myd)
        {
            string yy = "";
            string mm = "";
            string dd = "";
            if (myd.Length < 8)
            {
                // MessageBox.Show("تاریخ کامل وارد نشده", "توجه", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return Tuple.Create(false, "تاریخ کامل وارد نشده");
            }
            if (myd.Replace("/", "").Trim() == "")
            {
                //MessageBox.Show("تاریخ کامل وارد نشده", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return Tuple.Create(false, "تاریخ کامل وارد نشده");
            }


            BreakDate(myd, ref yy, ref mm, ref dd);

            if (yy == "" && mm == "" && dd == "") return Tuple.Create(false, "تاریخ کامل وارد نشده است");
            if (Convert.ToInt16(mm) < 1 || Convert.ToInt16(mm) > 12) return Tuple.Create(false, "مقدار ماه اشتباه وارد شده");
            if (Convert.ToInt16(dd) < 1)
                return Tuple.Create(false, "مقدار روز اشتباه وارد شده");
            else if (Convert.ToInt16(yy) % 4 == 0 && Convert.ToInt16(mm) == 2)
            {
                if (Convert.ToInt16(dd) > 29) return Tuple.Create(false, "مقدار روز اشتباه وارد شده");
            }
            else if (Convert.ToInt16(dd) > NumDayMonthsMi[Convert.ToInt16(mm) - 1])
                return Tuple.Create(false, "مقدار روز اشتباه وارد شده");
            return Tuple.Create(true, "");
        }

        /// <summary>
        /// متد صحت سنجی ساعت
        /// </summary>
        /// <param name="Watch">ساعت</param>
        /// <returns></returns>
        public static bool CheckValidWatch(string Watch)
        {
            string WatchStr = Watch.Trim();
            if (WatchStr == "")
            {
                // MessageBox.Show("مقدار ساعت وارد نشده", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error,MessageBoxDefaultButton.Button1, MessageBoxOptions.RightAlign);
                return false;
            }
            if (WatchStr.Length < 4)
            {
                //  MessageBox.Show("مقدار ساعت درست وارد نشده و حتما بايد 4 رقم باشد", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error,MessageBoxDefaultButton.Button1, MessageBoxOptions.RightAlign);
                return false;
            }
            if (Convert.ToInt16(WatchStr.Substring(0, 2)) > 24)
            {
                //MessageBox.Show("مقدار ساعت درست وارد نشده", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error,MessageBoxDefaultButton.Button1, MessageBoxOptions.RightAlign);
                return false;
            }
            if (Convert.ToInt16(WatchStr.Substring(2, 2)) > 59)
            {
                // MessageBox.Show("مقدار دقيقه درست وارد نشده", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error,MessageBoxDefaultButton.Button1, MessageBoxOptions.RightAlign);
                return false;
            }
            return true;
        }


        /// <summary>
        /// متد چک کردن اعتبار از تاریخ تا تاریخ ورودی بدو هشدار دادن
        /// </summary>
        /// <param name="FromDate">ازتاریخ</param>
        /// <param name="ToDate">تا تاریخ</param>
        /// <returns>boolean</returns>
        public static bool CheckFromDateToDate(string FromDate, string ToDate)
        {
            if (!string.IsNullOrEmpty(FromDate) & !string.IsNullOrEmpty(ToDate))
            {
                FromDate = FromDate.Replace("/", "");
                ToDate = ToDate.Replace("/", "");
                if (FromDate.Length != 8 || ToDate.Length != 8)
                {
                    return false;
                }
                if (int.Parse(ToDate) < int.Parse(FromDate))
                {
                    return false;
                }
                if (int.Parse(FromDate.Substring(2, 2)) > int.Parse(ToDate.Substring(2, 2)))
                {
                    return false;
                }
                if (int.Parse(FromDate.Substring(4, 2)) > 12 || int.Parse(ToDate.Substring(4, 2)) > 12)
                {
                    return false;
                }
                if (int.Parse(FromDate.Substring(6, 2)) > 31 || int.Parse(ToDate.Substring(6, 2)) > 31)
                {
                    return false;
                }

            }
            return true;
        }
        #endregion

        #region Convert Dates and Times
        /// <summary>
        /// متد تبدیل ساعت 02:45 AM به 14:45
        /// </summary>
        /// <param name="s">12:45 AM</param>
        /// <returns>00:45:00</returns>
        public static TimeSpan Get24HoursTimeSpan(string s)
        {
            System.DateTime t = System.DateTime.ParseExact(s, "h:mm tt", CultureInfo.InvariantCulture);
            //if you really need a TimeSpan this will get the time elapsed since midnight:
            TimeSpan ts = t.TimeOfDay;
            return ts;
        }


        /// <summary>
        /// متد تبدیل تاریخ شمسی به میلادی
        /// </summary>
        /// <param name="myd">تاریخ شمسی . مثال : 1392/12/30 یا 13921230</param>
        /// <returns></returns>
        public static string ConvertPersianDateToGregorianDate(string myd)
        {
            string result;
            if (myd.Replace("/", "").Trim() == "")
            {
                //MessageBox.Show("تاریخ کامل وارد نشده", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return "";
            }

            result = Nday_Mdate(Fdate_Nday(myd) + 7750);
            if (CheckPersianDateValidate(myd)) return result;
            else return "";

        }


        /// <summary>
        /// متد تبدیل تاریخ میلادی به شمسی
        /// </summary>
        /// <param name="myd">تاریخ میلای . مثال : 2014/01/30 یا 20140130</param>
        /// <returns></returns>
        public static string ConvertGregorianDateToPersianDate(string myd)
        {
            if (myd.Replace("/", "").Trim() == "")
            {
                //MessageBox.Show("تاریخ کامل وارد نشده", "خطا", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return "";
            }
            if (CheckGregorianDateValidate(myd)) return Nday_Fdate(Mdate_Nday(myd) - 7750);
            else return "";
        }
        /// <summary>
        /// متد تبدیل تاریخ میلادی به قمری
        /// </summary>
        /// <param name="myd">تاریخ قمری . مثال : 1423/01/30  </param>
        /// <returns></returns>
        public static string ConvertGregorianDateToGhamariDate(System.DateTime dt)
        {
            Persia.SolarDate SD = Persia.Calendar.ConvertToPersian(dt);
            Persia.LunarDate LD = Persia.Calendar.ConvertToIslamic(SD);
            return LD.ToString();
        }
        #endregion

        #region Get Dates and Time Now
        /// <summary>
        /// گرفتن تاریخ و ساعت شمسی الان
        /// </summary>
        /// <returns>1392/10/30 02:12 ب ق</returns>
        public static string ShamsiDateTimeNow()
        {
            return ShamsiDateNow() + " " + System.DateTime.Now.ToString("HH:mm");
        }

        /// <summary>
        /// گرفتن تاریخ و ساعت شمسی کامل الان
        /// </summary>
        /// <returns>1392/10/30 12:20:22 PM</returns>
        public static string ShamsiFullDateTimeNow(string ci)
        {
            CultureInfo cul = new CultureInfo(ci);
            return ShamsiDateNow() + " " + System.DateTime.Now.ToString("HH:mm", cul);
        }
        /// <summary>
        /// با استفاده از تاریخ و ساعت امروز یک مقدار عددی یکتا میسازد.
        /// </summary>
        /// <returns>srting</returns>
        public static string GetTimeExtension()
        {
            return System.DateTime.Now.Year.ToString() +
           System.DateTime.Now.Month.ToString() +
           System.DateTime.Now.Day.ToString() +
           System.DateTime.Now.Hour.ToString() +
           System.DateTime.Now.Minute.ToString() +
           System.DateTime.Now.Second.ToString() +
           System.DateTime.Now.Millisecond.ToString();
        }
        /// <summary>
        /// ساخت یک نام یکتا بر اساس تاریخ شمسی و GUID
        ///       YearMonthDay-GUID
        /// e.g : 930902-a57bfb120db147269f53617d44117b69
        /// </summary>
        /// <returns></returns>
        public static string GetUnicNameByShamsiDate()
        {
            string gID = Guid.NewGuid().ToString();


            return getShamsiYearNum_Now() +
                getShamsiMonthNum_Now() +
                getShamsiDayNum_Now() +
                "-" + gID.Replace("-", "");
            //     DateTime.Now.Year.ToString() +
            //DateTime.Now.Month.ToString() +
            //DateTime.Now.Day.ToString() +
            //DateTime.Now.Hour.ToString() +
            //DateTime.Now.Minute.ToString() +
            //DateTime.Now.Second.ToString() +
            //DateTime.Now.Millisecond.ToString();
        }
        /// <summary>
        /// متد گرفتن ساعت به صورت کامل
        /// </summary>
        /// <returns>3:02 AM</returns>
        public static string ShortTimeNow()
        {
            return System.DateTime.Now.ToShortTimeString();
        }
        /// <summary>
        /// متد گرفتن ساعت به صورت کوچک
        /// </summary>
        /// <returns>3:02:15 AM</returns>
        public static string LongTimeNow()
        {
            return System.DateTime.Now.ToLongTimeString();
        }
        /// <summary>
        /// متد گرفتن سال به صورت شمسی
        /// </summary>
        /// <returns>92 مثال</returns>
        public static string getShamsiYearNum_Now()
        {
            //1392/10/30
            return ShamsiDateNow().Substring(2, 2);
        }
        /// <summary>
        /// متد گرفتن سال کامل به صورت شمسی
        /// </summary>
        /// <returns>1395 مثال</returns>
        public static string getShamsiYearFullNum_Now()
        {
            //1392/10/30
            return ShamsiDateNow().Substring(0, 4);
        }
        /// <summary>
        /// متد گرفتن ساعت کنونی سیستم - مثال 12:20:54
        /// </summary>
        /// <returns>12:20:54</returns>
        public static string GetTimeNow()
        {
            return System.DateTime.Now.Hour + ":" + System.DateTime.Now.Minute + ":" + System.DateTime.Now.Second;
        }
        /// <summary>
        /// متد گرفتن ماه شمسی
        /// </summary>
        /// <returns>10 مثال</returns>
        public static string getShamsiMonthNum_Now()
        {
            //1392/10/30
            return ShamsiDateNow().Substring(5, 2);
        }

        /// <summary>
        /// متد گرفتن روز شمسی
        /// </summary>
        /// <returns>30 مثال</returns>
        public static string getShamsiDayNum_Now()
        {
            //1392/10/30
            return ShamsiDateNow().Substring(8, 2);
        }
        /// <summary>
        /// متد گرفتن تاریخ میلادی امروز
        /// </summary>
        /// <returns>2014/10/10</returns>
        public static string GregorianDateNow()
        {
            return System.DateTime.Today.ToString("yyyy/MM/dd");
        }

        /// <summary>
        /// متد گرفتن تاریخ شمسی امروز
        /// </summary>
        /// <returns>13921030</returns>
        public static string PersianDateNow()
        {
            string StrDate;
            StrDate = ConvertGregorianDateToPersianDate(GregorianDateNow());
            return (StrDate.Substring(0, 4) + StrDate.Substring(5, 2) + StrDate.Substring(StrDate.Length - 2));
        }
        /// <summary>
        /// متد گرفتن تاریخ هجری قمری امروز
        /// </summary>
        /// <returns>1436/12/05</returns>
        public static string HeijriGhamariDateNow()
        {
            System.DateTime dt1 = new System.DateTime();
            string MDate = GregorianDateNow().Replace("/", "");
            string syy = "";
            string smm = "";
            string sdd = "";
            string datehnow = "";
            int yy, mm, dd;
            BreakDate(MDate, ref syy, ref smm, ref sdd);
            yy = Convert.ToInt16(syy);
            mm = Convert.ToInt16(smm);
            dd = Convert.ToInt16(sdd);
            System.DateTime dt = new System.DateTime(yy, mm, dd);
            CultureInfo culture = new CultureInfo("ar-SA");
            try
            {
                datehnow = dt.ToString("yyyy/MM/dd", culture);
            }
            catch (Exception)
            {
                MDate = GregorianDateNow().Substring(0, 10);
                dt1 = Convert.ToDateTime(MDate);
                MDate = dt1.ToString("yyyy/MM/dd", CultureInfo.InvariantCulture);
                MDate = MDate.Substring(0, 10).Replace("/", "");
                BreakDate(MDate, ref syy, ref smm, ref sdd);
                yy = Convert.ToInt16(syy);
                mm = Convert.ToInt16(smm);
                dd = Convert.ToInt16(sdd);
                dt = new System.DateTime(yy, mm, dd);
                culture = new CultureInfo("ar-SA");
                datehnow = dt.ToString("yyyy/MM/dd", culture);
            }
            return datehnow;
        }
        /// <summary>
        /// گرفتن تاریخ شمسی الان
        /// </summary>
        /// <returns>1392/10/30</returns>
        public static string ShamsiDateNow()
        {
            string output = string.Empty;
            PersianCalendar mpc = new PersianCalendar();
            System.DateTime today;
            today = System.DateTime.Now;
            string dd = mpc.GetDayOfWeek(today).ToString();
            int d1 = mpc.GetDayOfMonth(today);
            // string d = "شنبه";
            int m = mpc.GetMonth(today);
            int y = mpc.GetYear(today);
            string month;
            string day;
            switch (dd)
            {
                case "Saturday":
                    //  d = "شنبه";
                    break;
                case "Sunday":
                    //  d = "یکشنبه";
                    break;
                case "Monday":
                    //  d = "دوشنبه";
                    break;
                case "Tuesday":
                    //  d = "سه شنبه";
                    break;
                case "Wednesday":
                    //  d = "چهارشنبه";
                    break;
                case "Thursday":
                    //  d = "پنجشنبه";
                    break;
                case "Friday":
                    //  d = "جمعه";
                    break;
            }
            if (m.ToString().Length <= 1)
                month = "0" + m.ToString();
            else month = m.ToString();
            if (d1.ToString().Length <= 1)
                day = "0" + d1.ToString();
            else day = d1.ToString();
            return output = y.ToString() + "/" + month + "/" + day;
        }

        /// <summary>
        /// متد محسابه اختلاف بین تعداد روز بین دو تاریخ شروع و پایان شمسی
        /// </summary>
        /// <param name="FromDate">تاریخ شروع شمسی : مثال 1393/12/01</param>
        /// <param name="ToDate">تاریخ پایان شمسی : مثال 1393/12/10</param>
        /// <returns>مقدار اختلاف دو تاریخ</returns>
        public static int getDifferenceTwoDates(string FromDate, string ToDate)
        {
            System.DateTime _fromDate, _toDate;

            _fromDate = Convert.ToDateTime(ConvertPersianDateToGregorianDate(FromDate));
            _toDate = Convert.ToDateTime(ConvertPersianDateToGregorianDate(ToDate));

            if (_toDate >= _fromDate)
                return (_toDate - _fromDate).Days;
            else return (_fromDate - _toDate).Days * (-1);
            //return 0;
        }
        #endregion

        #region Get Calander
        /// <summary>
        /// متد بدست آوردن ماه شمسی از تاریخ شمسی
        /// </summary>
        /// <param name="FarsiDate">تاریخ شمسی مثال : 13920130 یا 1392/01/30</param>
        /// <returns></returns>
        public static string getPersianMonthName(string FarsiDate)
        {
            string FDate = FarsiDate.Replace("/", "");
            string syy = "";
            string smm = "";
            string sdd = "";
            int yy;
            int mm;
            int dd;
            if (!CheckPersianDateValidate(FDate)) return ("");
            BreakDate(FDate, ref syy, ref smm, ref sdd);
            yy = Convert.ToInt16(syy);
            mm = Convert.ToInt16(smm);
            dd = Convert.ToInt16(sdd);
            switch (mm)
            {
                case 1:
                    return "فروردین";
                case 2:
                    return "اردیبهشت";
                case 3:
                    return "خرداد";
                case 4:
                    return "تیر";
                case 5:
                    return "مرداد";
                case 6:
                    return "شهریور";
                case 7:
                    return "مهر";
                case 8:
                    return "آبان";
                case 9:
                    return "آذر";
                case 10:
                    return "دی";
                case 11:
                    return "بهمن";
                case 12:
                    return "اسفند";
            }
            return "";
        }
        /// <summary>
        /// متد بدست آوردن روز هفته از تاریخ شمسی
        /// </summary>
        /// <param name="FarsiDate">تاریخ شمسی مثال : 13920130 یا 1392/01/30</param>
        /// <returns></returns>
        public static string getPersianDayName(string FarsiDate)
        {
            string FDate = FarsiDate.Replace("/", "");
            string MDate = "";
            string syy = "";
            string smm = "";
            string sdd = "";
            int yy, mm, dd;
            if (!CheckPersianDateValidate(FDate)) return ("");
            MDate = ConvertPersianDateToGregorianDate(FDate);
            BreakDate(MDate, ref syy, ref smm, ref sdd);
            yy = Convert.ToInt16(syy);
            mm = Convert.ToInt16(smm);
            dd = Convert.ToInt16(sdd);
            System.DateTime t = new System.DateTime(yy, mm, dd);
            switch (t.DayOfWeek)
            {
                case DayOfWeek.Friday:
                    return "جمعه";
                case DayOfWeek.Monday:
                    return "دوشنبه";
                case DayOfWeek.Saturday:
                    return "شنبه";
                case DayOfWeek.Sunday:
                    return "یکشنبه";
                case DayOfWeek.Thursday:
                    return "پنجشنبه";
                case DayOfWeek.Tuesday:
                    return "سه شنبه";
                case DayOfWeek.Wednesday:
                    return "چهارشنبه";
            }
            return "";
        }

        /// <summary>
        /// متد گرفتن ماه میلادی به زبان فارسی از تاریخ ورودی
        /// </summary>
        /// <param name="GreogianDate">تاریخ میلادی . مثال : 2014/02/30 یا 20140230</param>
        /// <returns>نام فارسی ماه میلادی</returns>
        public static string getGreogianMonthFarsiName(string GreogianDate)
        {
            string MDate = GreogianDate.Replace("/", "");
            string syy = "";
            string smm = "";
            string sdd = "";
            int yy, mm, dd;
            if (!CheckGregorianDateValidate(MDate)) return ("");
            BreakDate(GreogianDate, ref syy, ref smm, ref sdd);
            yy = Convert.ToInt16(syy);
            mm = Convert.ToInt16(smm);
            dd = Convert.ToInt16(sdd);
            System.DateTime now = new System.DateTime(yy, mm, dd);
            CultureInfo culture = CultureInfo.GetCultureInfo("en-US");
            string m = now.ToString("MMMM", culture);
            switch (m)
            {
                case "February":
                    return "فوریه";
                case "March":
                    return "مارس";
                case "April":
                    return "آوریل";
                case "May":
                    return "مه";
                case "June":
                    return "ژوئن";
                case "July":
                    return "ژولای";
                case "August":
                    return "آگوست";
                case "September":
                    return "سپتامبر";
                case "October":
                    return "اکتبر";
                case "November":
                    return "نوامبر";
                case "December":
                    return "دسامبر";
                case "January":
                    return "ژانویه";
            }
            return "";
        }

        /// <summary>
        /// متد گرفتن تقویم شمسی الان
        /// </summary>
        /// <returns>مثال : سه شنبه 1 بهمن 1392 </returns>
        public static string PersianCalenderNow()
        {
            string FDate = ShamsiDateNow().Replace("/", "");
            string syy = "";
            string smm = "";
            string sdd = "";
            int yy, mm, dd;
            BreakDate(FDate, ref syy, ref smm, ref sdd);
            yy = Convert.ToInt16(syy);
            mm = Convert.ToInt16(smm);
            dd = Convert.ToInt16(sdd);
            return getPersianDayName(FDate) + " " + dd + " " + getPersianMonthName(FDate) + " " + yy;
        }
        /// <summary>
        /// متد گرفتن تقویم میلادی فارسی الان
        /// </summary>
        /// <returns> مثال : 21 ژانویه 2014 </returns>
        public static string GregorianFarsiCalenderNow()
        {
            string MDate = GregorianDateNow().Replace("/", "");
            string syy = "";
            string smm = "";
            string sdd = "";
            int yy, mm, dd;
            BreakDate(MDate, ref syy, ref smm, ref sdd);
            yy = Convert.ToInt16(syy);
            mm = Convert.ToInt16(smm);
            dd = Convert.ToInt16(sdd);
            return dd + " " + getGreogianMonthFarsiName(MDate) + " " + yy;
        }
        /// <summary>
        /// متد گرفتن تقویم هجری قمری الان
        /// </summary>
        /// <returns>مثال :  20 ربيع الأول 1435 </returns>
        public static string HijriCalenderNow()
        {
            string MDate = GregorianDateNow().Replace("/", "");
            string syy = "";
            string smm = "";
            string sdd = "";
            int yy, mm, dd;
            BreakDate(MDate, ref syy, ref smm, ref sdd);
            yy = Convert.ToInt16(syy);
            mm = Convert.ToInt16(smm);
            dd = Convert.ToInt16(sdd);
            System.DateTime dt = new System.DateTime(yy, mm, dd);
            CultureInfo culture = new CultureInfo("ar-SA");
            return dt.ToString("dd MMMM yyyy", culture);
        }
        /// <summary>
        /// متد گرفتن مناسبهای تقویم کامل شامل تقویم شمسی و میلادی
        /// </summary>
        /// <param name="spliter">کاراکتر جداکننده  / - </param>
        /// <returns>تقویم شمسی / میلادی / قمری</returns>
        public static string TaghvimFullNow(string spliter)
        {

            string taghVimText = "";
            if (TaghvimShamsi(ShamsiDateNow()) != "")
            {
                taghVimText = TaghvimShamsi(ShamsiDateNow()) + " " + spliter;
            }
            if (TaghvimMiladi(GregorianDateNow()) != "")
            {
                taghVimText += TaghvimMiladi(GregorianDateNow()) + " " + spliter;
            }
            if (TaghvimGhamari(HeijriGhamariDateNow()) != "")
            {
                taghVimText += TaghvimGhamari(HeijriGhamariDateNow());
            }

            if (taghVimText == "")
                taghVimText = "<br/>" + "رویداد و مناسبتی برای امروز وجود ندارد.";
            return taghVimText;
        }
        /// <summary>
        /// تقویم مناسبتی شمسی
        /// </summary>
        /// <param name="ShamsiDate">رشته تاریخ شمسی - 1393/08/01</param>
        /// <returns>مناسبت های امروز شمسی</returns>
        public static string TaghvimShamsi(string ShamsiDate)
        {
            if (ShamsiDate.Length < 10) return "تاریخ شمسی نامعتبر است";
            int pRoz = int.Parse(ShamsiDate.Substring(8, 2));
            int pMah = int.Parse(ShamsiDate.Substring(5, 2));
            string Monasebat = "";
            #region CheckPersianMahRoz
            switch (pMah)
            {
                case 1:
                    switch (pRoz)
                    {
                        case 1: Monasebat = "سال نو بر شما مبارک باد"; break;
                        case 2: Monasebat = "هجوم ماموران ستم شاهی به مدرسه ی فیضیه ی قم"; break;
                        case 12: Monasebat = "روز جمهوری اسلامی ایران -- تعطیل"; break;
                        case 13: Monasebat = "روز طبیعت -- تعطیل"; break;
                        case 18: Monasebat = "روز سلامتی - روز جهانی بهداشت"; break;
                        case 19: Monasebat = "شهادت آیت اله سید محمد باقر صدر و خواهر ایشان بنت الهدی توسط رژیم بعث عراق"; break;
                        case 20: Monasebat = "روز ملی فناوری هسته ای"; break;
                        case 21: Monasebat = "شهادت امیر سپهبد علی صیاد شیرازی"; break;
                        case 25: Monasebat = "روز بزرگداشت عطار نیشابوری"; break;
                        case 29: Monasebat = "روز ارتش جمهوری اسلامی ایران"; break;
                    }
                    break;
                case 2:
                    switch (pRoz)
                    {
                        case 1: Monasebat = "روز بزرگداشت سعدی"; break;
                        case 2: Monasebat = "تاسیس سپاه پاسداران انتقلاب اسلامی - سالروز اعلام انقلاب فرهنگی - روز زمین پاک"; break;
                        case 3: Monasebat = "روز بزرگداشت شیخ بهایی - روز ملی کار آفرینی"; break;
                        case 5: Monasebat = "شکست حمله نظامی آمریکا به ایران در طبس"; break;
                        case 9: Monasebat = "روز شوراها"; break;
                        case 10: Monasebat = " روز ملی خلیج فارس - آغاز عملیات بیت المقدس"; break;
                        case 12: Monasebat = "شهادت استاد مرتضی مطهری - روز معلم - روز جهانی کار و کارگر"; break;
                        case 15: Monasebat = "روز بزرگداشت شیخ صدوق"; break;
                        case 17: Monasebat = "روز اسناد ملی"; break;
                        case 19: Monasebat = "روز جهانی صلیب سرخ و حلال احمر"; break;
                        case 24: Monasebat = "لغو امتیاز تنباکو به فتوای آیت الله میرزا حسن شیرازی"; break;
                        case 25: Monasebat = "روز بزرگداشت فردوسی"; break;
                        case 27: Monasebat = "روز جهانی ارتباطات و روابط عمومی"; break;
                        case 28: Monasebat = "روز بزرگداشت حکیم عمر خیام"; break;
                        case 29: Monasebat = "روز جهانی موزه و میراث فرهنگی"; break;
                    }
                    break;
                case 3:
                    switch (pRoz)
                    {
                        case 1: Monasebat = "روز بهره وری و بهینه سازی مصرف - روز بزرگداشت ملا صدرا"; break;
                        case 3: Monasebat = "فتح خرم شهر در عملیات بیت امقدس و روز مقاومت ، ایثار و پیروزی"; break;
                        case 14: Monasebat = "رحلت حضرت امام خمینی -- تعطیل"; break;
                        case 15: Monasebat = "قیام خونین 15 خرداد -- تعطیل"; break;
                        case 16: Monasebat = "روز جهانی محیط زیست"; break;
                        case 20: Monasebat = "شهادت آیت الله سعیدی به دست ماموران ستم شاهی پهلوی"; break;
                        case 24: Monasebat = "روز جهانی صنایع دستی"; break;
                        case 25: Monasebat = "روز گل و گیاه"; break;
                        case 26: Monasebat = "شهادت سربازان دلیر اسلام،بخارایی،امانی،صفار هرندی و نیک نژاد"; break;
                        case 27: Monasebat = "روز جهاد کشاورزی -- تشکیل جهاد سازندگی به فرمان امام"; break;
                        case 28: Monasebat = "روز جهانی بیابان زدایی"; break;
                        case 29: Monasebat = "درگذشت دکتر علی شریعتی"; break;
                        case 30: Monasebat = "انفجار در حرم حضرت امام رضا به دست منافقین کور دل"; break;
                        case 31: Monasebat = "شهادت دکتر مصطفی چمران"; break;
                    }
                    break;
                case 4:
                    switch (pRoz)
                    {
                        case 1: Monasebat = "روز تبلیغ و اطلاع رسانی دینی - روز اصناف"; break;
                        case 6: Monasebat = "روز جهانی مبارزه با مواد مخدر"; break;
                        case 7: Monasebat = "شهادت آیت الله دکتر بهشتی و 72 تن از یاران امام - روز قوه قضاییه"; break;
                        case 8: Monasebat = "روز مبارزه با سلاح های میکروبی و شیمیایی"; break;
                        case 10: Monasebat = "روز صنعت و معدن"; break;
                        case 11: Monasebat = "شهادت آیت الله صدوقی چهارمین شهید محراب به دست به دست منافقین"; break;
                        case 12: Monasebat = "سقوط هواپیمای مسافر بری جمهوری اسلامی ایران توسط آمریکا"; break;
                        case 14: Monasebat = "روز قلم"; break;
                        case 16: Monasebat = "روز مالیات"; break;
                        case 25: Monasebat = "روز بهزیستی و تامین اجتماعی"; break;
                        case 27: Monasebat = "اعلام پذیرش قطعنامه شورای امنیت از سوی ایران"; break;

                    }
                    break;
                case 5:
                    switch (pRoz)
                    {
                        case 5: Monasebat = "سالروز عملیات افتخار آفرین مرصاد"; break;
                        case 6: Monasebat = "روز ترویج آموزش های فنی و حرفه ای"; break;
                        case 8: Monasebat = "روز بزرگداشت شیخ شهاب الدین سهروردی شیخ اشراق"; break;
                        case 9: Monasebat = "روز اهدای خون"; break;
                        case 14: Monasebat = "صدور فرمان مشروطیت"; break;
                        case 16: Monasebat = "تشکیل جهاد دانشگاهی "; break;
                        case 17: Monasebat = "روز خبرنگار"; break;
                        case 26: Monasebat = "آغاز بازگشت آزادگان به میهن اسلامی"; break;
                        case 28: Monasebat = "کودتای آمریکا برای بازگرداندن شاه"; break;
                        case 30: Monasebat = "روز بزرگداشت علامه مجلسی"; break;
                        case 31: Monasebat = "روز جهانی مسجد"; break;
                    }
                    break;
                case 6:
                    switch (pRoz)
                    {
                        case 1: Monasebat = "روز پزشک - روز بزرگداشت ابوعلی سینا"; break;
                        case 2: Monasebat = "آغاز هفته دولت"; break;
                        case 4: Monasebat = "روز کارمند"; break;
                        case 5: Monasebat = "روز دارو سازی - روز بزرگداشت محمد بن زکریای رازی"; break;
                        case 8: Monasebat = "روز مبارزه با تروریسم - انفجار دفتر نخست وزیری"; break;
                        case 10: Monasebat = "روز بانکداری اسلامی - سالروز تصویب قانون عملیات بانکی بدون ربا"; break;
                        case 11: Monasebat = "روز صنعت چاپ"; break;
                        case 13: Monasebat = "روز تعاون - روز بزرگداش ابو ریحان بیرونی"; break;
                        case 14: Monasebat = "شهادت آیت الله قدوسی و سرتیپ وحید دستجردی"; break;
                        case 17: Monasebat = "قیام 17 شهریور و کشتار جمعی از مردم به دست ماموران پهلوی"; break;
                        case 19: Monasebat = "وفات آیت الله سید محمد طالقانی اولین امام جمعه تهران"; break;
                        case 20: Monasebat = "شهادت دوین شهید محراب آیت الله مدنی به دست منافقین"; break;
                        case 21: Monasebat = "روز سینما"; break;
                        case 27: Monasebat = "روز شعر و ادب فارسی - وز بزرگداشت استاد سید محمد حسین شهریار"; break;
                        case 31: Monasebat = "آغاز جنگ تحمیلی - آغاز هفته ی دفاع مقدس"; break;
                    }
                    break;
                case 7:
                    switch (pRoz)
                    {


                        case 5: Monasebat = "شکست حصر آبادان در عملیات ثامن الائمه"; break;
                        case 6: Monasebat = "روز جهانی جهانگردی"; break;
                        case 7: Monasebat = "روز آتشنشانی و ایمنی - شهادت سرداران اسلام"; break;
                        case 8: Monasebat = "روز بزرگداشت مولوی"; break;
                        case 9: Monasebat = "روز جهانی ناشنوایان و روز همبستگی کودکان و نوجوانان فلسطینی"; break;
                        case 13: Monasebat = "هجرت حضرت امام خمینی ره از عراق به پاریس - روز نیروی انتظامی"; break;
                        case 14: Monasebat = "روز دامپزشکی"; break;
                        case 17: Monasebat = "روز جهانی کودک "; break;
                        case 20: Monasebat = "روز بزگداشت حافظ - روز اسکان معلولان و سالمندان - روز ملی کاهش بلایای طبیعی"; break;
                        case 23: Monasebat = "شهادت پنجمین شهید معراب آیت الله اشرفی اصفهانی - روز جهانی استاندارد"; break;
                        case 24: Monasebat = "روز پیوند اولیا و مربیان - روز جهانی نابینایان عصای سفید"; break;
                        case 26: Monasebat = "روز تربیت بدنی و ورزش"; break;
                        case 29: Monasebat = "روز صادرات"; break;
                    }
                    break;
                case 8:
                    switch (pRoz)
                    {
                        case 1: Monasebat = "روز آمار  برنامه ریزی"; break;
                        case 4: Monasebat = "اعتراض افشاگری حضرت امام خمینی ره علیه پذیرش کاپیتولاسیون"; break;
                        case 8: Monasebat = "شهادت محمد حسین فهمیده - روز نوجوان - روز بسیج دانش آموزی"; break;
                        case 10: Monasebat = "شهادت آیت الله قاضی طباطبایی اولین شهید محراب"; break;
                        case 13: Monasebat = "روز ملی مبارزه با استکبار جهانی - روز دانش آموز - تسخیر لانه جاسوسی آمریکا به دست دانشجویان پیرو خط امام"; break;
                        case 14: Monasebat = "روز فرهنگ عمومی"; break;
                        case 18: Monasebat = "روز ملی کیفیت"; break;
                        case 24: Monasebat = "روز کتابخوانی - روز بزرگداشت علامه سید محمد حسین طباطبایی"; break;
                    }
                    break;
                case 9:
                    switch (pRoz)
                    {
                        case 5: Monasebat = "روز بسیج مستضعفان - تشکیل بسیج مستضعفین به فرمان حضرت امام خمینی ره"; break;
                        case 7: Monasebat = "روز نیروی دریایی"; break;
                        case 9: Monasebat = "روز بزرگداشت شیخ مفید"; break;
                        case 10: Monasebat = "شهادت آیت سید حسن مدرس و روز مجلس"; break;
                        case 12: Monasebat = "تصویب قانون اساسی جمهوری اسلامی ایران"; break;
                        case 13: Monasebat = "روز جهانی معلولان و روز بیمه"; break;
                        case 15: Monasebat = "شهادت مظلومانه زائران خانه ی خدا به دستور آمریکا"; break;
                        case 16: Monasebat = "روز دانشجو"; break;
                        case 18: Monasebat = "معرفی عراق بعنوان مسئول و آغاز جنگ از سوی سازمان ملل"; break;
                        case 19: Monasebat = "تشکیل شورای انقلاب فرهنگی به فرمان حضرت امام خمینی ره "; break;
                        case 20: Monasebat = "شهادت آیت الله دست غیب سومین شهید محراب به دست منافقین"; break;
                        case 25: Monasebat = "روز پژوهش"; break;
                        case 26: Monasebat = "روز حمل ونقل"; break;
                        case 27: Monasebat = "شهادت آیت الله دکتر محمد مفتح - روز وحدت حوزه و دانشگاه"; break;
                    }
                    break;
                case 10:
                    switch (pRoz)
                    {
                        case 5: Monasebat = "روز ملی ایمنی در برابر زلزله"; break;
                        case 7: Monasebat = "سالروز تشکیل نهضت سوادآموزی به فرمان حضرت امام خمینی ره - شهادت آیت الله حسین غفاری به دست پهلوی"; break;
                        case 19: Monasebat = "قیام خونین مردم قم - روز تجلیل از اسرا و مفقودان"; break;
                        case 20: Monasebat = "شهادت میرزا تقی خان امیر کبیر"; break;
                        case 22: Monasebat = "تشکیل شورای انقلاب به فرمان حضرت امام خمینی ره"; break;
                        case 26: Monasebat = "فرار شاه معدوم"; break;
                        case 27: Monasebat = "شهادت نواب صفوی ، طهماسبی ، برادران واحدی و ذوالقدر از فداییان اسلام"; break;
                    }
                    break;
                case 11:
                    switch (pRoz)
                    {
                        case 6: Monasebat = "سالروز حماسه مردم آمل"; break;
                        case 12: Monasebat = "بازگشت حضرت امام خمینی ره به ایران و آغاز دهه ی مبارک فجر"; break;
                        case 14: Monasebat = " پرتاب موفقيت آميز ماهواره اميد به فضا و بازتاب آن در رسانه هاي جهان "; break;
                        case 19: Monasebat = "روز نیروی هوایی"; break;
                        case 22: Monasebat = "پیروزی انقلاب و سقوط شاهنشاهی -- تعطیل"; break;
                        case 29: Monasebat = "قیام مردم تبریز چهلمین روز شهادت شهدای قم"; break;
                    }
                    break;
                case 12:
                    switch (pRoz)
                    {
                        case 5: Monasebat = "روز بزرگداشت خواجه نصیرالدین طوسی - روز مهندسی - روز وقف"; break;
                        case 8: Monasebat = "روز امور تربیتی و تربیت اسلامی"; break;
                        case 9: Monasebat = "روز ملی حمایت از حقوق مصرف کنندگاه"; break;
                        case 14: Monasebat = "روز احسان و نیکوکاری"; break;
                        case 15: Monasebat = "روز درختکاری"; break;
                        case 22: Monasebat = "روز بزرگداشت شهدا"; break;
                        case 25: Monasebat = "روز اخلاق و مهرورزی -  بمباران شیمیایی حلبچه توسط عراق"; break;
                        case 29: Monasebat = "روز ملی شدن صنعت نفت ایران -- تعطیل"; break;
                    }
                    break;
            }
            #endregion
            return Monasebat;
        }
        /// <summary>
        /// تقویم مناسبتی هجری قمری
        /// </summary>
        /// <param name="HiejriDate">رشته تاریخ قمری  - 1436/01/20</param>
        /// <returns>مناسبت های امروز قمری</returns>
        public static string TaghvimGhamari(string HiejriDate)
        {
            if (HiejriDate.Length < 10) return "تاریخ هجری قمری نامعتبر است";
            int hRoz = int.Parse(HiejriDate.Substring(8, 2));
            int hMah = int.Parse(HiejriDate.Substring(5, 2));
            string Monasebat = "";
            #region CheckHeijriMahRoz
            switch (hMah)
            {
                case 1:
                    switch (hRoz)
                    {
                        case 1: Monasebat = "آغاز سال جدید قمری"; break;
                        case 9: Monasebat = "تاسوعای حسینی -- تعطیل"; break;
                        case 10: Monasebat = "عاشورای حسینی -- تعطیل"; break;
                        case 12: Monasebat = " شهادت حضرت زین العابدین ع"; break;
                        case 18: Monasebat = "تغییر قبله مسلمین از بیت المقدس به مکه"; break;
                        case 25: Monasebat = "شهادت امام زین العابدین علیه السلام به روایتی"; break;
                    }
                    break;
                case 2:
                    switch (hRoz)
                    {
                        case 3: Monasebat = "ولادت حضرت امام محمد باقر ع"; break;
                        case 7: Monasebat = "ولادت حضرت امام موسی کاظم ع"; break;
                        case 20: Monasebat = "اربعین حسینی -- تعطیل"; break;
                        case 28: Monasebat = "رحلت حضرت رسول اکرم ص - شهادت حضرت امام حسن مجتبی ع -- تعطیل"; break;
                        case 30: Monasebat = "شهادت حضرت امام رضا ع - تعطیل"; break;
                    }
                    break;
                case 3:
                    switch (hRoz)
                    {
                        case 1: Monasebat = "هجرت حضرت رسول ص از مکه به مدینه - مبداگاه شماری هجری قمری"; break;
                        case 8: Monasebat = "شهادت حضرت امام حسن عسگری ع"; break;
                        case 12: Monasebat = "میلاد حضرت رسول اکرم به روایت اهل سنت - آغاز هفته وحدت"; break;
                        case 17: Monasebat = "میلاد حضرت رسول اکرم و روز اخلاق و مهرورزی -- میلاد امام جعفر صادق -- تعطیل"; break;
                    }
                    break;
                case 4:
                    switch (hRoz)
                    {
                        case 8: Monasebat = "ولادت امام حسن عسکری علیه السلام"; break;
                        case 10: Monasebat = "(وفات حضرت معصومه (س"; break;
                    }
                    break;
                case 5:
                    switch (hRoz)
                    {
                        case 5: Monasebat = "ولادت حضرت زینب س - روز پرستار و بهورز"; break;
                    }
                    break;
                case 6:
                    switch (hRoz)
                    {
                        case 3: Monasebat = "شهادت حضرت فاطمه زهرا س -- تعطیل"; break;
                        case 30: Monasebat = "ولادت حضرت فاطمه زهرا - ولادت حضرت امام خمینی"; break;
                    }
                    break;
                case 7:
                    switch (hRoz)
                    {
                        case 1: Monasebat = "ولادت حضرت امام محمد باقر"; break;
                        case 3: Monasebat = "شهادت حضرت امام علی النقی الهادی "; break;
                        case 10: Monasebat = "ولادت حضرت امام محمد تقی ع جواد الائمه"; break;
                        case 13: Monasebat = "ولادت حضرت امام علی  علیه السلام - آغاز ایام اعتکاف -- تعطیل"; break;
                        case 15: Monasebat = "وفات حضرت زینب"; break;
                        case 25: Monasebat = "شهادت حضرت امام موسی کاظم ع"; break;
                        case 27: Monasebat = "مبعث رسول اکرم ص -- تعطیل"; break;
                    }
                    break;
                case 8:
                    switch (hRoz)
                    {
                        case 3: Monasebat = "ولادت حضرت امام حسین ع و روز پاسدار"; break;
                        case 4: Monasebat = "ولادت حضرت ابوالفضل العباس و روز جانباز"; break;
                        case 5: Monasebat = "ولادت حضرت امام زین العابدین ع"; break;
                        case 11: Monasebat = "ولادت حضرت علی اکبر ع و روز جوان"; break;
                        case 15: Monasebat = "ولادت حضرت قائم عج روز جهانی مستضعفان -- تعطیل"; break;
                    }
                    break;
                case 9:
                    switch (hRoz)
                    {
                        case 10: Monasebat = "وفات حضرت خدیجه س"; break;
                        case 15: Monasebat = "ولادت حضرت امام حسن مجتبی علیه السلام و روز اکرام"; break;
                        case 18: Monasebat = "شب قدر"; break;
                        case 19: Monasebat = " ضربت خوردن حضرت علی ع روز گفت و گوی تمدنها"; break;
                        case 20: Monasebat = "شب قدر"; break;
                        case 21: Monasebat = "شهادت حضرت علی علیه السلام -- تعطیل"; break;
                        case 22: Monasebat = "شب قدر"; break;
                    }
                    break;
                case 10:
                    switch (hRoz)
                    {
                        case 1: Monasebat = "عید سعید فطر -- تعطیل"; break;
                        case 3: Monasebat = "سالروز شهادت حضرت سلطان علی بن امام محمد باقر"; break;
                        case 25: Monasebat = "شهادت امام جعفر صادق ع -- تعطیل"; break;
                    }
                    break;
                case 11:
                    switch (hRoz)
                    {
                        case 1: Monasebat = "ولادت حضرت معصومه سلام الله علیها و روز دختران"; break;
                        case 11: Monasebat = "میلاد هشتمین اختر تابناک آسمان امامت و ولایت حضرت علی بن موسی الرضا(ع)  مبارک باد"; break;
                        case 29: Monasebat = "شهادت امام محمد تقی ع جواد الائمه"; break;
                    }
                    break;
                case 12:
                    switch (hRoz)
                    {
                        case 1: Monasebat = "سالروز ازدواج حضرت علی ع و حضرت فاطمه س"; break;
                        case 7: Monasebat = "شهادت امام محمد باقر ع"; break;
                        case 9: Monasebat = "روز عرفه - روز نیایش"; break;
                        case 10: Monasebat = "عید سعید قربان -- تعطیل "; break;
                        case 15: Monasebat = "ولادت حضرت امام علی النقی الهادی ع"; break;
                        case 18: Monasebat = "روز غدیر خم "; break;
                        case 24: Monasebat = "روز مباهله پیامبر اسلام ص"; break;
                        case 25: Monasebat = " روز خانواده وتکریم بازنشستگان "; break;
                    }
                    break;

            }
            #endregion
            return Monasebat;

        }
        /// <summary>
        /// تقویم مناسبتی میلادی
        /// </summary>
        /// <param name="GeorgianDate">رشته تاریخ میلادی - 2014/01/26</param>
        /// <returns>مناسبت های امروز میلادی</returns>
        public static string TaghvimMiladi(string GeorgianDate)
        {
            if (GeorgianDate.Length < 10) return "تاریخ میلادی نامعتبر است";
            int gRoz = int.Parse(GeorgianDate.Substring(8, 2));
            int gMah = int.Parse(GeorgianDate.Substring(5, 2));
            string Monasebat = "";
            #region CheckGeorgianMahRoz
            switch (gMah)
            {
                case 1:
                    switch (gRoz)
                    {
                        case 1: Monasebat = "آغاز سال جدید میلادی"; break;
                    }
                    break;
                case 12:
                    switch (gRoz)
                    {
                        case 25: Monasebat = "میلاد حضرت عیسی مسیح علیه السلام"; break;
                    }
                    break;
            }
            #endregion
            return Monasebat;
        }
        #endregion

        /// <summary>
        /// این متد با گرفتن تاریخ شمسی مورد نظرتان ، تاریخ شمسی چند روز بعد مورد نظرتان را برمیگرداند 
        /// </summary>
        /// <param name="ShamaiDate">تاریخ شمسی : 1393/12/29</param>
        /// <param name="NextDayValue">چند روز بعد - مثال 3 روز بعد</param>
        /// <returns>1394/01/01</returns>
        public static string getNextDays(string ShamaiDate, int NextDayValue)
        {

            System.DateTime NowTime = Convert.ToDateTime(ConvertPersianDateToGregorianDate(correctDate(ShamaiDate))).AddDays(NextDayValue);
            return ConvertGregorianDateToPersianDate(NowTime.Year + "/" + string.Format("{0:D2}", NowTime.Month) + "/" + string.Format("{0:D2}", NowTime.Day));
        }
        /// <summary>
        /// این متد با گرفتن تاریخ شمسی موماختان ، تاریخ شمسی چند روز بعد مورد نظرتان را برمیگرداند 
        /// </summary>
        /// <param name="ShamaiDate">تاریخ شمسی : 1393/12/29</param>
        /// <param name="NextDayValue">چند روز بعد - مثال 3 روز بعد</param>
        /// <returns>1394/01/01</returns>
        public static string getNextDaysByMonth(string ShamaiDate, int NextDayValue)
        {

            System.DateTime NowTime = Convert.ToDateTime(ConvertPersianDateToGregorianDate(correctDate(ShamaiDate))).AddMonths(NextDayValue);
            return ConvertGregorianDateToPersianDate(NowTime.Year + "/" + string.Format("{0:D2}", NowTime.Month) + "/" + string.Format("{0:D2}", NowTime.Day));
        }
        /// <summary>
        /// این متد با گرفتن تاریخ شمسی مورد نظرتان ، تاریخ شمسی چند روز بعد مورد نظرتان را برمیگرداند 
        /// </summary>
        /// <param name="ShamaiDate">تاریخ شمسی : 1393/12/29</param>
        /// <param name="NextDayValue">چند روز بعد - مثال 3 روز بعد</param>
        /// <returns>1394/01/01</returns>
        public static string getNextDaysByYear(string ShamaiDate, int NextDayValue)
        {

            System.DateTime NowTime = Convert.ToDateTime(ConvertPersianDateToGregorianDate(correctDate(ShamaiDate))).AddYears(NextDayValue);
            return ConvertGregorianDateToPersianDate(NowTime.Year + "/" + string.Format("{0:D2}", NowTime.Month) + "/" + string.Format("{0:D2}", NowTime.Day));
        }
        public static string PersianToday()
        {
            PersianCalendar pc = new PersianCalendar();
            string Year = pc.GetYear(System.DateTime.Now).ToString();
            string Month = pc.GetMonth(System.DateTime.Now).ToString();
            string Day = pc.GetDayOfMonth(System.DateTime.Now).ToString();
            return Year + "/" + (Month.Length == 1 ? "0" + Month : Month) + "/" + (Day.Length == 1 ? "0" + Day : Day);
        }
        public static string PersianTodayWithTime()
        {
            PersianCalendar pc = new PersianCalendar();
            string Year = pc.GetYear(System.DateTime.Now).ToString();
            string Month = pc.GetMonth(System.DateTime.Now).ToString();
            string Day = pc.GetDayOfMonth(System.DateTime.Now).ToString();
            string Hour = System.DateTime.Now.Hour.ToString();
            string Minute = System.DateTime.Now.Minute.ToString();
            string Second = System.DateTime.Now.Second.ToString();
            return Year + "/" + (Month.Length == 1 ? "0" + Month : Month) + "/" + (Day.Length == 1 ? "0" + Day : Day) + " " + Hour + ":" + Minute;// + ":" + Second;
        }
        public static string GetPersianDayOfWeekNumber(this System.DateTime date)
        {
            switch (date.DayOfWeek)
            {
                case DayOfWeek.Saturday: return "1";
                case DayOfWeek.Sunday: return "2";
                case DayOfWeek.Monday: return "3";
                case DayOfWeek.Tuesday: return "4";
                case DayOfWeek.Wednesday: return "5";
                case DayOfWeek.Thursday: return "6";
                case DayOfWeek.Friday: return "7";
                default: return "";
            }
        }

        /// <summary>
        /// متد تبدیل تاریخ به حروف تقویم شمسی
        /// </summary>
        /// <returns>مثال : سه شنبه 1 بهمن 1392 </returns>
        public static string ConvertPersianDateToLetter(string datetime)
        {
            string[] datetimeSplit = datetime.Replace(" ", "-").Split('-');
            string FDate = datetimeSplit[0].Replace("/", "");
            string syy = "";
            string smm = "";
            string sdd = "";
            int yy, mm, dd;
            BreakDate(FDate, ref syy, ref smm, ref sdd);
            yy = Convert.ToInt16(syy);
            mm = Convert.ToInt16(smm);
            dd = Convert.ToInt16(sdd);
            return getPersianDayName(FDate) + " " + dd + " " + getPersianMonthName(FDate) + " " + yy + " " + "ساعت" + " " + datetimeSplit[1].Substring(0,5);
        }
    }
}