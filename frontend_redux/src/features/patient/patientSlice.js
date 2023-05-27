import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import fileDownload from "js-file-download";


const initialState = {
  currentPatient: null,
  records: null,
};

export const registerPatient = createAsyncThunk(
  "patient/registerPatient",
  async (initialState) => {
    try {
      console.log(initialState);
      const {
        patientId,
        firstName,
        lastName,
        weight,
        height,
        bmi,
        bloodGroup,
      } = initialState;
      const resp = await axios.post(
        "/patients",
        JSON.stringify({
          patientId,
          firstName,
          lastName,
          weight,
          height,
          bmi,
          bloodGroup,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return resp.data;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        })
      );
    }
  }
);

export const fetchPatient = createAsyncThunk(
  "patient/fetchPatient",
  async ({ patientId }) => {
    console.log("Received patient Id as--->", patientId);
    try {
      const resp = await axios.get(`/patients?id=${patientId}`, null, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        })
      );
    }
  }
);

export const uploadRecord = createAsyncThunk(
  "patient/uploadRecord",
  async (initialState) => {
    console.log("Received patient Id as--->", initialState);
    try {
      const resp = await axios.post(
        `/patients/${initialState.patientId}/upload`,
        initialState.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return resp.data;
    } catch (error) {
      console.log("Error in axios thunk------>", error?.response);
      throw new Error(
        JSON.stringify({
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        })
      );
    }
  }
);
export const fetchRecords = createAsyncThunk(
  "patient/fetchRecords",
  async (initialState) => {
    console.log("Received patient Id as--->", initialState);
    try {
      const resp = await axios.get(
        `/patients/${initialState.patientId}/records`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return resp.data;
    } catch (error) {
      console.log("Error in axios thunk------>", error?.response);
      throw new Error(
        JSON.stringify({
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        })
      );
    }
  }
);

export const downloadRecord = createAsyncThunk(
  "patient/downloadRecord",
  async (initialState) => {
    console.log("Received patient Id as--->", initialState);
    try {
      const response = await axios.get(
        `/patients/${initialState.patientId}/records/${initialState.filename}`,
        {
          
            responseType: "blob",
          
        }
      );
      await fileDownload(response.data,`${initialState.filename}`)
    } catch (error) {
      console.log("Error in axios thunk------>", error?.response);
      throw new Error(
        JSON.stringify({
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        })
      );
    }
  }
);

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    clearPatient: (state, action) => {
      state.currentPatient = null;
      state.records = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPatient.fulfilled, (state, action) => {
        console.log("In register patient fulfilled", action);
        state.currentPatient = action.payload.newPatient;
        console.log("In register patient fulfilled", current(state));
      })
      .addCase(registerPatient.rejected, (state, action) => {
        throw new Error(action.error.message);
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        console.log("In fetch patient fulfilled", action);
        state.currentPatient = action.payload.patient;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.currentPatient = null
        throw new Error(action.error.message);
      })
      .addCase(uploadRecord.fulfilled, (state, action) => {
        console.log("In upload record fulfilled", action);
      })
      .addCase(uploadRecord.rejected, (state, action) => {
        throw new Error(action.error.message);
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        console.log("In fetch record fulfilled", action);
        state.records = action.payload.files;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.records = null
        throw new Error(action.error.message);
      });
  },
});

export const getPatient = (state) => state.patient.currentPatient;
export const getPatientRecords = (state) => state.patient.records;
export const { clearPatient } = patientSlice.actions;
export const getRecordByPatientId = (state, id) =>
  state.records.find((record) => record.metadata.patientId === id);

export default patientSlice.reducer;
