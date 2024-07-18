import app from "../../src/index"; // Import your Express app
import request from "supertest"; // Import Supertest

describe("testing the server", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/library");
    expect(response.status).toBe(200);
  });
});
