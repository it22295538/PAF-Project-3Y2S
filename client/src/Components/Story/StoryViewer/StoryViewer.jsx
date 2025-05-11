import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StoryProgressBar from '../../Demo/StoryProgress';

const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
  
`;

const StoryImage = styled.img`
  
  max-height: 90vh;
  object-fit: contain;
`;

function StoryViewer({ stories }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentUserStoryIndex,setCurrentUserStoryIndex]=useState(0);


  const [activeIndex, setActiveIndex] = useState(0);

  
  const handleNextStory = () => {
    if (currentStoryIndex < stories?.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex+1)
    }
    else if(currentStoryIndex===stories?.length-1){
      setCurrentStoryIndex(0)
      setActiveIndex(0)
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      handleNextStory();
    } else if (event.key === 'ArrowLeft') {
      handlePrevStory();
    }
  };
  

   

  
}
 export default StoryViewer;