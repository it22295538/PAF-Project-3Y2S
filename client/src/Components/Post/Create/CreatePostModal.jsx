
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { Button, IconButton } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import SpinnerCard from "../../Spinner/Spinner";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const CreatePostModal = ({ onOpen, isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector(store => store);

  const [postData, setPostData] = useState({ 
    mediaUrls: [], 
    caption: '', 
    location: "" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
    setIsDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleOnChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = async (files) => {
    const validFiles = files.filter(file => 
      file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    
    if (validFiles.length === 0) {
      alert("Please select image or video files.");
      return;
    }

    setUploadStatus("uploading");
    try {
      const uploadPromises = validFiles.map(file => uploadToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      
      setPostData(prev => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...urls.filter(url => url)]
      }));
      setUploadStatus("uploaded");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
      alert("Failed to upload files. Please try again.");
    }
  };



  export default CreatePostModal;