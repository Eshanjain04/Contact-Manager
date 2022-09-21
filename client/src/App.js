import './App.css';
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
          <BrowserRouter>
              <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
