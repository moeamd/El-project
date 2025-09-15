import bannerImg from "../assets/images/image.png";

function Banner() {
  return (
    <section className="bg-[#F4D876] px-6 md:px-12 py-16 relative flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start pt-[200px]">
  
      <div className="max-w-lg text-center md:text-left mb-10 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Learn something new everyday.</h1>
        <p className="text-base md:text-lg mb-6">
          Become professionals and ready to join the world.
        </p>
        <div className="flex flex-col gap-4 sm:flex-col md:flex-row sm:gap-4 md:gap-6 justify-center md:justify-start">
          <button className="bg-[#3DCBB1] text-white px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-medium text-lg hover:bg-[#33b09d] transition">
            Browse Course
          </button>
          <button className="bg-white text-[#3DCBB1] border border-[#3DCBB1] px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-medium text-lg hover:bg-[#3DCBB1] hover:text-white transition">
            Start make your account
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden md:block">
        <img src={bannerImg} alt="Banner" className="w-[400px] object-contain" />
      </div>
    </section>
  );
}

export default Banner;
