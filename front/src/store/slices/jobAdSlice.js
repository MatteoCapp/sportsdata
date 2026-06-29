import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

//thunk per creare un nuovo annuncio
export const createJobAd = createAsyncThunk(
    'jobAds/createJobAd',
    async ({ authorId, jobAdData }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/job-ads?authorId=${authorId}`, jobAdData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore durante la creazione dell\'annuncio');
        }
    }
);

//thunk per recuperare tutti gli annunci
export const fetchJobAds = createAsyncThunk(
    'jobAds/fetchJobAds',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/job-ads');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore nel recupero degli annunci');
        }
    }
);

//thunk per filtrare gli annunci per città
export const searchJobAdsByLocation = createAsyncThunk(
    'jobAds/searchJobAdsByLocation',
    async (location, { rejectWithValue }) => {
        try {
            const response = await api.get(`/job-ads/search?location=${location}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore nella ricerca degli annunci');
        }
    }
);

//thunk per eliminare il lavoro
export const deleteJobAd = createAsyncThunk(
    'jobAds/deleteJobAd',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/job-ads/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore durante l\'eliminazione');
        }
    }
);

const jobAdSlice = createSlice({
    name: 'jobAds',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //creare annuncio
            .addCase(createJobAd.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createJobAd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(createJobAd.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            //lettura annunci
            .addCase(fetchJobAds.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchJobAds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload; // Aggiorna la lista
            })
            .addCase(fetchJobAds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //eliminazione
            .addCase(deleteJobAd.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            })

            //ricerca filtrata
            .addCase(searchJobAdsByLocation.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchJobAdsByLocation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload; //lista nuova con i risultati filtrati
            })
            .addCase(searchJobAdsByLocation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default jobAdSlice.reducer;