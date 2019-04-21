namespace Persia
{
    using System;
    using System.Runtime.CompilerServices;

    public sealed class SolarDate
    {
        private readonly string[] Days = new string[] { 
            "یکم", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم", "هشتم", "نهم", "دهم", "یازدهم", "دوازدهم", "سیزدهم", "چهاردهم", "پانزدهم", "شانزدهم", 
            "هفدهم", "هجدهم", "نوزدهم", "بیستم", "بیست و یکم", "بیست و دوم", "بیست و سوم", "بیست و چهارم", "بیست و پنجم", "بیست و ششم", "بیست و هفتم", "بیست و هشتم", "بیست و نهم", "سی ام", "سی و یکم"
         };
        private readonly string[] SolarMonths = new string[] { "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند" };
        private readonly string[] WeekDays = new string[] { "شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه" };

        public string ToRelativeDateString(string specifier)
        {
            TimeSpan span;
            int num = 0;
            int num2 = 0;
            int num3 = 0;
            string[] strArray = specifier.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            switch (strArray.Length)
            {
                case 1:
                    specifier = strArray[0];
                    break;

                case 2:
                    specifier = strArray[0];
                    num = int.Parse(strArray[1]);
                    break;

                case 3:
                    specifier = strArray[0];
                    num = int.Parse(strArray[1]);
                    num2 = int.Parse(strArray[2]);
                    break;

                case 4:
                    specifier = strArray[0];
                    num = int.Parse(strArray[1]);
                    num2 = int.Parse(strArray[2]);
                    num3 = int.Parse(strArray[3]);
                    break;
            }
            switch (specifier)
            {
                case "D":
                    span = (TimeSpan) (DateTime.Now - this.dateTime);
                    num = (num == 0) ? 30 : num;
                    if ((span.Days > num) || (span.Days <= 0))
                    {
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return string.Format("{0} روز پیش", PersianWord.ToPersianString(span.Days));

                case "T":
                    if (!(this.dateTime.Date == DateTime.Now.Date))
                    {
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return "امروز";

                case "Y":
                    if (!(this.dateTime.Date == DateTime.Now.Date))
                    {
                        if (this.dateTime.Date.AddDays(1.0) == DateTime.Now.Date)
                        {
                            return "دیروز";
                        }
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return "امروز";

                case "TY":
                    if (!(this.dateTime.Date == DateTime.Now.Date))
                    {
                        if (this.dateTime.Date.AddDays(1.0) == DateTime.Now.Date)
                        {
                            return "دیروز";
                        }
                        num = (num == 0) ? 7 : num;
                        return this.ToRelativeDateString(string.Format("D,{0}", num));
                    }
                    return "امروز";

                case "N":
                    span = (TimeSpan) (DateTime.Now - this.dateTime);
                    num = (num == 0) ? 5 : ((num > 5) ? 5 : num);
                    if ((span.TotalMinutes > num) || (span.TotalMinutes <= 0.0))
                    {
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return "اکنون";

                case "M":
                    span = (TimeSpan) (DateTime.Now - this.dateTime);
                    num = (num == 0) ? 60 : ((num > 60) ? 60 : num);
                    if ((span.TotalMinutes > num) || (span.TotalMinutes <= 0.0))
                    {
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return string.Format("{0} دقیقه پیش", PersianWord.ToPersianString(span.Minutes));

                case "H":
                    span = (TimeSpan) (DateTime.Now - this.dateTime);
                    num = (num == 0) ? 0x18 : ((num > 0x18) ? 0x18 : num);
                    if ((span.TotalHours > num) || (span.TotalHours <= 0.0))
                    {
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return string.Format("{0} ساعت پیش", PersianWord.ToPersianString(span.Hours));

                case "h":
                    span = (TimeSpan) (DateTime.Now - this.dateTime);
                    if ((span.TotalHours > 1.0) || (span.TotalHours <= 0.0))
                    {
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return "کمتر از یک ساعت پیش";

                case "m":
                    span = (TimeSpan) (DateTime.Now - this.dateTime);
                    if ((span.TotalMinutes > 1.0) || (span.TotalMinutes <= 0.0))
                    {
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return "کمتر از یک دقیقه پیش";

                case "n":
                    span = (TimeSpan) (DateTime.Now - this.dateTime);
                    num = (num == 0) ? 5 : ((num > 5) ? 5 : num);
                    num2 = (num2 == 0) ? 60 : ((num2 > 60) ? 60 : num2);
                    if ((span.TotalMinutes > num) || (span.TotalMinutes <= 0.0))
                    {
                        if ((span.TotalMinutes <= num2) && (span.TotalMinutes > 0.0))
                        {
                            return this.ToRelativeDateString(string.Format("M,{0}", num2));
                        }
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return "اکنون";

                case "p":
                    span = (TimeSpan) (DateTime.Now - this.dateTime);
                    num = (num == 0) ? 5 : ((num > 5) ? 5 : num);
                    num2 = (num2 == 0) ? 60 : ((num2 > 60) ? 60 : num2);
                    num3 = (num3 == 0) ? 0x18 : ((num3 > 0x18) ? 0x18 : num3);
                    if ((span.TotalMinutes > num) || (span.TotalMinutes <= 0.0))
                    {
                        if ((span.TotalMinutes <= num2) && (span.TotalMinutes > 0.0))
                        {
                            return this.ToRelativeDateString(string.Format("M,{0}", num2));
                        }
                        if ((span.TotalHours <= num3) && (span.TotalHours > 0.0))
                        {
                            return this.ToRelativeDateString(string.Format("H,{0}", num3));
                        }
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return "اکنون";

                case "t":
                    span = (TimeSpan) (DateTime.Now - this.dateTime);
                    num = (num == 0) ? 5 : ((num > 5) ? 5 : num);
                    num2 = (num2 == 0) ? 60 : ((num2 > 60) ? 60 : num2);
                    if ((span.TotalMinutes > num) || (span.TotalMinutes <= 0.0))
                    {
                        if ((span.TotalMinutes <= num2) && (span.TotalMinutes > 0.0))
                        {
                            return this.ToRelativeDateString(string.Format("M,{0}", num2));
                        }
                        if (DateTime.Now.Date == this.dateTime.Date)
                        {
                            return this.ToRelativeDateString("Y");
                        }
                        return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
                    }
                    return "اکنون";
            }
            return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
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

        public string ToString(string dateTimeFormatSpecifier)
        {
            string str2;
            string[] strArray = dateTimeFormatSpecifier.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            if (strArray.Length == 2)
            {
                return (this.ToString(strArray[0]) + "  " + this.ToString(strArray[1]));
            }
            switch (dateTimeFormatSpecifier)
            {
                case "D":
                    return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));

                case "d":
                    return (PersianWord.ToPersianString(this.ArrayType[0].ToString().Remove(0, 2)) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));

                case "F":
                    return (PersianWord.ToPersianString(this.ArrayType[0]) + " " + this.Days[this.ArrayType[2] - 1] + " " + this.SolarMonths[this.ArrayType[1] - 1]);

                case "f":
                    return (PersianWord.ToPersianString(this.ArrayType[0].ToString().Remove(0, 2)) + " " + this.Days[this.ArrayType[2] - 1] + " " + this.SolarMonths[this.ArrayType[1] - 1]);

                case "W":
                    return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]) + " " + this.WeekDays[this.DayOfWeek]);

                case "w":
                    return (PersianWord.ToPersianString(this.ArrayType[0].ToString().Remove(0, 2)) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]) + " " + this.WeekDays[this.DayOfWeek]);

                case "S":
                    return (this.WeekDays[this.DayOfWeek] + " " + this.Days[this.ArrayType[2] - 1] + " " + this.SolarMonths[this.ArrayType[1] - 1] + " " + PersianWord.ToPersianString(this.ArrayType[0]) + " ");

                case "s":
                    return (this.WeekDays[this.DayOfWeek] + " " + this.Days[this.ArrayType[2] - 1] + " " + this.SolarMonths[this.ArrayType[1] - 1] + " " + PersianWord.ToPersianString(this.ArrayType[0].ToString().Remove(0, 2)) + " ");

                case "M":
                    return (PersianWord.ToPersianString(this.ArrayType[2]) + " " + this.SolarMonths[this.ArrayType[1] - 1] + " " + PersianWord.ToPersianString(this.ArrayType[0]));

                case "m":
                    return (PersianWord.ToPersianString(this.ArrayType[2]) + " " + this.SolarMonths[this.ArrayType[1] - 1] + " " + PersianWord.ToPersianString(this.ArrayType[0].ToString().Remove(0, 2)));

                case "N":
                    return (this.WeekDays[this.DayOfWeek] + " " + PersianWord.ToPersianString(this.ArrayType[2]) + " " + this.SolarMonths[this.ArrayType[1] - 1] + " " + PersianWord.ToPersianString(this.ArrayType[0]));

                case "n":
                    return (this.WeekDays[this.DayOfWeek] + " " + PersianWord.ToPersianString(this.ArrayType[2]) + " " + this.SolarMonths[this.ArrayType[1] - 1] + " " + PersianWord.ToPersianString(this.ArrayType[0].ToString().Remove(0, 2)));

                case "g":
                    return (this.WeekDays[this.DayOfWeek] + " " + PersianWord.ToPersianString(this.ArrayType[2]) + " " + this.SolarMonths[this.ArrayType[1] - 1]);

                case "E":
                    return (this.SolarMonths[this.ArrayType[1] - 1] + " " + PersianWord.ToPersianString(this.ArrayType[0]));

                case "e":
                    return (this.SolarMonths[this.ArrayType[1] - 1] + " " + PersianWord.ToPersianString(this.ArrayType[0].ToString().Remove(0, 2)));

                case "Q":
                    return (PersianWord.ToPersianString(this.ArrayType[2]) + " " + this.SolarMonths[this.ArrayType[1] - 1]);

                case "q":
                    return (this.Days[this.ArrayType[2] - 1] + " " + this.SolarMonths[this.ArrayType[1] - 1]);

                case "L":
                    return this.ToString().Remove(0, 2);

                case "H":
                    return (PersianWord.ToPersianString(this.ArrayType[3]) + ":" + PersianWord.ToPersianString(this.ArrayType[4]) + ":" + PersianWord.ToPersianString(this.ArrayType[5]));

                case "R":
                    return (PersianWord.ToPersianString(this.ArrayType[3]) + ":" + PersianWord.ToPersianString(this.ArrayType[4]) + ":" + PersianWord.ToPersianString(this.ArrayType[5]) + " ساعت");

                case "HH":
                    if (this.ArrayType[3] <= 12)
                    {
                        if (this.ArrayType[3] == 12)
                        {
                            str2 = "بعد از ظهر";
                        }
                        else
                        {
                            str2 = "قبل از ظهر";
                        }
                        break;
                    }
                    this.ArrayType[3] -= 12;
                    str2 = "بعد از ظهر";
                    break;

                case "hh":
                    if (this.ArrayType[3] <= 12)
                    {
                        if (this.ArrayType[3] == 12)
                        {
                            str2 = "ب ظ";
                        }
                        else
                        {
                            str2 = "ق ظ";
                        }
                    }
                    else
                    {
                        this.ArrayType[3] -= 12;
                        str2 = "ب ظ";
                    }
                    return (PersianWord.ToPersianString(this.ArrayType[3]) + ":" + PersianWord.ToPersianString(this.ArrayType[4]) + ":" + PersianWord.ToPersianString(this.ArrayType[5]) + " " + str2);

                case "T":
                    if (this.ArrayType[3] <= 12)
                    {
                        if (this.ArrayType[3] == 12)
                        {
                            str2 = "بعد از ظهر";
                        }
                        else
                        {
                            str2 = "قبل از ظهر";
                        }
                    }
                    else
                    {
                        this.ArrayType[3] -= 12;
                        str2 = "بعد از ظهر";
                    }
                    return ("ساعت " + PersianWord.ToPersianString(this.ArrayType[3]) + ":" + PersianWord.ToPersianString(this.ArrayType[4]) + ":" + PersianWord.ToPersianString(this.ArrayType[5]) + " " + str2);

                case "t":
                    if (this.ArrayType[3] <= 12)
                    {
                        if (this.ArrayType[3] == 12)
                        {
                            str2 = "ب ظ";
                        }
                        else
                        {
                            str2 = "ق ظ";
                        }
                    }
                    else
                    {
                        this.ArrayType[3] -= 12;
                        str2 = "ب ظ";
                    }
                    return ("ساعت " + PersianWord.ToPersianString(this.ArrayType[3]) + ":" + PersianWord.ToPersianString(this.ArrayType[4]) + ":" + PersianWord.ToPersianString(this.ArrayType[5]) + " " + str2);

                default:
                    return (PersianWord.ToPersianString(this.ArrayType[0]) + "/" + PersianWord.ToPersianString(this.ArrayType[1]) + "/" + PersianWord.ToPersianString(this.ArrayType[2]));
            }
            return (PersianWord.ToPersianString(this.ArrayType[3]) + ":" + PersianWord.ToPersianString(this.ArrayType[4]) + ":" + PersianWord.ToPersianString(this.ArrayType[5]) + " " + str2);
        }

        public int[] ArrayType { get; set; }

        internal DateTime dateTime { get; set; }

        public int DayOfWeek { get; set; }

        public int DaysPast
        {
            get
            {
                DateTime time = Calendar.ConvertToGregorian(this.ArrayType[0], 1, 1, DateType.Persian);
                TimeSpan span = (TimeSpan) (this.dateTime - time);
                return span.Days;
            }
        }

        public int DaysRemain
        {
            get
            {
                TimeSpan span = (TimeSpan) (Calendar.ConvertToGregorian(this.ArrayType[0] + 1, 1, 1, DateType.Persian) - this.dateTime);
                return span.Days;
            }
        }

        public bool IsLeapYear
        {
            get
            {
                return (((((((this.ArrayType[0] - ((this.ArrayType[0] > 0) ? 0x1da : 0x1d9)) % 0xb04) + 0x1da) + 0x26) * 0x2aa) % 0xb00) < 0x2aa);
            }
        }
    }
}

