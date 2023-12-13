// import React, {useState, useEffect} from "react";
// import {useHistory , Link } from 'react-router-dom';
// import axios from "axios";
// import {toast} from "react-toastify";

// const initialState = {
//   itemname:"",
//   itempriceL:"",
//   itemdetails:"",
// }

// const Addedit = () => {
//   let [ state , setState ] = useState(initialState);

//   const { itemname , itemprice, itemdetails } = state; 



//   const editdta = (e) =>{
//     e.preventDefault();
//     if(!itemname || !itemprice || !itemdetails){
//       toast.error("Plase Provide value into each input field")
//     }
//     else{
//       axios.post("http://localhost:5000/api/post",{
//         itemname,itemprice,itemdetails
//       })
//       .then(()=>{
//         setState({ itemname:"" , itemprice:"" , itemdetails:"" })
//       })
//       .catch((err)=>toast.error(err.response.data))
      
//     }
//   }

//   const items = (e) =>{
//     const {name, value} = e.target;
//     setState({...state,[name]:value});
//   }

//   return (
//     <div>
//       <form style={{
//         margin:"auto",
//         padding:"15px",
//         maxWidth:"400px",
//         alignContent:"center"
//       }}
//       onSubmit={editdta}
//       >
//         <label> Item Name </label>
//         <input type="text" name="itemname" placeholder="Item Name..." value="itemname" 
//         onChange={items}/><br/>

//         <label> Item Price </label>
//         <input type="number" name="itemprice" placeholder="Item Price..." value="itemprice" 
//         onChange={items}/><br/>

//         <label> Item Details </label>
//         <input type="text" name="itemdetails" placeholder="Item Details..." value="itemdetails" 
//         onChange={items}/><br/>

//         <input type="submit" value="Save"/>
//         <Link to="/">
//           <input type="button" value="Go Back"/>
//         </Link>
//       </form>
//     </div>
//   )
// }

// export default Addedit;

import { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
const Addedit = () =>{
    let  [ productname , pickName ] = useState("");
    let  [ productprice , pickPrice ] = useState("");
    let  [ productdetails , pickDetails ] = useState("");

    const save = () =>{
        let url = "http://localhost:5000/api/post";
        let newitem = {
            "itemname":productname,
            "itemprice":productprice,
            "itemdetails":productdetails
        };
        let postdata = {
            headers:{'Content-type':"Application/json"},
            method:"POST",
            body:JSON.stringify(newitem)
        };
        if( newitem.itemname != "" && newitem.itemprice != "" && newitem.itemdetails != "" )
        {
            fetch(url,postdata)
            .then(response=>response.json())
            .then(iteminfo=>{
                swal( productname , " Save Successfully " , "success" );
                pickDetails("");pickName("");pickPrice("");
                window.location.href="../#";
            })
        }
        else{
            swal("Invaild Input" , " Please Enter Values " , "warning");
        }
    }

    useEffect(()=>{
      save();
    })

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <form>
                            <h3 className="text-center mb-3"> Enter Item Detials </h3>
                            <div className="mb-4">
                                <label> Enter Item Name </label>
                                <input type="text" className="form-control"
                                onChange={suraj=>pickName(suraj.target.value)}
                                value={productname}/>
                            </div>
                            <div className="mb-4">
                                <label> Enter Item Price </label>
                                <input type="number" className="form-control"
                                onChange={suraj=>pickPrice(suraj.target.value)}
                                value={productprice}/>
                            </div>
                            <div className="mb-4">
                                <label> Enter Item Detials </label>
                                <textarea className="form-control"
                                onChange={suraj=>pickDetails(suraj.target.value)}
                                value={productdetails}></textarea>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary me-3"
                                onClick={save}> Save Item </button>
                                <button type="reset" className="btn btn-danger me-3"> Clear All </button>
                                <Link to="/">
                                  <button className="btn btn-success "> Go Back </button>
                                </Link>
                            </div>

                        </form>
                    </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Addedit;
