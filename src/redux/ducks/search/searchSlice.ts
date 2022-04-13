import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { cardsFilterType } from "types/searchTypes";
import { vehiclesCategoriesEnum } from "types/vehicleTypes/vehiclesTypes";

const initialState: searchState = {
  filter: {
    search: "",
    categorie: vehiclesCategoriesEnum.yacht,
    regions: []
  },
  page: 0,//TODO
  yachtPreviews: [],
  jetPreviews: []
};

interface searchState {
  filter: cardsFilterType;
  page?: number;
  yachtPreviews: any[]; //TODO
  jetPreviews: any[]; //TODO
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filter.search = action.payload;
    },
    setCategorie: (state, action: PayloadAction<vehiclesCategoriesEnum>) => {
      state.filter.categorie = action.payload;
    },
    setRegions: (state, action: PayloadAction<number[]>) => {
      state.filter.regions = action.payload;
    }
  },
  extraReducers: (builder) => {},
});

export const { setSearch, setCategorie, setRegions } = searchSlice.actions;

export default searchSlice.reducer;
