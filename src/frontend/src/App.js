import Login from './Login/Login'
import './App.css';

let loggedIn = () => {
  return false;
}

function App() {
  if (!loggedIn())
    return <Login></Login>;
  
  return (
    <div className="App">
        username
    </div>
  );
}



export default App;
