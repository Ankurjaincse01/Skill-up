import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data?.imageUrl || response.data;
  } catch (error) {
    console.error("Error uploading the image:", error);
    // If photo upload fails, don't fail entire signup - just continue without photo
    return null;
  }
};

export default uploadImage;

