const request = require("supertest");
const app = require("../../index");

describe("News API Tests", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  const testData = {
    matchId: 1,
    tourId: 2,
    sportId: 3,
    newsData: {
      title: "Test Title",
      description: "test description",
    },
  };

  const testGetRequest = async (endpoint, id, query, statusCode) => {
    const response = await request(server)
      .get(endpoint)
      .query(query)
      .expect(statusCode);

    // Add your specific assertions for the response here
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("limit");
    expect(response.body).toHaveProperty("offset");
    expect(response.body).toHaveProperty("next");
  };

  it("should post news successfully", async () => {
    const response = await request(server)
      .post("/news")
      .send({ ...testData.newsData, matchId: testData.matchId })
      .expect(201);

    expect(response.text).toBe("ok");
  });

  it("should get news by matchId successfully", async () => {
    await testGetRequest(
      `/news/match/${testData.matchId}`,
      testData.matchId,
      { limit: 5, offset: 0 },
      200
    );
  });

  it("should get news by tourId successfully", async () => {
    await testGetRequest(
      `/news/tour/${testData.tourId}`,
      testData.tourId,
      { limit: 5, offset: 0 },
      200
    );
  });

  it("should get news by sportId successfully", async () => {
    await testGetRequest(
      `/news/sport/${testData.sportId}`,
      testData.sportId,
      { limit: 5, offset: 0 },
      200
    );
  });

  it("should return 400 Bad Request if POST /news has invalid body", async () => {
    const response = await request(server).post("/news").send({});
    expect(response.status).toBe(400);
  });

});
