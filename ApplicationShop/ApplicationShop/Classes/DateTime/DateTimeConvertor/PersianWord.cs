namespace Persia
{
    using System;

    public abstract class PersianWord
    {
        private PersianWord()
        {
        }

        public static string ConvertToLatinNumber(string num)
        {
            string str = "";
            int length = num.Length;
            if (length == 0)
            {
                return num;
            }
            for (int i = 0; i < length; i++)
            {
                char ch = num[i];
                if (('۰' <= ch) && (ch <= '۹'))
                {
                    ch = (char) (ch - 'ۀ');
                }
                str = str + ch;
            }
            return str;
        }

        public static string ToPersianString(object value)
        {
            object obj2 = value;
            string str = string.Empty;
            int length = obj2.ToString().Length;
            if (length == 0)
            {
                return obj2.ToString();
            }
            for (int i = 0; i < length; i++)
            {
                char ch = obj2.ToString()[i];
                if (('0' <= ch) && (ch <= '9'))
                {
                    ch = (char) (ch + 'ۀ');
                }
                if (ch == '.')
                {
                    ch = '/';
                }
                str = str + ch;
            }
            return str.Replace("ي", "ی").Replace("ك", "ک");
        }
    }
}

