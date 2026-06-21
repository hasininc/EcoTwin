import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";

jest.unstable_mockModule("../services/gemini.js", () => ({
  analyzeWithGemini: jest.fn().mockResolvedValue({
    futureStory: {
      title: "Test Future",
      body: "A greener future"
    },
    recommendations: []
  })
}));

const { default: analyzeRoute } = await import("../routes/analyze.js");

const app = express();

app.use(express.json());
app.use("/api", analyzeRoute);


describe("EcoTwin Analyze API", () => {

  test("POST /api/analyze should return AI insights", async () => {

    const response = await request(app)
      .post("/api/analyze")
      .send({
        profile: {
          transportType: "car",
          dietType: "mixed"
        },
        results: {
          carbon: {
            total: 5000
          }
        }
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();

  });

});