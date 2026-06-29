import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

//thunk per creare un nuovo progetto
export const createProject = createAsyncThunk(
    'projects/createProject',
    async ({ authorId, projectData }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/projects?authorId=${authorId}`, projectData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore durante la creazione del progetto');
        }
    }
);

//thunk per recuperare tutti i progetti dal backend
export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/projects');
            return response.data; // Ritorna List<Project> dal backend
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore nel recupero dei progetti');
        }
    }
);
 
//thunk per eliminare il progetto
export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/projects/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore durante l\'eliminazione');
        }
    }
);

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //creazione progetto
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            //lettura progetti
            .addCase(fetchProjects.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload; //lista aggiornata
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            //eliminazione progetto
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default projectSlice.reducer;