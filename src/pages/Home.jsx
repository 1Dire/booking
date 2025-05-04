import React from "react";

const Home = () => {
  return (
    <>
      <section id="home" className="h-screen bg-cover bg-center pt-18">
        <div className="relative z-2 flex justify-center items-center h-full">
          <div className="inline-block">
            <div className="sub-title text-center">
              <span className="text-xl font-color-brown-1">
                한산도의 고요한 자연 속, 편안한 휴식을 위한 펜션 에 오신 걸
                환영합니다.
              </span>
            </div>
            <div className="main-title mt-5">
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-color-white-1 text-center leading-20">
                고요한 자연 속에서의 완벽한 쉼터
                <br /> 한산펜션
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
