import app from "../../src";
import request from "supertest";
import fs from "fs";
import { join } from "path";
import { publicDirectory } from "../../src/constants";

export default function testResizeImage() {
  const testImageLocation = join(__dirname, "helpers/images/test-image.jpg");
  // removing the test image from the library if it exists
  if (fs.existsSync(join(publicDirectory, "library", "test-image.jpg")))
    fs.rmSync(join(publicDirectory, "library", "test-image.jpg"));
  // removing the resized test image from the library if it exists
  if (
    fs.existsSync(
      join(publicDirectory, "resizedImages", "test-image.jpg-200x200.jpg"),
    )
  )
    fs.rmSync(
      join(publicDirectory, "resizedImages", "test-image.jpg-200x200.jpg"),
    );
  describe("testing the /ResizeImage endpoint and functions", () => {
    it("doing simple request without data sent, should return 400", async () => {
      const response = await request(app).post("/ResizeImage").send("");
      expect(response.status).toBe(400);
    });
    it("doing simple request with normal data sent, should return 201 as this image was not found on the server and so is created", async () => {
      const response = await request(app)
        .post("/ResizeImage")
        .set("Content-Type", "multipart/form-data")
        .field("height", "200")
        .field("width", "200")
        .attach("image", testImageLocation);
      expect(response.status).toBe(201);
    });
    it("doing simple request with normal data sent, should return 200 as this image was uploaded before", async () => {
      const response = await request(app)
        .post("/ResizeImage")
        .set("Content-Type", "multipart/form-data")
        .field("height", "200")
        .field("width", "200")
        .attach("image", testImageLocation);
      expect(response.status).toBe(200);
    });
  });
}
