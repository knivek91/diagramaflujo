using System.Web;
using System.Web.Mvc;

namespace Diagra_de_Flujo
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}