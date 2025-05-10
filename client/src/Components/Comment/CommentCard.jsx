import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logic";
import { deleteComment, likeComment } from "../../Redux/Comment/Action";
import { BsEmojiSmile, BsPencil, BsThreeDots } from "react-icons/bs";
import EditCommentModal from "./EditCommentModal";
import { MdDelete } from "react-icons/md";
import { editComment } from "../../Redux/Comment/Action";

const CommentCard = ({ comment }) => {
    const [isCommentLiked, setIsCommentLike] = useState(false);
  const { user } = useSelector((store) => store);
  const [commentLikes, setCommentLikes] = useState(0);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const [isEditCommentInputOpen, setIsEditCommentInputOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    setCommentContent(comment?.content);
  }, [comment]);

  const handleLikeComment = () => {
    dispatch(likeComment({ jwt, commentId: comment.id }));
    setIsCommentLike(true);
    setCommentLikes(commentLikes + 1);
  };

  const handleUnLikeComment = () => {
    dispatch(likeComment({ jwt, commentId: comment.id }));
    setIsCommentLike(false);
    setCommentLikes(commentLikes - 1);
  };

  useEffect(() => {
    setCommentLikes(comment?.likedByUsers?.length);
  }, [comment]);

  useEffect(() => {
    setIsCommentLike(isCommentLikedByUser(comment, user.reqUser?.id));
  }, [comment, user.reqUser]);

  const handleClickOnEditComment = () => {
    setIsEditCommentInputOpen(!isEditCommentInputOpen);
  };
  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleDeleteComment = () => {
    dispatch(deleteComment({ commentId: comment.id, jwt }));
  };

  const handleEditComment = (e) => {
    if(e.key==="Enter"){
      dispatch(
      editComment({ data: { id: comment?.id, content: commentContent }, jwt })
     
    );
     setIsEditCommentInputOpen(false);
     setCommentContent("")
    }
    
  };

  
  };
  
  export default CommentCard;
  