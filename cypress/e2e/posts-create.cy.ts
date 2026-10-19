import { ApiClient } from "../support/api-client";
import { CreatePostTestData } from "../types/post.types";

describe("Posts API - POST", () => {
  const apiClient = new ApiClient();

  let createPostData: CreatePostTestData;

  before(() => {
    cy.fixture("posts/new-post.json").then(
      (data: CreatePostTestData) => {
        createPostData = data;
      }
    );
  });

  it("TC04 - Create a new post", () => {
    const { title, body, userId, expectedStatus } = createPostData;

    apiClient.createPost({ title, body, userId }).then((response) => {
      cy.assertStatusCode(response.status, expectedStatus);

      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("title", title);
      expect(response.body).to.have.property("body", body);
      expect(response.body).to.have.property("userId", userId);
    });
  });

  it("TC05 - Create another post", () => {
    const { title, body, userId, expectedStatus } =
      createPostData.secondPost;

    apiClient.createPost({ title, body, userId }).then((response) => {
      cy.assertStatusCode(response.status, expectedStatus);

      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("title", title);
      expect(response.body).to.have.property("body", body);
      expect(response.body).to.have.property("userId", userId);
    });
  });
});
