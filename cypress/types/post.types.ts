export interface PostRequestData {
  title: string;
  body: string;
  userId: number;
  expectedStatus: number;
}

export interface CreatePostTestData extends PostRequestData {
  secondPost: PostRequestData;
}
