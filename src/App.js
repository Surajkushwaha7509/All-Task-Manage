import { HashRouter , Route , Routes , Link } from "react-router-dom";
import Allitem from "./itemlist";
import Mynewitem from "./newitem";
import Myedititem from "./edititem";
import Newaccount from "./newaccount";

function App() {
  return (
    <HashRouter>

      <div className="container mt-2 mb-4">
        <div className="row">
          <div className="col-lg-3 text-primary">
            <h1> MERN STACK </h1>
          </div>
          <div className="col-lg-9 text-end">
            <div className="btn-group">
              <Link to="/" className="btn btn-primary"> Item List </Link>
              <Link to="/newitem" className="btn btn-warning"> New Item </Link>
              <button className="btn btn-danger" onClick={logout}>
                  {localStorage.getItem("fullname")} - Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Allitem/>}/>
        <Route exact path="/newitem" element={<Mynewitem/>}/>
        <Route exact path="/edititem/:id" element={<Myedititem/>}/>
      </Routes> 
    </HashRouter>
  );
}

export default App;

const logout = () =>{
  localStorage.clear();
  window.location.reload();
}