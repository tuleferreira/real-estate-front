export interface LoginState {
    authenticated: boolean;
    buttonDisabled: boolean;
    email: string;
    error: boolean;
    helperText: string;
    loading: boolean;
    password: string;
}

type LoginAction =
    | { type: SET_AI; payload: string }
    | { type: 'setPassword'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'loginSuccess'; payload: string }
    | { type: 'loginFailed'; payload: string }
    | { type: 'setIsError'; payload: boolean };
