import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  users: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ accessToken }) => {
    try {
      const resp = await axios.get("/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
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


export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state, action) => {
      state.users = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("fetched users")
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        throw new Error(action.error.message);
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const { clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
