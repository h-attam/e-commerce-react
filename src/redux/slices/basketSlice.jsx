import { createSlice } from "@reduxjs/toolkit";

// Sepeti localStorage'dan okuma fonksiyonu
const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

// Başlangıç durumu
const initialState = {
  products: getBasketFromStorage(),
  drawer: false,
  totalAmount: 0,
};

// Sepeti localStorage'a yazma fonksiyonu
const writeFromBasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Sepete ürün ekleme
    addToBasket: (state, action) => {
      const findProduct =
        state.products &&
        state.products.find((product) => product.id === action.payload.id);

      if (findProduct) {
        // Ürün daha önceden eklenmiş
        const extractedProducts = state.products.filter(
          (product) => product.id !== action.payload.id
        );

        findProduct.count += action.payload.count;

        state.products = [...extractedProducts, findProduct];
        writeFromBasketToStorage(state.products);
      } else {
        // Yeni ürün ekleme
        state.products = [...state.products, action.payload];
        writeFromBasketToStorage(state.products);
      }
    },
    // Sepetten ürün silme
    removeFromBasket: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      writeFromBasketToStorage(state.products); // LocalStorage'ı güncelle
    },
    // Drawer durumunu değiştir
    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    // Sepet toplamını hesapla
    calculateBasket: (state) => {
      state.totalAmount = 0; // Toplam miktarı sıfırla
      state.products &&
        state.products.map((product) => {
          state.totalAmount += product.price * product.count; // price ile count'u çarp
        });
    },
  },
});

// Reducer'lar ve slice fonksiyonları
export const { addToBasket, removeFromBasket, setDrawer, calculateBasket } = basketSlice.actions;

export default basketSlice.reducer;
