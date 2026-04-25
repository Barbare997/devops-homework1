const request = require("supertest");
const app = require("../src/app");

describe("Todo API", () => {
  test("GET /api/health returns ok", async () => {
    const response = await request(app).get("/api/health");
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ status: "ok" });
  });

  test("GET /api/todos returns array", async () => {
    const response = await request(app).get("/api/todos");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/todos creates a todo", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({ text: "Write unit tests" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      text: "Write unit tests",
      completed: false
    });
  });

  test("POST /api/todos validates empty text", async () => {
    const response = await request(app).post("/api/todos").send({ text: "" });
    expect(response.statusCode).toBe(400);
  });
});
