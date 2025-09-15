import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center ">
      <ClipLoader color="white" />
    </div>
  );
}
