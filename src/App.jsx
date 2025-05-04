import { Routes, Route } from "react-router-dom"; // ✅ 최신 문법
import Header from "@/components/Header/Header";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Directions from "./pages/Directions";
import Attractions from "./pages/Attractions";
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
    </>
  );
}
export default App;
