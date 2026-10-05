import React, { useState, useEffect } from 'react'

const Home = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:8086/api/users")
    .then((res)=>{
      if (!res.ok) throw new Error ("failed to fetch");
     return res.json()
    })
    .then((data)=>{
      setUsers(data);
      console.log(data)

    })
    .catch((err)=>{
      console.log(err.message);
    })
  }, []);


  function addingUser () {
    fetch("http://localhost:8086/api/users",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        "email": 'garouU@hotmail.com',
               "bio": 'gaUrou',
              "country": 'viInland'
      })
    })
    .then((res)=>{
      if(!res.ok) throw new Error("failed to use second fetch");
      return res.json();      
    })
    .then((data)=>{
      return console.log(data);
    })
  }
  
  return (
    <>
  <div className="text-center mt-4">
  <h1 className="text-3xl font-bold text-emerald-700">POS System</h1>
  <p className="font-bold text-2xl text-red">With FBR Integration</p>
    <div className="usersarea">
      <h3>Users Details will Display here</h3>
    </div>
</div>
    <div className='pl-2' >Data Here
       {users.map((items, id) => 
       <div className='font-bold text-red-500 mt-2 pl-4' name={items.country} key={items.id} > {items.country} </div>  
    )} </div>
    <button className='border-2 border-black' onClick={addingUser}> Add User </button>

    </>
  )
}

export default Home