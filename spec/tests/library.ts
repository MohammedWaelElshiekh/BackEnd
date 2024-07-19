import app from "../../src";
import request from "supertest";

export default function testLibrary() {
  describe("testing the /library endpoint responses", () => {
    it("fetching the library endpoinr, should return 200", async () => {
      const response = await request(app).get("/library");
      expect(response.status).toBe(200);
    });
    it("fetching the library endpoint, should return a list of images names", async () => {
      const response = await request(app).get("/library");
      expect(response.body).toBeTruthy();
      if (response.body) expect(response.body.length).toBeGreaterThan(0);
      if (response.body)
        response.body.forEach((e: string) => expect(e).toBeInstanceOf(String));
    });
  });
}
