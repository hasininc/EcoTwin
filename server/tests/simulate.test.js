import request from "supertest";
import express from "express";
import simulateRoute from "../routes/simulate.js";

const app = express();

app.use(express.json());
app.use("/api", simulateRoute);

describe("EcoTwin Simulation API", () => {

  test("POST /api/simulate should return response", async () => {

    const response = await request(app)
      .post("/api/simulate")
      .send({
        profile: {
          transportType: "car",
          dietType: "mixed",
          flightsPerYear: 2
        },
        customScenario: "What if I use public transport?"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();

  });

});