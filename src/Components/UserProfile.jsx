import React from "react";
import { useEffect, useRef, useState } from "react";
import { CameraIcon, Edit } from "lucide-react";
import defaultProfile from "../assets/images/RegisterImages/defaultProfile.jpg";
import { getCurrentUser, updateUser } from "../features/auth/auth";

function UserProfile() {
  const [editableField, setEditableField] = useState(null);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: "abdullah",
    email: "abdullah@gmail.com",
    phone: "3453535",
    bio: "I am Software engineer",
  });

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const bioInputRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const user = await getCurrentUser();
        if (!mounted || !user) return;
        setForm((prev) => ({
          ...prev,
          name: user.displayName || prev.name,
          email: user.email || prev.email,
          phone: user.phone || prev.phone,
          bio: user.bio || prev.bio,
        }));
      } catch (_) {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleNameChange = (e) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (e) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    setForm((prev) => ({ ...prev, phone: e.target.value }));
  };

  const handleBioChange = (e) => {
    setForm((prev) => ({ ...prev, bio: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    try {
      await updateUser({
        displayName: form.name,
        email: form.email,
        phone: form.phone,
        bio: form.bio,
        photoFile: imageFile || undefined,
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setEditableField(null);
      setImageFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10 gap-10">
      <div className="flex flex-col items-center justify-center  rounded-full w-30 h-30">
        {!image ? (
          <label className="cursor-pointer w-30 h-30  text-gray-400 bg-gray-300 rounded-full ">
            <img
              src={defaultProfile}
              alt="defaultProfile"
              className="w-30 h-30 rounded-full"
            />
            <CameraIcon />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        ) : (
          <div className="">
            <img
              src={image}
              alt="Preview"
              className="w-30 h-30 rounded-full object-cover shadow-lg "
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between text-gray-400 hover:text-black ">
          <label>Name</label>
          <Edit
            size={20}
            onClick={() => setEditableField("name")}
            className="focus:size-6 cursor-pointer"
          />
        </div>
        <input
          type="text"
          className="border-b border-gray-400 text-gray-500 focus:border-gray-600 focus:outline-none"
          value={form.name}
          onChange={handleNameChange}
          readOnly={editableField !== "name"}
          ref={nameInputRef}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-between text-gray-400 hover:text-black">
          <label>Email</label>
          <Edit
            size={20}
            onClick={() => setEditableField("email")}
            className="cursor-pointer"
          />
        </div>
        <input
          type="email"
          className="border-b border-gray-400 text-gray-500 focus:border-gray-600 focus:outline-none"
          value={form.email}
          onChange={handleEmailChange}
          readOnly={editableField !== "email"}
          ref={emailInputRef}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-between text-gray-400 hover:text-black">
          <label>Phone</label>
          <Edit
            size={20}
            onClick={() => setEditableField("phone")}
            className="cursor-pointer"
          />
        </div>
        <input
          type="tel"
          className="border-b border-gray-400 text-gray-500 focus:border-gray-600 focus:outline-none"
          value={form.phone}
          onChange={handlePhoneChange}
          readOnly={editableField !== "phone"}
          ref={phoneInputRef}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-between text-gray-400 hover:text-black">
          <label>Bio</label>
          <Edit
            size={20}
            onClick={() => setEditableField("bio")}
            className="cursor-pointer"
          />
        </div>
        <textarea
          className="border-b border-gray-400 text-gray-500 focus:border-gray-600 focus:outline-none "
          value={form.bio}
          onChange={handleBioChange}
          readOnly={editableField !== "bio"}
          ref={bioInputRef}
        />
      </div>

      <div className="flex flex-col w-30">
        <button
          type="button"
          onClick={handleSave}
          disabled={!editableField}
          className={`bg-[#3DCBB1] text-white p-2 rounded-md ${
            !editableField ? "hidden" : ""
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
