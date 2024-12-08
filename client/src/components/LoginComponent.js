import NavbarComponent from "./NavbarComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authorize";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [state, setState] = useState({
        username: "",
        password: ""
    });
    const { username, password } = state;

    const navigate = useNavigate();  // ใช้ hook navigate แทน props.history

    const inputValue = (name) => (event) => {
        setState({ ...state, [name]: event.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();

        axios
            .post(`${process.env.REACT_APP_API}/login`, { username, password })
            .then(response => {
                authenticate(response, () => navigate("/create"));
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    Swal.fire('แจ้งเตือน', err.response.data.error, 'error');
                } else {
                    Swal.fire('แจ้งเตือน', 'เกิดข้อผิดพลาดในการล็อกอิน', 'error');
                }
            });
    };

    useEffect(() => {
        if (getUser()) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>เข้าสู่ระบบ | Admin</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={inputValue("username")}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={inputValue("password")}
                    />
                </div>
                <br />
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default LoginComponent;