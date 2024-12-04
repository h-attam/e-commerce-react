import React, { useState } from "react";
import "../css/Header.css";
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlice";



function Header() {
  const [theme, setTheme] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer açık/kapalı durumu
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.basket);

  const changeTheme = () => {
    const root = document.getElementById("root");

    if (theme) {
      root.style.backgroundColor = "black";
      root.style.color = "#fff";
    } else {
      root.style.backgroundColor = "#fff";
      root.style.color = "black";
    }
    setTheme(!theme);
  };

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo ve Navigasyon */}
      <div className="flex-row" onClick={() => navigate("/")}>
        <img src="./src/images/logo1.jpg" className="logo" alt="Logo" />
        <p className="logo-text">Hattuç</p>
      </div>

      {/* Arama ve Tema/Çekmece Kontrolleri */}
      <div className="flex-row">
        <input
          className="search-input"
          type="text"
          placeholder="Bir şeyler ara..."
        />
        <div>
          {theme ? (
            <FaMoon className="icon" onClick={changeTheme} />
          ) : (
            <CiLight className="icon" onClick={changeTheme} />
          )}
          <Badge
          onClick={() => dispatch(setDrawer())}
            badgeContent={products.length || 0} // Ürün sayısı
            color="secondary"
            
          >
            <CiShoppingBasket style={{ marginRight: "6px" }} className="icon" />
          </Badge>
        </div>

       
      </div>
    </div>
  );
}

export default Header;
