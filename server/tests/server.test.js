import request from "supertest";
import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "EcoTwin Backend"
  });
});

describe("EcoTwin Backend Health Check", () => {

  test("Server should respond successfully", async () => {

    const response = await request(app)
      .get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");

  });

});