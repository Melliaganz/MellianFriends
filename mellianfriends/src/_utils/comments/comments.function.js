import fetchApi from "../api/api.service";

const getPostAllComments = (postId, page) => {
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    };
    return fetchApi(`posts/${postId}/comments`, page, requestOptions)
};

const deleteOneComment = (commentId, postId, page) => {
    const requestOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    };
    
    return fetchApi(`posts/${postId}/comment/${commentId}`, page, requestOptions)
}
const getOneComment = (commentId, postId, page) => {
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type" : "application.json"},
        credentials: "include",
    }

    return fetchApi(`posts/${postId}/comment/${commentId}`, page, requestOptions)
}

    export {
        getPostAllComments,
        deleteOneComment,
        getOneComment,
    }