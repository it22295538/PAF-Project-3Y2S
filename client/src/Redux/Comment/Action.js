import { BASE_URL } from "../../Config/api";
import { CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, GET_ALL_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType";

export const createComment = (data) => async (dispatch) => {
    try {
      console.log("data create comment",data)
    const res = await fetch(`${BASE_URL}/api/comments/create/${data.postId}`, {
      method: "POST",
  
       headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
  
      body: JSON.stringify(data.data),
    });
    console.log("create comment res ",res)
  
    const resData=await res.json();
  
    console.log("created comment", resData);
    dispatch({type:CREATE_COMMENT,payload:resData});
    } catch (error) {
      console.log("catch error ",error)
    }
    
  
  
  };

  export const findPostComment=(data)=>async(dispatch)=>{
    const res= await fetch(`${BASE_URL}/api/comments/${data.postId}`,{
        method:"GET",
       
     headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
        body:JSON.stringify(data.data)
    })
    const resData=await res.json();
    dispatch({type:"GET_USER_POST",paylod:resData});
}

export const likeComment=(data)=>async(dispatch)=>{
    const res= await fetch(`${BASE_URL}/api/comments/like/${data.commentId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:'Bearer '+data.jwt,
        },
        body:JSON.stringify(data.data)
    })
    const resData=await res.json();
    console.log("like comment :- ",resData)
    dispatch({type:LIKE_COMMENT,paylod:resData});
}