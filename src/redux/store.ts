import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from './ducks/search/searchSlice';
import authReducer from './ducks/auth/authSlice';
import cardReducer from './ducks/card/cardSlice';
import { amenitiesApi } from './ducks/amenities/amenitiesApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { additionalConditionsApi } from './ducks/additionalConditions/additionConditionsApi';
import { createCardApi } from './ducks/card/cardApi';
import { searchApi } from './ducks/search/searchApi';
import { regionsApi } from './ducks/regions/regionsApi';
import { airportsApi } from './ducks/airports/airportsApi';
import { manufacturersApi } from './ducks/manufacturers/manufacturersQuery';
import { marinasApi } from './ducks/marinas/marinasQuery';
import { locationsApi } from './ducks/locations/locationsApi';
import { requestsApi } from './ducks/requests/requestsApi';


const logger = (store: any) => (next: any) => (action: any) => {
  //console.log(store.getState())
  //console.log(action)
  return next(action)
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    card: cardReducer,
    [amenitiesApi.reducerPath]: amenitiesApi.reducer,
    [additionalConditionsApi.reducerPath]: additionalConditionsApi.reducer,
    [createCardApi.reducerPath]: createCardApi.reducer,
    [regionsApi.reducerPath]: regionsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [airportsApi.reducerPath]: airportsApi.reducer,
    [manufacturersApi.reducerPath]: manufacturersApi.reducer,
    [marinasApi.reducerPath]: marinasApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [logger, ...getDefaultMiddleware()]
    .concat(amenitiesApi.middleware)
    .concat(additionalConditionsApi.middleware)
    .concat(createCardApi.middleware)
    .concat(searchApi.middleware)
    .concat(regionsApi.middleware)
    .concat(airportsApi.middleware)
    .concat(manufacturersApi.middleware)
    .concat(marinasApi.middleware)
    .concat(locationsApi.middleware)
    .concat(requestsApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch)