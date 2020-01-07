const { authenticateApiKey } = require("../../shared/middleware/authentication");
const { announcements } = require("../../Announce/db");
const httpFunction = require("../../Announce/index");
const context = require("../context");

jest.mock("../../shared/middleware/authentication");
jest.mock("../../Announce/db");

describe("[Announce] Unit tests for function driver, index.js", () => {
  describe("test api key auth", () => {
    test("should return 401 if the user doesn't pass authentication", async () => {
      const request = {
        query: { authentication: "invalid" },
        headers: {},
      };

      authenticateApiKey.mockImplementationOnce(() => false);

      await httpFunction(context, request);
      expect(context.res.status).toEqual(401);
    });
  });
  describe("test GET", () => {
    test("should return 200 from authenticated GET", async () => {
      const request = {
        method: "GET",
      };
      authenticateApiKey.mockImplementationOnce(() => true);

      await httpFunction(context, request);
      expect(context.res.status).toEqual(200);
    });
    test("should return announcements JSON from authenticated GET", async () => {
      const request = {
        method: "GET",
      };

      let announcementList = announcements.getState();
      const mockResBody = {
        error: false,
		status: 200
		announcement: announcementList,
      };

      authenticateApiKey.mockImplementationOnce(() => true);

      await httpFunction(context, request);
      expect(context.res.body).toEqual(mockResBody);
    });
    test("should return JSON content type from authenticated GET", async () => {
      const request = {
        method: "GET",
      };
      const mockResHeader = {
        "Content-Type": "application/json",
      };

      authenticateApiKey.mockImplementationOnce(() => true);

      await httpFunction(context, request);
      expect(context.res.headers).toEqual(mockResHeader);
    });
  });
});
