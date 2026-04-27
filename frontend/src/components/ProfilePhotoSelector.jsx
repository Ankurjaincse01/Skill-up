import React, { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";

const ProfilePhotoSelector = ({ profilePic, setProfilePic }) => {
  const fileInputRef = useRef(null);

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic({
          file: file,
          preview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePic(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mb-6">
      <div className="relative">
        <div
          className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-gray-400 transition shadow-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          {profilePic ? (
            <img
              src={profilePic.preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-sm font-medium">Add Photo</span>
          )}
        </div>

        {profilePic && (
          <button
            type="button"
            onClick={handleRemovePhoto}
            className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-2.5 hover:bg-red-600 transition shadow-md"
          >
            <MdDeleteOutline size={18} />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoSelect}
        className="hidden"
      />

      <p className="text-xs text-gray-600 text-center font-medium">
        {profilePic ? "Click to change photo" : "Click to add a profile photo"}
      </p>
    </div>
  );
};

export default ProfilePhotoSelector;
