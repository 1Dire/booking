import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header/Header";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Directions from "./pages/Directions";
import Attractions from "./pages/Attractions";
import { ToastContainer } from 'react-toastify';  // ToastContainer 임포트
import 'react-toastify/dist/ReactToastify.css';  // 스타일 임포트

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/attractions" element={<Attractions />} />
        </Routes>
      </main>
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={true} /> {/* ToastContainer 추가 */}
    </>
  );
}

export default App;
