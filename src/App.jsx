import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header/Header";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Amenities from "./pages/Amenities";
import Directions from "./pages/Directions";
import Attractions from "./pages/Attractions";
import { ToastContainer } from "react-toastify"; // ToastContainer 임포트
import "react-toastify/dist/ReactToastify.css"; // 스타일 임포트
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <>
      <Header/>
      <main className="flex-grow ">
        <Routes  basename="/">
          <Route path="/" element={<Home />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/book" element={<Book />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/attractions" element={<Attractions />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
      />
    </>
  );
}

export default App;
