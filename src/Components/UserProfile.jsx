import { useEffect, useRef, useState, useMemo } from "react";
import { CameraIcon, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import defaultProfile from "../assets/images/RegisterImages/defaultProfile.jpg";
import { updateUser } from "../features/auth/auth";
import { fetchCurrentUser, selectCurrentUser } from "../features/auth/currentUserSlice";
import { getUsers, selectUsers } from "../features/auth/usersSlice";

function UserProfile() {
  const [editableField, setEditableField] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const { currentUser } = useSelector(selectCurrentUser);
  const { users, isLoading, error } = useSelector(selectUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  const currentUserInfo = useMemo(() => {
    if (!currentUser?.uid || !Array.isArray(users)) return null;
    return users.find((u) => u?.uid === currentUser.uid) || null;
  }, [users, currentUser]);

  useEffect(() => {
    if (currentUserInfo) {
      setForm({
        name: currentUserInfo.displayName || "",
        email: currentUserInfo.email || "",
        phone: currentUserInfo.phone || "",
        bio: currentUserInfo.bio || "",
      });
      setImagePreviewUrl(currentUserInfo.photoURL || null);
      return;
    }
  }, [currentUserInfo]);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const bioInputRef = useRef(null);

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
    if (!file) return;
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    const preview = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreviewUrl(preview);
  };

  const handleSave = async () => {
    try {
      await updateUser({
        ...currentUserInfo,
        displayName: form.name,
        email: form.email,
        phone: form.phone,
        bio: form.bio,
        photoFile: imageFile,
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setEditableField(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-[75%] m-auto justify-center min-h-screen p-10 gap-10 shadow-2xl mb-4">
      <div className="flex flex-col items-center justify-center  rounded-full w-30 h-30">

        <label className="cursor-pointer w-30 h-30  text-gray-400 bg-gray-300 rounded-full ">
          <img
            src={currentUser?.photoURL ? currentUser?.photoURL : defaultProfile}
            alt="defaultProfile"
            className="w-30 h-30 rounded-full"
          />
          <CameraIcon />
          <input
            type="file"
            accept="image/"
            onChange={handleImageChange}
            onClick={() => setEditableField("photo")}
          />
        </label>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between text-gray-400 hover:text-black ">
          <label>Name</label>
          <Edit
            size={20}
            onClick={() => setEditableField("name")}
            className="focus:size-6 cursor-pointer focus:bg-[#3DCBB1]"
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
          className={`bg-[#3DCBB1] text-white p-2 rounded-md ${!editableField ? "hidden" : ""
            }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
