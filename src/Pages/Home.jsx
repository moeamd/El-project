import { auth } from "../Api/Firebase-Config";
import Banner from "../Components/BannerComponent";
import JoinComponent from "../Components/JoinComponent";
import Courses from "./Courses";

function Home() {
  return (
    <>
      <Banner />
      <Courses />
      <JoinComponent />
    </>
  );
}

export default Home;

