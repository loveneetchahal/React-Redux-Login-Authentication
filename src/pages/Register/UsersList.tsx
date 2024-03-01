import axios from "axios";
import React, { useState, useEffect } from "react";
import Left_nav from "../../components/layout/Left-nav/Left_nav";
import Pagination from "../../components/Pagination";
import Posts from "../../components/Posts";

const UsersList=()=>{
  const [usersdata,setPostData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [currentpage,setCurrent]=useState(1);
  const [postperpage]=useState(10);

  useEffect(()=>{
    const fetchPosts= async ()=>{
      setLoading(true);
      const res= await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPostData(res.data);
      setLoading(false);
    }
    fetchPosts();
  },[]);

  const indexOfLastPost=currentpage * postperpage;
  const indexOfFirstPost = indexOfLastPost-postperpage;
  const currentPosts = usersdata.slice(indexOfFirstPost,indexOfLastPost);

  const paginate=(pageNumber:any)=>setCurrent(pageNumber)
return(
  <div className="holder"> 
  <Left_nav/>
      <div className="page-container">
        <div className="container mt-5">
          <div className="container-fluid">
          <h1>Users List</h1>
          <Posts usersdata={currentPosts} loading={loading} />
          <Pagination dataPerPage={postperpage} TotalData={usersdata.length} paginate={paginate}/>
          </div>
        </div>
      </div>
  </div>
);
};
export default UsersList;