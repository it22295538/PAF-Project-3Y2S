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

  