import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";
function App() {
const [listOfUsers, setListOfUsers] = useState([]);
const[name, setName] = useState("")
const[age, setAge] = useState(0)
const[username, setUsername] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/getUsers");
        setListOfUsers(response.data);
      } catch (error) {
        console.error("AxiosError:", error);
      }
    };
  
    fetchData();
  }, []);
   
  // const createUser = () =>{
  //   Axios.post("http://localhost:3001/createUser", {
  //     name: name,
  //     age: age, 
  //     username:username
  //     /*name,
  //       age, 
  //       username
  //       this syntax above will also work because
  //       they have same names on both sides*/
  //   }).then((response) =>{
  //     alert("USER CREATED")
  //   });
  // };
  const createUser = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/createUser", {
        name: name,
        age: age,
        username: username,
      });
  
      // Check the status or other conditions in the response if needed
      if (response.status === 200) {
        alert("USER CREATED");
        setListOfUsers([...listOfUsers, {
          name: name,
          age: age,
          username: username}])
      } else {
        // Handle other conditions if needed
        alert("Error creating user");
      }
    } catch (error) {
      // Handle errors
      console.error("Error creating user:", error.message);
    }
  };
  
  

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (<div key = {user._id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Username: {user.username}</h1> 
          </div>
          )
        })}
      </div>
      <div>
        <input 
        type= "text" 
        placeholder= "Name..." 
        onChange ={(event) =>{
          setName(event.target.value)
        }}
          />
        <input 
        type= "number" 
        placeholder= "Age..." 
        onChange ={(event) =>{
          setAge(event.target.value)
        }}
        />
        <input 
        type= "text" 
        placeholder= "Username..." 
        onChange ={(event) =>{
          setUsername(event.target.value)
        }}
        />
        <button onClick = {createUser}> Create User</button>
      </div>
    </div>
  );
}

export default App;
