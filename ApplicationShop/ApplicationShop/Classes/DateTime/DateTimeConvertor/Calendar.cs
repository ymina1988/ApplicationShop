namespace Persia
{
    using System;
    using System.Globalization;

    public static class Calendar
    {
        private const float GregorianEpoch = 1721426f;
        private const float IslamicEpoch = 1948440f;
        private const float PersianEpoch = 1948321f;

        public static DateTime ConvertToGregorian(LunarDate lunarDate)
        {
            return ConvertToGregorian(lunarDate.ArrayType[0], lunarDate.ArrayType[1], lunarDate.ArrayType[2], lunarDate.ArrayType[3], lunarDate.ArrayType[4], lunarDate.ArrayType[5], true);
        }

        public static DateTime ConvertToGregorian(SolarDate solarDate)
        {
            return ConvertToGregorian(solarDate.ArrayType[0], solarDate.ArrayType[1], solarDate.ArrayType[2], solarDate.ArrayType[3], solarDate.ArrayType[4], solarDate.ArrayType[5], false);
        }

        public static DateTime ConvertToGregorian(int year, int month, int day, DateType dateType)
        {
            return ConvertToGregorian(year, month, day, 0, 0, 0, dateType == DateType.Islamic);
        }

        public static DateTime ConvertToGregorian(int year, int month, int day, int hour, int minute, int second, DateType dateType)
        {
            return ConvertToGregorian(year, month, day, hour, minute, second, dateType == DateType.Islamic);
        }

        private static DateTime ConvertToGregorian(int year, int month, int day, int hour, int minute, int second, bool isSlamic)
        {
            float jd = !isSlamic ? persian_to_jd(year, month, day) : islamic_to_jd(year, month, day);
            int[] numArray = jd_to_gregorian(jd);
            return new DateTime(numArray[0], numArray[1], numArray[2], hour, minute, second);
        }

        public static LunarDate ConvertToIslamic(SolarDate solarDate)
        {
            return ConvertToIslamic(new DateTime?(DateTime.Now), solarDate.ArrayType[0], solarDate.ArrayType[1], solarDate.ArrayType[2], false);
        }

        public static LunarDate ConvertToIslamic(DateTime date)
        {
            return ConvertToIslamic(new DateTime?(date), 0, 0, 0, true);
        }

        public static LunarDate ConvertToIslamic(int year, int month, int day, DateType dateType)
        {
            return ConvertToIslamic(new DateTime?(DateTime.Now), year, month, day, dateType != DateType.Persian);
        }

        private static LunarDate ConvertToIslamic(DateTime? date, int year, int month, int day, bool isDateTime)
        {
            float num;
            LunarDate date2 = new LunarDate();
            if (isDateTime)
            {
                if (!date.HasValue)
                {
                    throw new NullReferenceException();
                }
                num = gregorian_to_jd(date.Value.Year, date.Value.Month, date.Value.Day);
            }
            else
            {
                num = persian_to_jd(year, month, day);
                date = new DateTime?(ConvertToGregorian(year, month, day, DateType.Persian));
            }
            int[] numArray = jd_to_islamic(num);
            int num2 = Convert.ToInt32(date.Value.DayOfWeek);
            num2 = (num2 >= 6) ? (num2 - 6) : (num2 + 1);
            date2.DayOfWeek = num2;
            date2.ArrayType = isDateTime ? new int[] { numArray[0], numArray[1], numArray[2], date.Value.Hour, date.Value.Minute, date.Value.Second } : new int[6];
            HijriCalendar calendar = new HijriCalendar();
            date2.ArrayType[0] = calendar.GetYear(date.Value.Date);
            date2.ArrayType[2] = calendar.GetDayOfMonth(date.Value.Date);
            date2.ArrayType[1] = calendar.GetMonth(date.Value.Date);
            return date2;
        }

        public static SolarDate ConvertToPersian(LunarDate lunarDate)
        {
            return ConvertToPersian(null, lunarDate.ArrayType[0], lunarDate.ArrayType[1], lunarDate.ArrayType[2], false);
        }

        public static SolarDate ConvertToPersian(DateTime date)
        {
            return ConvertToPersian(new DateTime?(date), 0, 0, 0, true);
        }

        public static SolarDate ConvertToPersian(int year, int month, int day, DateType dateType)
        {
            return ConvertToPersian(null, year, month, day, dateType == DateType.Gerigorian);
        }

        private static SolarDate ConvertToPersian(DateTime? date, int year, int month, int day, bool isDateTime)
        {
            float num;
            SolarDate date2 = new SolarDate();
            if (isDateTime)
            {
                if (!date.HasValue)
                {
                    throw new NullReferenceException();
                }
                num = gregorian_to_jd(date.Value.Year, date.Value.Month, date.Value.Day);
                date2.dateTime = date.Value;
            }
            else
            {
                num = islamic_to_jd(year, month, day);
                date = new DateTime?(ConvertToGregorian(year, month, day, DateType.Islamic));
                date2.dateTime = date.Value;
            }
            int[] numArray = jd_to_persian(num);
            int num2 = Convert.ToInt32(date.Value.DayOfWeek);
            num2 = (num2 >= 6) ? (num2 - 6) : (num2 + 1);
            date2.DayOfWeek = num2;
            date2.ArrayType = isDateTime ? new int[] { numArray[0], numArray[1], numArray[2], date.Value.Hour, date.Value.Minute, date.Value.Second } : new int[6];
            return date2;
        }

        private static float gregorian_to_jd(int year, int month, int day)
        {
            return (float) (((((1721425f + (0x16d * (year - 1))) + Math.Floor((double) ((year - 1) / 4))) + -Math.Floor((double) ((year - 1) / 100))) + Math.Floor((double) ((year - 1) / 400))) + Math.Floor((double) (((((0x16f * month) - 0x16a) / 12) + ((month <= 2) ? 0 : (leap_gregorian(year) ? -1 : -2))) + day)));
        }

        private static float islamic_to_jd(int year, int month, int day)
        {
            return (((float) ((((day + Math.Ceiling((double) (29.5 * (month - 1)))) + ((year - 1) * 0x162)) + Math.Floor((double) ((3 + (11 * year)) / 30))) + 1948439.5)) - 1f);
        }

        private static int[] jd_to_gregorian(float jd)
        {
            float num = (float) (Math.Floor((double) (jd - 0.5)) + 0.5);
            float num2 = num - 1721426f;
            float num3 = (float) Math.Floor((double) (num2 / 146097f));
            float num4 = num2 % 146097f;
            float num5 = (float) Math.Floor((double) (num4 / 36524f));
            float num6 = num4 % 36524f;
            float num7 = (float) Math.Floor((double) (num6 / 1461f));
            float num8 = num6 % 1461f;
            float num9 = (float) Math.Floor((double) (num8 / 365f));
            int year = (int) ((((num3 * 400f) + (num5 * 100f)) + (num7 * 4f)) + num9);
            if ((num5 != 4f) && (num9 != 4f))
            {
                year++;
            }
            float num11 = num - gregorian_to_jd(year, 1, 1);
            float num12 = (num < gregorian_to_jd(year, 3, 1)) ? ((float) 0) : (leap_gregorian(year) ? ((float) 1) : ((float) 2));
            int month = (int) Math.Floor((double) ((((num11 + num12) * 12f) + 373f) / 367f));
            int num14 = (int) ((num - gregorian_to_jd(year, month, 1)) + 1f);
            return new int[] { year, month, num14 };
        }

        private static int[] jd_to_islamic(float jd)
        {
            jd = (float) (Math.Floor((double) jd) + 0.5);
            int year = (int) Math.Floor((double) (((30f * (jd - 1948440f)) + 10646f) / 10631f));
            int month = (int) Math.Min((double) 12.0, (double) (Math.Ceiling((double) (((double) (jd - (29f + islamic_to_jd(year, 1, 1)))) / 29.5)) + 1.0));
            int num3 = (int) ((jd - islamic_to_jd(year, month, 1)) + 1f);
            return new int[] { year, month, num3 };
        }

        private static int[] jd_to_persian(float jd)
        {
            float num;
            jd = (float) (Math.Floor((double) jd) + 0.5);
            float num2 = jd - persian_to_jd(0x1db, 1, 1);
            float num3 = (float) Math.Floor((double) (num2 / 1029983f));
            float num4 = num2 % 1029983f;
            if (num4 == 1029982f)
            {
                num = 2820f;
            }
            else
            {
                float num5 = (float) Math.Floor((double) (num4 / 366f));
                float num6 = num4 % 366f;
                num = (((float) Math.Floor((double) ((((2134f * num5) + (2816f * num6)) + 2815f) / 1028522f))) + num5) + 1f;
            }
            int year = (int) ((num + (2820f * num3)) + 474f);
            if (year <= 0)
            {
                year--;
            }
            float num8 = (jd - persian_to_jd(year, 1, 1)) + 1f;
            int month = (num8 <= 186f) ? ((int) Math.Ceiling((double) (num8 / 31f))) : ((int) Math.Ceiling((double) ((num8 - 6f) / 30f)));
            int num10 = ((int) (jd - persian_to_jd(year, month, 1))) + 1;
            return new int[] { year, month, num10 };
        }

        private static bool leap_gregorian(int year)
        {
            if ((year % 4) != 0)
            {
                return false;
            }
            if ((year % 100) == 0)
            {
                return ((year % 400) == 0);
            }
            return true;
        }

        private static float persian_to_jd(int year, int month, int day)
        {
            float num = year - ((year >= 0) ? 0x1da : 0x1d9);
            float num2 = 474f + (num % 2820f);
            return (((((day + ((month <= 7) ? ((month - 1) * 0x1f) : (((month - 1) * 30) + 6))) + ((float) Math.Floor((double) (((num2 * 682f) - 110f) / 2816f)))) + ((num2 - 1f) * 365f)) + (((float) Math.Floor((double) (num / 2820f))) * 1029983f)) + 1948320f);
        }
    }
}

