import { ApiClient } from "../support/api-client";
import {
  CreatePostTestData,
  PostRequestData,
} from "../types/post.types";

interface PostTestData {
  expectedStatus: number;
  postId: number;
  additionalPostId: number;
  additionalPostExpectedStatus: number;
  nonexistentPostId: number;
  notFoundStatus: number;
}

describe("Posts API", () => {
  const apiClient = new ApiClient();

  let testData: PostTestData;

  before(() => {
    cy.fixture("posts/post.json").then((data: PostTestData) => {
      testData = data;
    });
  });

  
  it("TC01 - should get post 1 successfully", () => {
    apiClient.getPost(testData.postId).then((response) => {
      cy.assertStatusCode(response.status, testData.expectedStatus);
      expect(response.body).to.have.property("id", testData.postId);
      expect(response.body.userId).to.be.a("number");
      expect(response.body.id).to.be.a("number");
      expect(response.body.title).to.be.a("string");
      expect(response.body.body).to.be.a("string");
    });
  });
  
  
  it("TC02 - should get another post successfully", () => {
    apiClient.getPost(testData.additionalPostId).then((response) => {
      cy.assertStatusCode(
        response.status,
        testData.additionalPostExpectedStatus
      );

      expect(response.body).to.have.property(
        "id",
        testData.additionalPostId
      );

      expect(response.body.title).to.be.a("string").and.not.be.empty;
    });
  });


  it("TC03 - should return 404 for a nonexistent post", () => {
    apiClient.getPost(testData.nonexistentPostId).then((response) => {
      cy.assertStatusCode(response.status, testData.notFoundStatus);
    });
  });
});


describe("Create Post API", () => {
  const apiClient = new ApiClient();

  it("TC04 - should create a post successfully", () => {
    cy.fixture("posts/new-post.json").then(
      (testData: CreatePostTestData) => {
        const requestBody: Omit<PostRequestData, "expectedStatus"> = {
          title: testData.title,
          body: testData.body,
          userId: testData.userId,
        };

        apiClient.createPost(requestBody).then((response) => {
          cy.assertStatusCode(response.status, testData.expectedStatus);

          expect(response.body).to.have.property(
            "title",
            testData.title
          );

          expect(response.body).to.have.property(
            "body",
            testData.body
          );

          expect(response.body).to.have.property(
            "userId",
            testData.userId
          );

          expect(response.body.id).to.be.a("number");
        });
      }
    );
  });

  
  it("TC05 - should create a second post successfully", () => {
    cy.fixture("posts/new-post.json").then(
      (testData: CreatePostTestData) => {
        const secondPost = testData.secondPost;
        const secondPostRequest: Omit<PostRequestData, "expectedStatus"> = {
          title: secondPost.title,
          body: secondPost.body,
          userId: secondPost.userId,
        };

        apiClient.createPost(secondPostRequest).then((response) => {
          cy.assertStatusCode(
            response.status,
            secondPost.expectedStatus
          );

          expect(response.body).to.have.property(
            "title",
            secondPost.title
          );

          expect(response.body).to.have.property(
            "body",
            secondPost.body
          );

          expect(response.body).to.have.property(
            "userId",
            secondPost.userId
          );

          expect(response.body.id).to.be.a("number");
        });
      }
    );
  });

});
