import { Navigate, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search";
import DefaultLayout from "./layouts/default";
import Resume from "./components/Resume/Resume";
import Saved from "./components/Saved/Saved";
import Home from "./components/Home/Home";
import useGetAirtableData from "./hooks/fetchAirtableData";
import { useEffect, useState } from "react";
import { fetchAirtableData } from "./components/services/services";
function App() {
  const{fetchAndSyncData}= fetchAirtableData
  const[job,setJob]=useState()
useEffect(()=> {
  fetchAndSyncData();
),[])
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>}/>
      <Route path="/home" element={<Home/>} />
      <Route path="/search" element={<Search />} />
      <Route path="/resume" element={<Resume job={job} setJob={setJob}/>}/>
      <Route path="/saved" element={<Saved setJob={setJob}/>}/>
    </Routes>
  );
}

export default App;
