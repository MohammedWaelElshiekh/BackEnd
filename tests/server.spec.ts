import app from "../src/index"; // Import your Express app
import request from "supertest"; // Import Supertest

// describe("write function", () => {
//   it("should create a user when first name is provided", async () => {
//     const response = await request(app)
//       .post("/write")
//       .send({ firstName: "Pishoy" })
//       .expect(201);
//     console.log(response.status);
//     // expect(response.status).toBe(201);
//   });

//   it("reading function, should return 200 if the file exists", async () => {
//     const response = await request(app).get("/read");

//     expect(response.status).toBe(200); // successful
//   });
// });

describe("testing the server", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/library");
    expect(response.status).toBe(200);
  });
});
