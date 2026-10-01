import React, { useState, useEffect } from 'react'

const Home = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:8086/api/users")
    .then((res)=>{
      if (!res.ok) throw new Error ("failed to fetch");
    })
    .then((users)=>{
      setUsers(data);
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }, []);
  
  
  return (
    <>
  <div className="text-center mt-4">
  <h1 className="text-3xl font-bold text-emerald-700">POS System</h1>
  <p className="font-bold text-2xl text-red">With FBR Integration</p>
    <div className="usersarea">
      <h3>Users Details will Display here</h3>
    </div>
</div>
    <div>Data Here </div>

    </>
  )
}

export default Home