import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  selectedProduct: {},
  loading: false,
  error: null,
};

const BASE_URL = "https://fakestoreapi.com";

// Tüm ürünleri almak için thunk
export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
});

// Slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state,action) => {
      state.selectedProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // API çağrısı başlatıldığında
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // Hata durumunu sıfırla
      })
      // API çağrısı başarılı olduğunda
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      // API çağrısı başarısız olduğunda
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Aksiyonlar (şu anda gerek yok ama ileride eklenebilir)
export const {setSelectedProduct} = productSlice.actions;

// Reducer
export default productSlice.reducer;
