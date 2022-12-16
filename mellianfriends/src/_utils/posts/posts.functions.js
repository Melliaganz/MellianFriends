import fetchApi from "../api/api.service";

const getPosts = (page) => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };

      return fetchApi(`posts`, page, requestOptions);
};

const getAllUserPosts = (userId, page) => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };

      return fetchApi(`posts/userPosts/${userId}`, page, requestOptions);
};

const getOnePost = (postId, page) => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };

      return fetchApi(`posts/${postId}`, page, requestOptions);
};

const deleteOnePost = (postId, page) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };

      return fetchApi(`posts/${postId}`, page, requestOptions);
};

export {
    getOnePost,
    deleteOnePost,
    getPosts,
    getAllUserPosts,
}
