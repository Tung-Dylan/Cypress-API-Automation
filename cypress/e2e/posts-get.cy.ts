import { ApiClient } from "../support/api-client";

interface PostFixture {
  expectedStatus: number;
  postId: number;
  additionalPostId: number;
  additionalPostExpectedStatus: number;
  nonexistentPostId: number;
  notFoundStatus: number;
}

describe("Posts API - GET", () => {
  const apiClient = new ApiClient();

  let postFixture: PostFixture;

  before(() => {
    cy.fixture("posts/post.json").then((data: PostFixture) => {
      postFixture = data;
    });
  });

  it("TC01 - GET post by ID 1", () => {
    apiClient.getPost(postFixture.postId).then((response) => {
      cy.assertStatusCode(response.status, postFixture.expectedStatus);

      expect(response.body).to.have.property("id", postFixture.postId);
      expect(response.body).to.have.property("userId");
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("body");
    });
  });

  it("TC02 - GET another existing post", () => {
    apiClient.getPost(postFixture.additionalPostId).then((response) => {
      cy.assertStatusCode(
        response.status,
        postFixture.additionalPostExpectedStatus
      );

      expect(response.body).to.have.property(
        "id",
        postFixture.additionalPostId
      );
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("body");
    });
  });

  it("TC03 - GET a nonexistent post returns 404", () => {
    apiClient.getPost(postFixture.nonexistentPostId).then((response) => {
      cy.assertStatusCode(response.status, postFixture.notFoundStatus);
    });
  });
});
