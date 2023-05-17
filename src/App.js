import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Index from "./components/Index";
import { Route, Routes } from "react-router-dom"
import UserInput from "./components/UserInput";
import Inputs from "./components/Inputs";
import CipherContent from "./components/CipherContent";


function App() {
  return (


        <Routes>
              <Route exact path={'/'}  element={<Index/>}/>
              <Route exact path={'/get-started'}  element={<CipherContent/>}/>
      </Routes>


  );
}

export default App;
