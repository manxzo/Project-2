import { Navigate, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search";
import DefaultLayout from "./layouts/default";
import Resume from "./components/Resume/Resume";
import Saved from "./components/Saved/Saved";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>}/>
      <Route path="/home" element={<DefaultLayout><h1>Home</h1></DefaultLayout>} />
      <Route path="/search" element={<Search />} />
      <Route path="/resume" element={<Resume/>}/>
      <Route path="/saved" element={<Saved/>}/>
    </Routes>
  );
}

export default App;
