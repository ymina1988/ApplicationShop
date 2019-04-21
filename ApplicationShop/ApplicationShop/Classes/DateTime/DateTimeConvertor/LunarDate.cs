namespace Persia
{
    using System;
    using System.Globalization;
    using System.Runtime.CompilerServices;

    public sealed class LunarDate
    {
        private readonly string[] LunarMonths = new string[] { "محرم", "صفر", "ربیع الاول", "ربیع الثانی", "جمادی الاولی", "جمادی الثانیة", "رجب", "شعبان", "رمضان", "شوال", "ذی قعده", "ذی حجّه" };
        private readonly string[] LunarWeekDays = new string[] { "اسبت", "الاحد", "الاثنین", "اثلاثا", "الاربعا", "الخمیس", "اجمعه" };
        private readonly string[] WeekDays = new string[] { "شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه" };

        private static string ConvertToArabic(int number)
        {
            string str = number.ToString();
            string str2 = "";
            int length = str.Length;
            if (length == 0)
            {
                return str;
            }
            for (int i = 0; i < length; i++)
            {
                char ch = str[i];
                if (('0' <= ch) && (ch <= '9'))
                {
                    ch = (char) (ch + 'ذ');
                }
                str2 = str2 + ch;
            }
            return str2;
        }

        public string ToString()
        {
            string str = this.ArrayType[1].ToString();
            string str2 = this.ArrayType[2].ToString();
            if (this.ArrayType[1] < 10)
            {
                str = this.ArrayType[1].ToString().Insert(0, "0");
            }
            if (this.ArrayType[2] < 10)
            {
                str2 = this.ArrayType[2].ToString().Insert(0, "0");
            }
            return string.Format("{0}/{1}/{2}", this.ArrayType[0], str, str2);
        }

        public string ToString(string dateFormatSpecifier)
        {
            switch (dateFormatSpecifier)
            {
                case "M":
                    return (ConvertToArabic(this.ArrayType[2]) + " " + this.LunarMonths[this.ArrayType[1] - 1] + " " + ConvertToArabic(this.ArrayType[0]));

                case "D":
                    return (this.WeekDays[this.DayOfWeek] + " " + ConvertToArabic(this.ArrayType[2]) + " " + this.LunarMonths[this.ArrayType[1] - 1] + " " + ConvertToArabic(this.ArrayType[0]));

                case "N":
                    return (this.LunarWeekDays[this.DayOfWeek] + " " + ConvertToArabic(this.ArrayType[2]) + " " + this.LunarMonths[this.ArrayType[1] - 1] + " " + ConvertToArabic(this.ArrayType[0]));

                case "H":
                    return string.Format("{0} / {1} / {2}", ConvertToArabic(this.ArrayType[0]), ConvertToArabic(this.ArrayType[1]), ConvertToArabic(this.ArrayType[2]));
            }
            return string.Format("{0} / {1} / {2}", ConvertToArabic(this.ArrayType[0]), ConvertToArabic(this.ArrayType[1]), ConvertToArabic(this.ArrayType[2]));
        }

        public int[] ArrayType { get; set; }

        public int DayOfWeek { get; set; }

        public bool IsLeapYear
        {
            get
            {
                return new HijriCalendar().IsLeapYear(this.ArrayType[0]);
            }
        }
    }
}

