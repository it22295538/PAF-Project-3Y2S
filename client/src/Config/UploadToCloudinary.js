export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  try {
    const data = new FormData();
    data.append("file", file);
    

    if (file.type.startsWith("video/")) {
      data.append("upload_preset", "cloud_video_preset");
    } else {
      data.append("upload_preset", "cloud_upload_img");
    }
    


    const fileData = await res.json();
    return fileData.url;
  } catch (error) {
    console.error("Error uploading to cloudinary:", error);
    return null;
  }
};