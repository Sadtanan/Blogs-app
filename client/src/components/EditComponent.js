import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";

const EditComponent=()=>{
    const { slug } = useParams(); // ดึง slug จาก URL
    const [state,setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const {title,author} = state
    const [content,setContent] = useState('')

    const submitContent=(event)=>{
        setContent(event)
    }

    //ดึงข้อมูล
    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response=>{
            const {title,content,author} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[slug])

    const showUpdateForm=()=>(
        <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" 
                        value={title} 
                        onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label>รายละเอียดบทความ</label>
                    <ReactQuill 
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        style={{border:'1px solid #666'}}
                    />
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input className="form-control" 
                    value={author}
                    onChange={inputValue("author")}>
                    </input>
                </div>
                <input type="submit" value="อัพเดต" className="btn btn-primary"/>
            </form>
    )

    //กำหนดค่าให้กับstate
    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
    }

    const submitForm=(e)=>{
        e.preventDefault();
        console.log("API URL =",process.env.REACT_APP_API)
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`, {title,content,author},
            {
                headers:{
                    authorization:`Bearer ${getToken()}`
                }
            }
        )
        .then(response=>{
            Swal.fire({
                title: "แจ้งเตือน",
                text: "อัพเดตข้อมูลเรียบร้อย",
                icon: "success"
              });
            const {title,content,author,slug} = response.data
            setState({...state,title,content:"",author})
        })
        .catch(err=>{
            Swal.fire({
                title: "แจ้งเตือน",
                text: err.response.data.error,
                icon: "error"
              });
        })
    }
    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}
        </div>
    );
}

export default EditComponent;