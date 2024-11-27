import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const App = () => {

  const title = useRef();
  const description = useRef();
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(false);
  const [data , setData] = useState(null);

  useEffect(()=>{

    // yeh All TODO ki APi hai 
    axios(`http://localhost:3000/api/v1/todos`)   
    .then((res) => {
      console.log(res.data.todos);
      setData(res.data.todos);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });

  } , []);

  const addTodo = async  (event) => {
    event.preventDefault();

    try {

      // ADD TODO KI API HAI YEH
      const response = await axios.post("http://localhost:3000/api/v1/todo" , {
        title: title.current.value,
        description: description.current.value,
      });

      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    };

  };

  const deleteUser = async (id) => {
    try {

      const response = await axios.delete(`http://localhost:3000/api/v1/todo/${id}`);
      console.log(response.data);

    } catch (error) {

      console.log(error);
    };
  };


  return (
    <>
    <h1>Todo App Using BackEnd Apis</h1>

    <form onSubmit={addTodo}>
      <input type="text" placeholder='Enter Title' ref={title} />
      <button type='submit'>Add User</button>
      <br />
      <br />
      <input type="text" placeholder='Enter Description' ref={description} />
    </form>

    {loading && <h1>Loading</h1>}
    {error && <h1>Error Occured</h1>}

    {data ? (
      data.map((item) => {
        return(
          <div style={{
            border: "1px solid black",
            padding: "20px",
            borderRadius: "20px",
            margin: "20px",
          }} key={item.id} >
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button onClick={() => deleteUser(item.id)}>Delete</button>
          </div>
        );
      })
    ): <h1>No Data Found!</h1>}
    </>
  )
}

export default App;