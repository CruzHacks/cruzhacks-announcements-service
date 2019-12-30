const fs = require("fs");
const dbJSONpath = "announcements.json";

describe("[Announce] Unit tests for database, db.js", () => {
  test("JSON database should exist in root dir", () => {
    let successfulAccess = fs.existsSync(dbJSONpath);
    expect(successfulAccess).toEqual(true);
  });
});
