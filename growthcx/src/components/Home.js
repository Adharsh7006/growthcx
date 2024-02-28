import React, { useEffect, useState } from 'react'
import '../components/Home.css'
import { db } from '../firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { BiCheckDouble } from 'react-icons/bi'
import { RiDeleteBinFill } from "react-icons/ri";
import { BsFillSuitHeartFill } from "react-icons/bs";

function Home() {
    const id=localStorage.getItem('id')
    console.log(id)
    const data=collection(db,"user")
    const getdata=collection(db,"user")

    const [todotext, settodotext] = useState('')
    const [Search, setSearch] = useState([])
    const [first, setfirst] = useState([])
    const handlesubmit = async()=>{
      if(!todotext){
        alert("enter the text")
      }
      try{
      const result=await addDoc(data, {
        message: todotext,
        userid:id,
        status:true,
        favour:true
    });
    settodotext("")
    alert("successfully added")
    fetchdata()
  }
  catch(err){
    console.log(err)
  }
    }
    const fetchdata = async()=>{
      const result=await getDocs(getdata)
      console.log("data",result.docs)
      const filtereddata = result.docs.map((item)=>(
        { ...item.data(),
        id:item.id
      }
      ))
      setfirst(filtereddata)
      setSearch(first)

    }
    useEffect(() => {
      fetchdata()
    }, [])
    const handleedit = async(id,status)=>{
      const channeldoc= doc(db,"user",id)
      console.log(data)
      console.log(channeldoc)
      await updateDoc(channeldoc,{
        status:!status
      })
      fetchdata()

    }
    const handledelete = async(id)=>{
      const data=doc(db,"user",id)
      await deleteDoc(data)
      fetchdata()

    }
    const handlefavour = async(id,favour)=>{
      const channeldoc= doc(db,"user",id)
      console.log(data)
      console.log(channeldoc)
      await updateDoc(channeldoc,{
        favour:!favour
      })
      fetchdata()

    }
    const handlsearch =(e)=>{
      setfirst(Search.filter((item)=>item.message.toLowerCase().includes(e.target.value)))

    }
    
  return (
    <div className='home-page'>
      <h1>Todo List</h1>
      <input placeholder='Search todo list' onChange={handlsearch}/>
    <div className='home-input'>
        <input value={todotext} onChange={(e)=>settodotext(e.target.value)}/>
        <button onClick={handlesubmit} className='home-button'>Add</button>

      </div>
      <div className='home-todo'>
        {first.length ?
        first.map((item)=>{
          return(
            <div key={item.id} id='home-text'>
              <h4 className={`home-txt ${!item.status ? 'home-text1':""}`}>{item.message}</h4>
              <div className='home-icon'>
              <BiCheckDouble onClick={()=>handleedit(item.id,item.status)}/>
              <RiDeleteBinFill onClick={()=>handledelete(item.id)} />
              <BsFillSuitHeartFill className={!item.favour ? 'home-favour':""} onClick={()=>handlefavour(item.id,item.favour)} />
                </div>
              </div>
          )
        }):
        <h4>No Data</h4>
        }

      </div>
        </div>
  )
}

export default Home