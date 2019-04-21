using System.IO;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
/**
 * Name :Partial To String Class
 * Description : for get html code from partial for Email or another
 * Version: 0.2
 * Status: Ready To Test
 * Lasted Modified : 1394/11/19 - 13:40
 * Modified By : S.M.Safavi
 * */
namespace ApplicationShop.Classes
{
    public static class PartialToStringClass
    {
        /// <summary>
        /// متد گرفتن رشته اچتمل پارشیال
        /// </summary>
        /// <param name="controllerName">نام کنترلر</param>
        /// <param name="partialView">نام پارشیال</param>
        /// <param name="model">مدل</param>
        /// <returns>رشته</returns>
        public static string RenderPartialView(string controllerName, string partialView, object model)
        {
            var context = new HttpContextWrapper(System.Web.HttpContext.Current) as HttpContextBase;
            var routes = new System.Web.Routing.RouteData();
            routes.Values.Add("controller", controllerName);
            var requestContext = new RequestContext(context, routes);
            string requiredString = requestContext.RouteData.GetRequiredString("controller");
            var controllerFactory = ControllerBuilder.Current.GetControllerFactory();
            var controller = controllerFactory.CreateController(requestContext, requiredString) as ControllerBase;
            controller.ControllerContext = new ControllerContext(context, routes, controller);
            var ViewData = new ViewDataDictionary();
            var TempData = new TempDataDictionary();
            ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(controller.ControllerContext, partialView);
                var viewContext = new ViewContext(controller.ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                return sw.GetStringBuilder().ToString();
            }
        }
    }
}