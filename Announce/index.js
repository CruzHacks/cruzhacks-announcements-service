const { authenticateApiKey } = require("../shared/middleware/authentication");
const { announcements } = require("./db");

module.exports = async function(context, req) {
  const isAuthenticated = authenticateApiKey(context, req);

  if (isAuthenticated === false) {
    jsonResponse = {
	  status: 401,
	  body: {
		  error: true,
		  status: 401,
		  message: "Unable to authenticate request.",
		},
	 };
	context.log.error(JSON.stringify(jsonResponse, null, 2));
	context.res = jsonResponse;
    context.done();
  }

  if (req.method === "GET") {
    let announcementList = announcements.getState();
    jsonResponse = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
		  error: false,
		  status: 200
		  announcement: announcementList,
      },
    };
	context.log(JSON.stringify(jsonResponse, null, 2));
	context.res = jsonResponse;
	context.done();
  }
};
