import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { requestsEnum } from "types/requestsTypes";
import { vehiclesCategoriesEnum } from "types/vehicleTypes/vehiclesTypes";

interface requestsState {
    filter: {
        categorie: vehiclesCategoriesEnum;
        status: requestsEnum;
    }
}

const initialState: requestsState = {
    filter: {
        categorie: vehiclesCategoriesEnum.yacht,
        status: requestsEnum.pending,
    }
}