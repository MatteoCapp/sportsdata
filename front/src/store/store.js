import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import jobAdReducer from './slices/jobAdSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
        jobAds: jobAdReducer,
    },
});

export default store;