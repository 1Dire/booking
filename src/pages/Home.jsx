import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";  // Link 임포트

const Home = () => {
  return (
    <>
      <section id="home" className="h-screen bg-cover bg-center pt-18">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-65"></div>
        <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 z-10">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            고요한 자연 속에서의 완벽한 쉼터 <br />
            한산펜션
          </h1>
          <p className="mb-8 text-lg font-normal text-sky-300 lg:text-xl sm:px-16 lg:px-48">
            한산도의 고요한 자연 속, 편안한 휴식을 위한 펜션 에 오신 걸
            환영합니다.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to="/book"  
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800"
            >
              예약안내
              <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
            </Link>
            <a
              href="#"
              className="inline-flex justify-center hover:text-blue-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              오시는길
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
