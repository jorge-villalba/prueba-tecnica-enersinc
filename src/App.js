import './App.css';

//Import the component of the users
import CompShowUsers from './users/ShowUsers';
import CompAddUser from './users/AddUser';
import CompEditUser from './users/EditUser';
import CompSeeUser from './users/SeeUser';

//Import router
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompShowUsers/>}></Route>
          <Route path="/add" element={<CompAddUser/>}></Route>
          <Route path="/:id/edit" element={<CompEditUser/>}></Route>
          <Route path = "/:id" element={<CompSeeUser></CompSeeUser>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
