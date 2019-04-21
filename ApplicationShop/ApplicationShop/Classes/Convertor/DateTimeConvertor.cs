using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utilities.Convertor
{
   public class DateTimeConvertor
    {
       public static int CalculateDay(System.DateTime startDate, System.DateTime endDate)
       {
           return (int)(endDate - startDate).TotalDays;
       }
    }
}
