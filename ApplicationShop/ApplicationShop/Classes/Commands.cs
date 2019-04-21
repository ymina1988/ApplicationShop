using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace ApplicationShop.Classes
{
    public class Commands
    {

        /// <summary>
        /// متد گرفتن آی پی کاربر
        /// </summary>
        /// <returns></returns>
        public static string GetUserIP()
        {
            bool getLan = false;
            string visitorIPAddress = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (String.IsNullOrEmpty(visitorIPAddress))
                visitorIPAddress = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            if (string.IsNullOrEmpty(visitorIPAddress))
                visitorIPAddress = HttpContext.Current.Request.UserHostAddress;
            if (string.IsNullOrEmpty(visitorIPAddress) || visitorIPAddress.Trim() == "::1")
            {
                getLan = true;
                visitorIPAddress = string.Empty;
            }
            if (getLan && string.IsNullOrEmpty(visitorIPAddress))
            {
                //This is for Local(LAN) Connected ID Address
                string stringHostName = Dns.GetHostName();
                //Get Ip Host Entry
                IPHostEntry ipHostEntries = Dns.GetHostEntry(stringHostName);
                //Get Ip Address From The Ip Host Entry Address List
                IPAddress[] arrIpAddress = ipHostEntries.AddressList;

                try
                {
                    //visitorIPAddress = arrIpAddress[arrIpAddress.Length - 2].ToString();
                    visitorIPAddress = arrIpAddress[arrIpAddress.Length - 3].ToString();
                }
                catch
                {
                    try
                    {
                        visitorIPAddress = arrIpAddress[0].ToString();
                    }
                    catch
                    {
                        try
                        {
                            arrIpAddress = Dns.GetHostAddresses(stringHostName);
                            visitorIPAddress = arrIpAddress[0].ToString();
                        }
                        catch
                        {
                            visitorIPAddress = "127.0.0.1";
                        }
                    }
                }
            }
            return visitorIPAddress;
        }
    }
}