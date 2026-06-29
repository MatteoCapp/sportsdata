import axios from 'axios';

//creazione dell'istanza base configurata per Spring Boot
const api = axios.create({
    baseURL: 'http://localhost:8080/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

//interceptor per le richieste in uscita
api.interceptors.request.use(
    (config) => {
        //salvataggio token da login
        const token = localStorage.getItem('token');
        
        //se esiste mettiamolo nell'header authorization
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;