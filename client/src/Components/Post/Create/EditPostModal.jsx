import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import React, { useEffect, useState, useRef } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createPost, findPostByIdAction } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import CommentModal from "../../Comment/CommentModal";
import SpinnerCard from "../../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { editPOst } from "../../../Redux/Post/Action";
import { useToast } from "@chakra-ui/react";


const EditPostModal = ({ isOpen, onClose, post }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [postData, setPostData] = useState({
    caption: "",
    location: "",
    mediaUrls: [],
    id: null
  });

    useEffect(() => {
    if (post) {
      setPostData({
        caption: post.caption || "",
        location: post.location || "",
        mediaUrls: post.mediaUrls || [],
        id: post.id
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setLoading(true);
        try {
          const imageUrl = await uploadToCloudinary(file);
          if (imageUrl) {
            setPostData(prev => ({
              ...prev,
              mediaUrls: [imageUrl]
            }));
            toast({
              title: "Image uploaded successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            throw new Error("Failed to get image URL");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast({
            title: "Failed to upload image",
            description: "Please try again",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleSubmit = () => {
    if (!postData.id) return;

    const data = {
      jwt: token,
      data: {
        id: postData.id,
        caption: postData.caption,
        location: postData.location,
        mediaUrls: postData.mediaUrls
      }
    };

    dispatch(editPOst(data));
    onClose();
  };

export default EditPostModal;