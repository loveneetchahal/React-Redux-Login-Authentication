import axios from "axios";
import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
//import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { styled } from "@material-ui/core";
import Left_nav from "../../components/layout/Left-nav/Left_nav";
import { Button } from "primereact/button";


const ItemList=()=>{
    const [loading,setLoading]=useState(false);
  const [state, setState]=useState({
    customers1: [],
    first1: 0,
    rows1: 10,
    first2: 0,
    rows2: 10,
    currentPage: 1,
    pageInputTooltip: 'Press \'Enter\' key to go to this page.'
});
  useEffect(()=>{
    const fetchPosts= async ()=>{
      //setLoading(true);
      const res= await axios.get('https://jsonplaceholder.typicode.com/posts');
      setState({...state,customers1 : res.data});
      //setLoading(false);
    }
    fetchPosts();
    //expect(testMethod("World")).toBe("Hello World");
  },[]);
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    
  return(
<div className="holder">
  <Left_nav/>
<div className="page-container">  
    <div className="main-content">     
      <TableContainer>      
      <DataTable value={state.customers1} paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} >
          <Column field="id" header="SI"></Column>
          <Column field="title" header="Name"></Column>   
      </DataTable> 
      </TableContainer>    
      
    </div> 
  </div>
  
</div>
);
};
export default ItemList;

const TableContainer = styled("div")({
  width: "80%",
  marginLeft:"100px",
  marginRight:"100px",
  marginBottom:"100px",
  paddingTop:"20px",
  border:"2px solid"
});
