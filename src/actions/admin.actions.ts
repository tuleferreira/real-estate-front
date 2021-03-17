import axios from 'axios';

import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS } from '../constants/ui.constants';

export const loginAdmin = (adminData: any, history: any) => async (dispatch: any) => {
    dispatch({ type: LOADING_UI });

    try {
        const res = await axios.post('/admin/login', adminData);
        const token = `Bearer ${res.data.token}`;

        localStorage.setItem('token', `Bearer ${res.data.token}`);
        axios.defaults.headers.common['Authorization'] = token;

        dispatch(getAdminData());
        dispatch({ type: CLEAR_ERRORS });

        history.push('/');
    } catch (error) {
        console.log(error);
        dispatch({
            payload: error.response.data,
            type: SET_ERRORS,
        });
    }
};

export const getAdminData = () => async (dispatch: any) => {
    dispatch({ type: 'LOADING_ADMIN' });

    try {
        const res = await axios.get('/admin');

        dispatch({
            payload: res.data,
            type: 'SET_ADMIN',
        });
    } catch (error) {
        console.log(error);
    }
};

export const logoutAdmin = () => async (dispatch: any) => {
    try {
        await axios.post('/admin/logout');

        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];

        dispatch({
            type: 'SET_UNAUTHENTICATED',
        });
    } catch (error) {
        console.log(error);
    }

    window.location.href = '/login';
};
