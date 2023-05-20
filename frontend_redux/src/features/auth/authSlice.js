import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  auth: null,
  registerStatus: "idle",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ user, pwd, uid }) => {
    try {
      const resp = await axios.post(
        `/register`,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          params: { uid: uid },
          withCredentials: true,
        }
      );
      return resp.data;
    } catch (err) {
      throw new Error(
        JSON.stringify({
          status: err?.response?.status,
          statusText: err?.response?.statusText,
          data: err?.response?.data,
        })
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ user, pwd }) => {
    try {
      const resp = await axios.post(
        `/login`,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return resp.data;
    } catch (err) {
      throw new Error(
        JSON.stringify({
          status: err?.response?.status,
          statusText: err?.response?.statusText,
          data: err?.response?.data,
        })
      );
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const resp = await axios.post("/logout", null, { withCredentials: true });
  return resp.data;
});

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async () => {
    const resp = await axios.get("/refresh", { withCredentials: true });
    return resp.data.accessToken;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // updateAccessToken: (state, action) => {
    //   state.auth = { ...state.auth, accessToken: action.payload.accessToken };
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        // console.log("In register fulfilled case---->", action);
        state.registerStatus = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        const errMsg = JSON.parse(action.error.message).data.message;
        throw new Error(errMsg);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log("In login case fulfilled----->", action);
        state.auth = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        const errMsg = JSON.parse(action.error.message).data.message;
        throw new Error(errMsg);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log("Logout case---->", action);
        state.auth = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        console.log(
          "state before updating new acccess token",
          current(state)
        );
        state.auth = { ...state.auth, accessToken: action.payload };
        console.log(
          "state after updating new acccess token",
          current(state)
        );
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        console.log("Refresh user token failed");
        console.log(action);
      });
  },
});

export const getAuthState = (state) => state.auth.auth;
export const getAuthRegisterStatus = (state) => state.auth.registerStatus;

export default authSlice.reducer;
