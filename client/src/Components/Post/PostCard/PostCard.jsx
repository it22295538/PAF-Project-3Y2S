import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill, BsDot, BsThreeDots } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isReqUserPost, isSavedPost, timeDifference } from "../../../Config/Logic";
import {
  deletePostAction,
  savePostAction,
  unSavePostAction,
} from "../../../Redux/Post/Action";
import CommentModal from "../../Comment/CommentModal";
import "./PostCard.css";
import EditPostModal from "../Create/EditPostModal";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PostCard = ({ userProfileImage, username, location, post, createdAt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [isSaved, setIsSaved] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openEditPostModal, setOpenEditPostModal] = useState(false);

  const data = {
    jwt: token,
    postId: post.id,
  };

  const handleSavePost = () => {
    dispatch(savePostAction(data));
    setIsSaved(true);
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
  };

  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex(prev => prev === post.mediaUrls.length - 1 ? 0 : prev + 1);
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex(prev => prev === 0 ? post.mediaUrls.length - 1 : prev - 1);
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  useEffect(() => {
    setIsSaved(isSavedPost(user.reqUser, post.id));
  }, [user.reqUser, post]);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleWindowClick = (event) => {
    if (!event.target.matches(".dots")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDeletePost = (postId) => {
    const data = {
      jwt: token,
      postId,
    };
    dispatch(deletePostAction(data));
  };

  const isOwnPost = isReqUserPost(post, user.reqUser);

  const handleOpenCommentModal = () => {
    navigate(`/p/${post.id}`);
    onOpen();
  };

  const handleCloseEditPostModal = () => {
    setOpenEditPostModal(false);
  };

  const handleOpenEditPostModal = () => {
    setOpenEditPostModal(true);
  };

  return (
    <div>
      <div className="flex flex-col items-center w-full border rounded-md">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full"
              src={
                post.user.userImage ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            />

            <div className="pl-2">
              <p className="font-semibold text-sm flex items-center">
                <span
                  onClick={() => handleNavigate(username)}
                  className="cursor-pointer"
                >
                  {post?.user?.username}
                </span>
                <span className="opacity-50 flex items-center">
                  <BsDot />
                  {timeDifference(post?.createdAt)}
                </span>
              </p>
              <p className="font-thin text-sm">{location}</p>
            </div>
          </div>
          <div>
            <div className="dropdown">
              <BsThreeDots onClick={handleClick} className="dots" />
              {isOwnPost && (
                <div className="dropdown-content">
                  {showDropdown && (
                    <div className="p-2 w-[10rem] shadow-xl bg-white">
                      <p
                        onClick={handleOpenEditPostModal}
                        className="hover:bg-slate-300 py-2 px-4 cursor-pointer font-semibold"
                      >
                        Edit
                      </p>
                      <hr />
                      <p
                        onClick={() => handleDeletePost(post.id)}
                        className="hover:bg-slate-300 px-4 py-2 cursor-pointer font-semibold"
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full relative">
          {post.mediaUrls?.map((url, index) => (
            <div
              key={index}
              className={`${index === currentMediaIndex ? "block" : "hidden"}`}
            >
              {isVideo(url) ? (
                <video
                  src={url}
                  controls
                  className="w-full"
                />
              ) : (
                <img
                  src={url}
                  alt={`Post media ${index + 1}`}
                  className="w-full"
                />
              )}
            </div>
          ))}

          {post.mediaUrls?.length > 1 && (
            <>
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                {post.mediaUrls?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentMediaIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    aria-label={`Go to media ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2">
            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
          </div>
          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill
                onClick={handleUnSavePost}
                className="text-xl"
              />
            ) : (
              <BsBookmark
                onClick={handleSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="w-full py-2 px-5">
          <p className="py-2">
            <span className="font-semibold">{post?.user?.username}</span> {post.caption}
          </p>
        </div>
      </div>

      <EditPostModal
        onClose={handleCloseEditPostModal}
        isOpen={openEditPostModal}
        onOpen={handleOpenEditPostModal}
        post={post}
      />

      <CommentModal
        isSaved={isSaved}
        postData={post}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default PostCard;
