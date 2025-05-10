import { Routes } from "react-router";
import Routers from "./Pages/Router/Routers";
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    document.body.classList.add('bg-gray-200', 'min-h-screen');
    return () => {
      document.body.classList.remove('bg-gray-200', 'min-h-screen');
    };
  }, []);
  return (
    <div className="">
      
<Routers/>

    </div>
  );
}

export default App;
