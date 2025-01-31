import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import app from "../components/Fire";
import {
  signOutUserStart, deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess
} from "../redux/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(file);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      setFilePerc(Math.round(progress));
    }, (error) => {
      setFileUploadError(true);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, avatar: downloadURL })
      );
    });

  };
  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("http://localhost:8000/api/auth/sign-out");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  }
  return (
    <div className="flex h-screen w-screen bg-slate-700 justify-center items-center" style={{
      backgroundImage: "url(/pattern.svg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}>
      <div className="flex w-1/2 flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            className="block file-input file-input-bordered w-full max-w-xs"
            hidden
            accept="image/*"
          />
          <img
            src={formData.avatar || currentUser.avatar}
            onClick={() => fileRef.current.click()}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError
              ? (
                <span className="text-red-700">
                  Error Image upload (image must be less than 2 mb)
                </span>
              )
              : filePerc > 0 && filePerc < 100
                ? (
                  <span className="text-slate-700">
                    {`Uploading ${filePerc}%`}
                  </span>
                )
                : filePerc === 100
                  ? (
                    <span className="text-green-700">
                      Image successfully uploaded!
                    </span>
                  )
                  : (
                    ""
                  )}
          </p>
          <input
            type="text"
            placeholder="username"
            defaultValue={currentUser.username}
            id="username"
            className="border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="border p-3 rounded-lg"
          />
          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
            Update
          </button>
        </form>
        <div className="flex justify-evenly mt-5">
          <div className="text-red-700 cursor-pointer">
            Delete account
          </div>
          <div className="text-red-700 cursor-pointer">
            Sign out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
