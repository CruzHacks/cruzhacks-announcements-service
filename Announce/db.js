const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("announcements.json");
const announcements = low(adapter);

// initialize announcements JSON file
announcements.defaults({ posts: [] }).write();

module.exports.announcements = announcements;
