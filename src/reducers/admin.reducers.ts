import { SET_ADMIN, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_ADMIN } from '../constants/login.constants';
import { LoginState } from '../types/login.types';

const initialState: LoginState = {
    authenticated: false,
    buttonDisabled: true,
    email: '',
    error: false,
    helperText: '',
    loading: false,
    password: '',
};

export default function (state = initialState, action: any): LoginState {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...action.payload,
                ...state,
                authenticated: true,
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_ADMIN:
            return {
                ...action.payload,
                authenticated: true,
                loading: false,
            };
        case LOADING_ADMIN:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
