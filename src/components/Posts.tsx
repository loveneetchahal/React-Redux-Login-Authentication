import React from "react";

const Posts=(props:any)=>{      
    if(props.loading)
    {
        return <h2>...Loading</h2>
    }    
    return(
        <ol className="list-group mb-2">
          {
              props.usersdata.map((usersdata:any)=>(
                <li key={usersdata.id} className="list-group-item">
                    {usersdata.title}
                </li>
            ))  
           }
        </ol>
    );
};
export default Posts;
