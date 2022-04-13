import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileResponse } from "types/apiTypes/apiTypes";
import { signInType } from "types/reduxTypes/authTypes";
import { authApi } from "./authApi";

interface authState {
  isAuth: boolean;
  profileName: string;
}

const initialState: authState = {
  isAuth: !!window.localStorage.token, 
  profileName: ""
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (signInData:signInType, { rejectWithValue }) => {
    try {
      const resp = await authApi.signIn(signInData)
      window.localStorage.token = resp.data.key
      return resp.data 
    } catch (err: any) {
      delete window.localStorage.token
      return rejectWithValue(err.response?.data || err);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_:any, { rejectWithValue }) => {
    try {
      delete window.localStorage.token
      return (await authApi.signOut()).data 
    } catch (err: any) {
      delete window.localStorage.token
      return rejectWithValue(err.response?.data || err);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_:any, thunkAPI) => {
    try {
      const resp = await authApi.getProfile()
      return resp.data as getProfileResponse
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuth = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isAuth = false;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.isAuth = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isAuth = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {//@ts-ignore
        state.profileName = action.payload.first_name;
      });
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
