import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findStoryByUserId } from "../../../Redux/Story/Action";


const StoryCircle = ({ image, username, userId }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`story/${userId}`);
  };

  
};

export default StoryCircle;
