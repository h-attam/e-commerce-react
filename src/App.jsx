import { useEffect } from "react";
import React from "react";
import PageContainer from "./container/PageContainer";
import Header from "./components/Header";
import "../src/App.css";
import RouterConfig from "./config/RouterConfig";
import Loading from "./components/Loading";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { calculateBasket, setDrawer, removeFromBasket } from "./redux/slices/basketSlice";

function App() {
  const { products, drawer, totalAmount } = useSelector(
    (store) => store.basket
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [products]); // products değiştiğinde toplamı yeniden hesapla

  const handleRemove = (id) => {
    dispatch(removeFromBasket({ id })); // Ürün ID'sine göre sepetten kaldır
  };

  return (
    <PageContainer>
      <Loading />
      <Header />
      <RouterConfig />
      <Drawer
        className="drawer"
        sx={{ padding: "20px" }}
        onClose={() => dispatch(setDrawer())}
        anchor="right"
        open={drawer}
      >
        {products &&
          products.map((product) => (
            <div key={product.id}>
              <div className="flex-row" style={{ padding: "20px" }}>
                <img
                  style={{ marginRight: "5px" }}
                  src={product.image}
                  width={50}
                  height={50}
                  alt={product.title}
                />
                <p style={{ width: "320px", marginRight: "5px" }}>
                  {product.title} ({product.count})
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    marginRight: "10px",
                    width: "60px",
                  }}
                >
                  {product.price} ₺
                </p>
                <button
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                    backgroundColor: "rgb(255, 165, 0)",
                    border: "none",
                    color: "#fff",
                    width: "50px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemove(product.id)} // Sil butonu işlevi
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        <div>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Toplam Tutar: {totalAmount.toFixed(2)} ₺
          </p>
        </div>
      </Drawer>
    </PageContainer>
  );
}

export default App;
