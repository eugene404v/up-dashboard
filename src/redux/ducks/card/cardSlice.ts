import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { jetTypesEnum } from "types/vehicleTypes/jetTypes/jetTypes";
import {  vehiclesCategoriesEnum } from "types/vehicleTypes/vehiclesTypes";
import { yachtTypesEnum } from "types/vehicleTypes/yachtTypes";

interface cardState {
    categorie: vehiclesCategoriesEnum | null;
    type: yachtTypesEnum | jetTypesEnum | null;
    photos: File[];
}

const initialState: cardState = {
    categorie: null,
    type: null,
    photos: [],
};

export const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
      setCategorie: (state, action: PayloadAction<vehiclesCategoriesEnum>) => {
        state.categorie = action.payload;
      },
      setType: (state, action: PayloadAction<yachtTypesEnum | jetTypesEnum>) => {
        state.type = action.payload;
      },
      setPhotos: (state, action: PayloadAction<File[]>) => {
        state.photos = action.payload;
      }
    },
    extraReducers: (builder) => {

    },
  });
  
 export const { setCategorie, setPhotos, setType } = cardSlice.actions;
  
export default cardSlice.reducer;