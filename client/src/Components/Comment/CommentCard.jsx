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
  };
  
  export default CommentCard;
  