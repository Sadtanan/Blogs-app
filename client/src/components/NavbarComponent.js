import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/authorize";

const NavbarComponent = () => {
    const navigate = useNavigate();

    return (
        <nav>
            <ul className="nav nav-tabs">
                {/* หน้าแรก */}
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/" className="nav-link">หน้าแรก</Link>
                </li>

                {/* หากผู้ใช้ไม่ได้ล็อกอิน */}
                {!getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <Link to="/login" className="nav-link">เข้าสู่ระบบ</Link>
                    </li>
                )}

                {/* หากผู้ใช้ล็อกอิน */}
                {getUser() && (
                    <>
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <Link to="/create" className="nav-link">เขียนบทความ</Link>
                        </li>

                        <li className="nav-item pr-3 pt-3 pb-3">
                            <button className="nav-link" onClick={() => logout(() => navigate('/login'))}>
                                ออกจากระบบ
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavbarComponent;