import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:4000/api/v1/',
    withCredentials: true,
    credentials: 'include'
});

export const baseURI = 'http://localhost:4000';

export const getQuestions = (page, questionPerPage) => API.get(`/problemset/all/?page=${page}&num=${questionPerPage}`);
export const getQuestion = (id) => API.get(`/problemset/${id}`);
export const getTopicwiseQuestion = (topic) => API.get(`/problemset/topicwise/${topic}`);
export const loginUser = (body) => API.post('/auth/login', { ...body });
export const getUser = () => API.get('/auth/getuser');
export const logout = () => API.post('/auth/logout');
export const signupUser = (body) => API.post('/auth/signup', { ...body });
export const forgotPassword = (body) => API.post('/auth/forgotpassword', { ...body });
export const resetPassword = (token, body) => API.post(`/auth/resetpassword/${token}`, { ...body });
export const changePassword = (body) => API.post('/auth/changepassword', { ...body });
export const toggleSolved = (id) => API.post(`/user/updatesolved/${id}`);
export const updateDetails = (data) => API.post(`/auth/updateme`, { ...data });
export const updateProfilePhoto = (data) => API.post(`/auth/updateme`, data);
export const addProblems = (id, data) => API.post(`/user/addproblem/${id}`, { ...data });
export const addList = (body) => API.post('/user/createproblemset', { ...body });
export const addToFavorite = (body) => API.post('/user/addtofavorite', { ...body });
export const deleteList = (id) => API.delete(`/user/list/${id}`);
export const deleteListItem = (id, body) => API.delete(`/user/listitem/${id}`, { data: { ...body } });
export const postComment = (id, body) => API.post(`/comments/${id}/comment`, { ...body });
export const deleteComment = (id) => API.delete(`/comments/${id}/comment`);
export const getFriend = (username) => API.get(`/user/${username}`);
export const removeFriend = (id) => API.post(`/user/removefriend/${id}`);
export const addFriend = (id) => API.post(`/user/addfriend/${id}`);
export const cancelRequest = (id) => API.post(`/user/cancelrequest/${id}`);
export const handleRequest = (id, body) => API.post(`/user/friendrequests/${id}`, { ...body });
export const handleTogglePP = (id) => API.post(`/user/togglepp/${id}`);