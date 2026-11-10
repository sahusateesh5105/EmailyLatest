import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await axios.get("/api/current_user");
  return res.data;
});

export const handleToken = createAsyncThunk(
  "auth/handleToken",
  async (token) => {
    const res = await axios.post("/api/stripe", token);
    return res.data;
  }
);

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async ({username,password,navigate}) => {
    const res = await axios.post("/auth/register", {username,password});
    if(res.status === 200){
      navigate("/surveys")
    }
    return res.data;
  }
);

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async ({username,password,navigate}) => {
    const res = await axios.post("/auth/login", {username,password});
    if(res.status === 200){
      navigate("/surveys")
    }
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        return action.payload || false;
      })
      .addCase(handleToken.fulfilled, (state, action) => {
        return action.payload || false;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        return action.payload || false;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        return action.payload || false;
      });      
  },
});

export default authSlice.reducer;
