const { authenticateApiKey } = require("../shared/middleware/authentication");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("announcements.json");
const announcements = low(adapter);

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

  announcements.defaults({ posts: [] }).write();
};
