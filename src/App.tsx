import { Navigate, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search";
import DefaultLayout from "./layouts/default";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>}/>
      <Route path="/home" element={<DefaultLayout><h1>Home</h1></DefaultLayout>} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
