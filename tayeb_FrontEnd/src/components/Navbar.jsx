import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // حالة لتتبع ما إذا كانت القائمة مفتوحة أم لا
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false); // دالة لإغلاق القائمة

  // دالة لجلب بيانات المستخدم
  const getUserData = () => {
    const userName = localStorage.getItem("userName");
    const userGender = localStorage.getItem("userGender");
    const userAvatar =
      userGender === "male"
        ? 'https://img.freepik.com/free-vector/coloured-chefdesign_1152-72.jpg?t=st=1733502343~exp=1733505943~hmac=ac1fc38f99cace96bc9315068d08c3672e9704dc63745d1b67a878d0b4ca1646&w=826'
        :'https://img.freepik.com/premium-photo/cute-playful-3d-girl-chef-character-with-expressive-eyes-wearing-chefs-hat-apron_1305436-369.jpg?ga=GA1.1.1643396337.1727782725&semt=ais_hybrid';;
    return { userName, userGender, userAvatar };
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]); // تأكد من أن حالة الدخول تتحدث بشكل صحيح

  const { userName, userAvatar } = getUserData();

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    closeMenu(); // إغلاق القائمة بعد تسجيل الخروج
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo" style={{ color: "orange" ,fontFamily: "Arial, sans-serif" }}>

          <Link to="/" ><i className="fas fa-utensils me-2" style={{ color: "orange" }}>&nbsp;Tayeb</i></Link>
        </div>
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
        >
          ☰
        </button>
        <div style={{ color: "orange" }} >
        <ul className={`links ${menuOpen ? "show" : ""}`}>
         
          
          {isLoggedIn ? (
            <>
            <li>
                <Link to="/" onClick={closeMenu}>
                  HOME
                </Link>
              </li>
            
              <li>
                <Link to="/about" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/favorites" onClick={closeMenu}>
                  Favorites
                </Link>
              </li>
              
              <li className="nav-item" >
                {/* صورة المستخدم مع القائمة المنسدلة */}
                <div
                  className="avatar-container"
                  onClick={toggleMenu} // التبديل بين إظهار وإخفاء المينيو
                >
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    style={{ borderRadius: "50%", width: "40px", height: "40px" ,border:'1px solid blue'}}
                  />
                    {userName}
                </div>
                {menuOpen && (
                  <div className="dropdown-menu">
                    <Link to={`/user/${localStorage.getItem("userId")}`} onClick={closeMenu}>
                    Profile
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
              
            </>
          ) : (
            <li>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
