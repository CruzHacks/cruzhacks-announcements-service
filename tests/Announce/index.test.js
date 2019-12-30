const { authenticateApiKey } = require("../../shared/middleware/authentication");
const { announcements } = require("../../Announce/db");
const httpFunction = require("../../Announce/index");
const context = require("../../Announce/context");

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
});
