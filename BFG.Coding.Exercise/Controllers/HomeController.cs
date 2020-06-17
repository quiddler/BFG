using System.Web.Mvc;

namespace BFG.Coding.Exercise.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public string Get()
        {
            try
            {
                var json = System.IO.File.ReadAllText(RelativePath());
                return json;
            }
            catch
            {
                return GenericJson();
            }
        }

        [HttpPost]
        public string Save(string json)
        {
            try
            {
                System.IO.File.WriteAllText(RelativePath(), json);
                return json;
            }
            catch
            {
                return "";
            }
        }

        private string RelativePath()
        {
            var path = HttpContext.Server.MapPath("~/data.json");
            return path;
        }

        private string GenericJson()
        {
            return "{ \"movies\" : [ { \"title\" : \"a movie title\", \"director\" : \"a director's name\" } ], \"books\" : [ { \"title\" : \"a book title\", \"author\": \"an author's name\" } ] }";
        }
    }
}