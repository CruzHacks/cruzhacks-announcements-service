const { authenticateApiKey } = require("../shared/middleware/authentication");
const { announcements } = require("./db");

module.exports = async function(context, req) {
  const isAuthenticated = authenticateApiKey(context, req);

  if (isAuthenticated === false) {
    context.res = {
      status: 401,
      body: {
        error: true,
        status: 401,
        message: "Unable to authenticate request.",
      },
    };
    context.done();
  }

  if (req.method === "GET") {
    let announcementList = announcements.getState();
    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        announcementList,
      },
    };
  }
};
