import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from '../constants/ui.constants';
import { UIState } from '../types/ui.types';

const initialState: UIState = {
    errors: null,
    loading: false,
};

export default function (state = initialState, action: any): UIState {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                loading: false,
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
