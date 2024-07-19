import app from "../../src"; // Import your Express app
import request from "supertest"; // Import Supertest

export default function testServer() {
  describe("testing the server health", () => {
    it("checking if the server is up", async () => {
      const response = await request(app).get("/health");
      expect(response.status).toBe(200);
    });
  });
}
