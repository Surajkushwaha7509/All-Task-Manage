import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
const Myedititem = () =>{
    const {id} = useParams();
    let  [ productname , pickName ] = useState("");
    let  [ productprice , pickPrice ] = useState("");
    let  [ productdetails , pickDetails ] = useState("");

    const getiteminfo = () =>{
        let url = "http://localhost:5000/api/edit/"+id;
        fetch(url)
        .then(response=>response.json())
        .then(iteminfo=>{
            pickName(iteminfo[0].itemname);
            pickPrice(iteminfo[0].itemprice);
            pickDetails(iteminfo[0].itemdetails);
         })
    }

    useEffect(()=>{
        getiteminfo();
    },[1]);

    const save = () =>{
        let url = "http://localhost:5000/api/put";
        let newitem = {
            "id":id,
            "name":productname,
            "price":productprice,
            "detail":productdetails,
        };
        let postdata = {
            headers:{'Content-Type':"application/json"},
            method:"PUT",
            body:JSON.stringify(newitem)
        };
        if( newitem.name != "" && newitem.price != "" && newitem.detail != "" )
        {
            fetch(url,postdata)
            .then(response=>response.json())
            .then(iteminfo=>{
                swal( productname , "Successfully Update" , "success" );
                window.location.href="../#";
            })
        }
        else{
            swal("Invaild Input" , " Please Enter Values " , "warning");
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <form>
                            <h3 className="text-center mb-3"> Edit Item Detials </h3>
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
                                onClick={save}> Update Item </button>
                            </div>

                        </form>
                    </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Myedititem;