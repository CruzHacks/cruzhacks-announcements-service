const { authenticateApiKey } = require("../../../shared/middleware/authentication");

describe("api key authentication middleware unit tests", () => {
  const contextMock = {};

  test("should pass with correct request header", () => {
    const requestHeadersMock = {
      headers: {
        accept: "*/*",
        host: "localhost:7071",
        "user-agent": "insomnia/7.0.3",
        authentication: "testKEY",
      },
      query: {},
    };
    process.env.API_KEY = "testKEY";
    expect(authenticateApiKey(contextMock, requestHeadersMock)).toBe(true);
  });

  test("should pass with correct query parameter", () => {
    const requestParamsMock = {
      headers: {},
      query: { authentication: "testKEY" },
    };
    process.env.API_KEY = "testKEY";
    expect(authenticateApiKey(contextMock, requestParamsMock)).toBe(true);
  });

  test("should not pass with incorrect request header", () => {
    const requestHeadersMock = {
      headers: {
        accept: "*/*",
        host: "localhost:7071",
        "user-agent": "insomnia/7.0.3",
        authentication: "WRONG_KEY",
      },
      query: {},
    };
    process.env.API_KEY = "testKEY";
    expect(authenticateApiKey(contextMock, requestHeadersMock)).toBe(false);
  });

  test("should not pass with incorrect query parameter", () => {
    const requestParamsMock = {
      headers: {},
      query: { authentication: "WRONG_KEY" },
    };
    process.env.API_KEY = "testKEY";
    expect(authenticateApiKey(contextMock, requestParamsMock)).toBe(false);
  });

  test("should pass with correct request header and correct query parameter", () => {
    const requestParamsMock = {
      headers: {
        accept: "*/*",
        host: "localhost:7071",
        "user-agent": "insomnia/7.0.3",
        authentication: "testKEY",
      },
      query: { authentication: "testKEY" },
    };
    process.env.API_KEY = "testKEY";
    expect(authenticateApiKey(contextMock, requestParamsMock)).toBe(true);
  });

  test("should not pass with incorrect requets header and incorrect query parameter", () => {
    const requestParamsMock = {
      headers: {},
      query: { authentication: "WRONG_KEY" },
    };
    process.env.API_KEY = "testKEY";
    expect(authenticateApiKey(contextMock, requestParamsMock)).toBe(false);
  });

  test("should pass with missing api key in query params and request headers", () => {
    const requestParamsMock = {
      headers: {},
      query: {},
    };
    process.env.API_KEY = "testKEY";
    expect(authenticateApiKey(contextMock, requestParamsMock)).toBe(false);
  });
});
