interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export class ApiClient {
  getPost(postId: number) {
    return cy.request({
      method: "GET",
      url: `/posts/${postId}`,
      failOnStatusCode: false,
    });
  }

  createPost(postData: CreatePostRequest) {
    return cy.request({
      method: "POST",
      url: "/posts",
      body: postData,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
