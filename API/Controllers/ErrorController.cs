using API.Data;
using API.Models.Tables.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ErrorController : BaseApiController {
    private readonly DataContextEF _contextEF;
        public ErrorController(DataContextEF contextEF) {
            _contextEF = contextEF;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound() {
            var test = _contextEF.AppUsers.Find(-1);
            if (test == null) return NotFound();
            return test;
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError() {
            var test = _contextEF.AppUsers.Find(-1);
            return test.ToString();
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest() {
            return BadRequest("Bad request.");
        }
    }
}