import { CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, GET_ALL_COMMENT, GET_POST_COMMENT, LIKE_COMMENT } from "./ActionType"

const initialState={
    createdComment:null,
    postComments:null,
    likedComment:null,
    updatedComment:null,
    deletedComment:null,
    comments:null,
}