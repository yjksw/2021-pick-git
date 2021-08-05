import { POST_ADD_STEPS, POST_EDIT_STEPS } from "./steps";

export const URL_PARAMS = {
  ME: "me",
  USER: "user",
};

export const PAGE_URL = {
  HOME: "/",
  HOME_FEED: "/posts",
  TAG_FEED_BASE: "/posts/tag",
  USER_FEED_BASE: "/posts/user",
  USER_FEED: (username: string) => `/posts/user?username=${username}`,
  LOGIN: "/login",
  AUTH_PROCESSING: "/auth",
  ADD_POST: "/add-post",
  ADD_POST_FIRST_STEP: `/add-post/${POST_ADD_STEPS[0].path}`,
  EDIT_POST: "/edit-post",
  EDIT_POST_FIRST_STEP: `/edit-post/${POST_EDIT_STEPS[0].path}`,
  SEARCH: "/search",
  SEARCH_POST_BY_TAG: (tag: string) => `/search?type=tags&keyword=${tag}`,
  SEARCH_RESULT_POST_BASE: "/search/posts",
  SEARCH_RESULT_POST: (type: string) => `/search/posts?type=${type}`,
  PROFILE: "/profile",
  MY_PROFILE: "/profile/me",
  TAG_FEED: (tag: string) => `/posts/tag?tag=${tag}`,
  USER_PROFILE: (username: string) => `/profile?username=${username}`,
};

export const API_URL = {
  AUTH: {
    GITHUB: "/authorization/github",
  },
  SELF_PROFILE: "/profiles/me",
  ADD_POSTS: "/posts",
  GITHUB_REPOSITORIES: (username: string) => `/github/${username}/repositories`,
  USER_PROFILE: (username: string) => `/profiles/${username}`,
  USER_PROFILE_FOLLOW: (username: string, githubFollowing: boolean) =>
    `/profiles/${username}/followings?githubFollowing=${githubFollowing}`,
  USER_PROFILE_UNFOLLOW: (username: string, githubUnfollowing: boolean) =>
    `/profiles/${username}/followings?githubUnfollowing=${githubUnfollowing}`,
  MY_POSTS: (page: number, limit: number) => `/posts/me?page=${page}&limit=${limit}`,
  USER_POSTS: (username: string, page: number, limit: number) => `/posts/${username}?page=${page}&limit=${limit}`,
  SEARCH_USER: (keyword: string, page: number, limit: number) =>
    `/search/users?keyword=${keyword}&page=${page}&limit=${limit}`,
  SEARCH_POST: (type: string, keyword: string, page: number, limit: number) =>
    `/search/posts?type=${type}&keyword=${keyword}&page=${page}&limit=${limit}`,
  AFTER_LOGIN: (code: string) => `afterlogin?code=${code}`,
  POST: (postId: number) => `/posts/${postId}`,
  POSTS: (page: number, limit: number) => `/posts?page=${page}&limit=${limit}`,
  POSTS_LIKES: (postId: number) => `/posts/${postId}/likes`,
  POSTS_COMMENTS: (postId: number) => `/posts/${postId}/comments`,
  GITHUB_STATS: (username: string) => `/profiles/${username}/contributions`,
  GITHUB_TAGS: (repositoryName: string) => `/github/repositories/${repositoryName}/tags/languages`,
};

export const GITHUB_URL = {
  REPOSITORY: (username: string, repositoryName: string) => `https://github.com/${username}/${repositoryName}`,
};
