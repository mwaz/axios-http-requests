const { getUser, postUser, concurrentRequests } = require("./app.js");

describe("Axios requests suite", () => {
  test("should get a single user", async () => {
    const response = await getUser();
    expect(response).not.toBeNull();
    expect(response.status).toBe(200);
    expect(response.data.address.street).toContain("Kulas");
  });

  test("should post a new user", async () => {
    const response = await postUser();
    expect(response).not.toBeNull();
    expect(response.status).toBe(201);
    expect(response.data.username).toBe("Brad");
  });

  test("should make simultaneous requests", async () => {
    const response = await concurrentRequests();
    expect(response).not.toBeNull();
    expect(response.status).toBe(200);
  });
});
