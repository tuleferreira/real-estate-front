type LoginAction =
    | { type: 'SET_ADMIN'; payload: string }
    | { type: 'SET_UNAUTHENTICATED'; payload: string }
    | { type: 'SET_ADMIN'; payload: boolean }
    | { type: 'LOADING_ADMIN'; payload: string };
