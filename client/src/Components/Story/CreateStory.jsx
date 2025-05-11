import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStory } from "../../Redux/Story/Action";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";

const CreateStory = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleFilePick = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (!selectedFile) {
        alert("Please select an image");
        setLoading(false);
        return;
      }

      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(selectedFile);
      
      if (!imageUrl) {
        alert("Failed to upload image");
        setLoading(false);
        return;
      }

      const storyData = {
        image: imageUrl,
        captions: caption
      };

      await dispatch(createStory({ story: storyData, jwt: token }));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error creating story:", error);
      setLoading(false);
      alert("Failed to create story");
    }
  };

 

export default CreateStory; 