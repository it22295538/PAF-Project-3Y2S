import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
  import {
    BsBookmark,
    BsBookmarkFill,
    BsEmojiSmile,
    BsPencil,
    BsThreeDots,
  } from "react-icons/bs";
  import { FaRegComment } from "react-icons/fa";
  import { RiSendPlaneLine } from "react-icons/ri";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  import { timeDifference } from "../../Config/Logic";
  import { createComment, getAllComments } from "../../Redux/Comment/Action";
  import { findPostByIdAction } from "../../Redux/Post/Action";
  import CommentCard from "./CommentCard";
  import "./CommentModal.css";

  const CommentModal = ({
  isOpen,
  onClose,
  onOpen,
  postData,
  handleLikePost,
  handleUnLikePost,
  handleSavePost,
  handleUnSavePost,
  isPostLiked,
  isSaved,
}) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("token");
    const { post, comments, user } = useSelector((store) => store);
    const [commentContent, setCommentContent] = useState("");
    const { postId } = useParams();
    const navigate = useNavigate();
  
    // console.log("coments ---- ",comments)

    useEffect(() => {
        if (postId) {
          dispatch(
            findPostByIdAction({
              jwt,
              postId,
            })
          );
          dispatch(getAllComments({jwt,postId}))
        }
      }, [postId, comments?.createdComment, comments?.deletedComment, comments?. updatedComment]);
    
};

export default CommentModal;
