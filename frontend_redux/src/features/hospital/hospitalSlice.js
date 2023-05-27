import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  auth: null,
  status: "idle",
};

export const registerHospital = createAsyncThunk(
  "auth/registerHospital",
  async ({ hospitalName, hospitalEmail, hospitalPassword }) => {
    try {
      const resp = await axios.post(
        `/hospital/register`,
        JSON.stringify({ hospitalName, hospitalEmail, hospitalPassword }),
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

export const loginHospital = createAsyncThunk(
  "auth/loginHospital",
  async ({ hospitalEmail, hospitalPassword }) => {
    try {
      const resp = await axios.post(
        `/hospital/login`,
        JSON.stringify({ hospitalEmail, hospitalPassword }),
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

export const logoutHospital = createAsyncThunk(
  "auth/logoutHospital",
  async ({ hospitalId }) => {
    const resp = await axios.post(
      `/hospital/logout?hospitalId=${hospitalId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return resp.data;
  }
);

export const hospitalAuthSlice = createSlice({
  name: "hospital",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerHospital.fulfilled, (state, action) => {
        console.log("In register fulfilled case---->", action);
        state.status = "success";
        console.log(state);
      })
      .addCase(registerHospital.rejected, (state, action) => {
        const errMsg = JSON.parse(action.error.message).data.message;
        throw new Error(errMsg);
      })
      .addCase(loginHospital.fulfilled, (state, action) => {
        console.log("In login case fulfilled----->", action);
        state.auth = action.payload.hospital;
      })
      .addCase(loginHospital.rejected, (state, action) => {
        const errMsg = JSON.parse(action.error.message).data.message;
        throw new Error(errMsg);
      })
      .addCase(logoutHospital.fulfilled, (state, action) => {
        console.log("Logout case---->", action);
        state.auth = null;
      });
  },
});

export const getHospitalAuthState = (state) => state.hospital.auth;
export const getHospitalStatus = (state) => state.hospital.status;

export default hospitalAuthSlice.reducer;
