import request from "supertest";

import app from "../../src/app";

jest.mock("../../src/configs/dbConn", () => ({
  connectToDB: jest.fn(),
}));

describe("GET /api/v1/coupons", () => {
  describe("Given all fields", () => {
    it("should return 200 status code", async () => {
      const response = await request(app).get("/api/v1/coupons");
      expect(response.statusCode).toBe(200);
    });
  });
});
