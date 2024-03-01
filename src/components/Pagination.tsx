import React from "react";

const Pagination = (props:any) =>{
    const PageNumbers=[];
    
    for(let i=1;i<=Math.ceil(props.TotalData/props.dataPerPage);i++){
        PageNumbers.push(i);
    }
    return(
        <nav>
            <ul className="pagination">
            {PageNumbers.map(number=>(
                <li key={number} className="page-item">
                    <a onClick={()=>props.paginate(number)} href='#' className="page-link">
                        {number}
                    </a>
                </li>                
            ))}
            </ul>
        </nav>
    );
};
export default Pagination;

