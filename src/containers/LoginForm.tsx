import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useReducer, useEffect, ReactElement } from 'react';

import { LoginState } from '../types/login.types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            marginTop: theme.spacing(10),
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: `${theme.spacing(0)} auto`,
            width: 400,
        },
        header: {
            background: '#212121',
            color: '#fff',
            textAlign: 'center',
        },
        loginBtn: {
            flexGrow: 1,
            marginTop: theme.spacing(2),
        },
    }),
);

const initialState: LoginState = {
    email: '',
    helperText: '',
    isButtonDisabled: true,
    isError: false,
    password: '',
};

type Action =
    | { type: 'setEmail'; payload: string }
    | { type: 'setPassword'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'loginSuccess'; payload: string }
    | { type: 'loginFailed'; payload: string }
    | { type: 'setIsError'; payload: boolean };

const LoginForm = (): ReactElement => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.email.trim() && state.password.trim()) {
            dispatch({
                payload: false,
                type: 'setIsButtonDisabled',
            });
        } else {
            dispatch({
                payload: true,
                type: 'setIsButtonDisabled',
            });
        }
    }, [state.email, state.password]);

    const handleLogin = async () => {
        const requestOptions = {
            body: JSON.stringify({ email: state.email, password: state.password }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        };

        const response = await fetch('/admin/login', requestOptions);

        if (response.status === 200) {
            dispatch({
                payload: 'Sucesso!',
                type: 'loginSuccess',
            });
        } else {
            dispatch({
                payload: await response.text(),
                type: 'loginFailed',
            });
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            payload: event.target.value,
            type: 'setEmail',
        });
    };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            payload: event.target.value,
            type: 'setPassword',
        });
    };

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Login" />
                <CardContent>
                    <div>
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            onChange={handleEmailChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Senha"
                            placeholder="Senha"
                            margin="normal"
                            helperText={state.helperText}
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.loginBtn}
                        onClick={handleLogin}
                        disabled={state.isButtonDisabled}
                    >
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default LoginForm;
