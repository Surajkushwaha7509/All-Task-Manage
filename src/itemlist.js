import { useState , useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Allitem = () =>{
    let [ myitem , updateitem ] = useState([]);
    const getitem = () =>{
        fetch("http://localhost:5000/api/get")
        .then(response=>response.json())
        .then(itemArray=>{
            updateitem(itemArray.reverse());
            updatefilterdata(itemArray);
        })
    }
    useEffect(()=>{
        getitem()
    },[1]);

    const delitem = (id) =>{
        let url = "http://localhost:5000/api/remove/"+id;
        let newitem = { "id":id };
        let postdata = {
            headers:{'Content-Type':"Application/json"},
            method:"DELETE",
            body:JSON.stringify(newitem)
        };
        fetch(url,postdata)
        .then(response=>response.json())
        .then(serverinfo=>{
            // swal( serverinfo ,"Delete Successfully" , "success");
            getitem();
        })
    }

    //let[keyword, updateKeyword] = useState(""); // For Search

    let [filterdata, updatefilterdata] = useState( [] );  

    let updateKeyword = (searchKeyword) => {
        const newdatainfo = myitem.filter((product)=>
            product.itemname.toLowerCase().includes(searchKeyword.toLowerCase()) 
        )
        updatefilterdata(newdatainfo)
        setCurrentPage(0)
    }

    //Pagination

    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(myitem.length / PER_PAGE);

    

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mb-4">
                    <h3 className="text-center"> Item List : { myitem.length } </h3>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="input-group">
                        <input type="search" className="form-control" placeholder=" Search Here... "
                        onChange={suraj=>updateKeyword(suraj.target.value)}
                        />
                    </div>
                </div>
                <hr/>
                {
                    filterdata.slice(offset, offset + PER_PAGE).map(( item , index )=>{
                        return(
                            <div className="col-lg-3 mb-4" key={index}>
                                <div className="p-3 border rounded text-center">
                                    <h4> { item.itemname } </h4>
                                    <p>Rs : { item.itemprice }</p>
                                    {/* <p>
                                        <img src={`http://127.0.0.1:5500/BackEnd/rest-api/images/${item.itemphoto}`} height="150" width="150"/>
                                    </p> */}
                                    <p>{ item.itemdetails }</p>
                                    <p> 
                                        <button className="btn btn-danger btn-sm"
                                        onClick={delitem.bind(this,item.id)}>
                                            <i className="fa fa-trash"></i> 
                                        </button>
                                        <Link to={`/edititem/${item.id}`}
                                        className="btn btn-warning btn-sm ms-2"> Edit </Link>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }

                {/* <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th> No. </th>
                            <th> Item Name </th>
                            <th> Item Price </th>
                            <th> Item Details </th>
                            <th> Action </th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myitem.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <td> {index + 1 } </td>
                                        <td> {item.itemname} </td>
                                        <td> {item.itemprice} </td>
                                        <td> {item.itemdetails} </td>
                                        <td>
                                            <Link to={`/edititem/${item.id}`}
                                            className="btn btn-warning btn-sm ms-2"> 
                                                Edit 
                                            </Link>
                                            <button className="bg-danger me-2 ms-2" style={{border:"0px"}}
                                            onClick={delitem.bind(this,item.id)}>
                                                <i className="fa fa-trash text-white"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> */}
            </div>
            <div className="mb-4 mt-4">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination  justify-content-center"}
                                pageClassName={"page-item "}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active primary"}
                            />
            </div>
        </div>
    )
}
export default Allitem;