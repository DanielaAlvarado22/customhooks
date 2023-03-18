import React, { FormEvent, useEffect, useReducer } from "react";
import { useState } from "react";
// @ts-ignore
import useForm from '../hooks/useForm.ts'

interface AuthState {
    validating: Boolean,
    isValid: Boolean,
    token: string | null,
    username: string,
    password: string
}

interface LoginPayload {
    username: string,
    password: string
}

type AuthAction =
    | { type: 'logout' }
    | { type: 'login', payload: LoginPayload }

const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'logout':
            return {
                ...state,
            }
        case 'login':
            const { username, password } = action.payload
            const user = { username: 'ponmkesito22', password: 'danonino' }

            if (username == user.username && password == user.password){
                return{ username, isValid: true, token: 'REACTRULES', validating:false }
            }else { return { ...state, isValid: false } }
            
        default:
            return state;
    }
}
const initialState: AuthState = {
    validating: false,
    isValid: true,
    token: null,
    username: '',
    password: ''
}

function Form() {
    const [state, handleChange] = useForm(initialState)
    const[{username, token, isValid}, dispatch] = useReducer(authReducer, initialState)
   
    //const [submitted, setSubmitted] = useState(false)

    const login = (e: FormEvent<HTMLFormElement>) =>{
        const payload ={ username: state.username, password: state.password}
        e.preventDefault()
        dispatch({ type: 'login', payload })
    }

    const logout = (e: FormEvent<HTMLFormElement>) => {

        dispatch({ type: 'logout' })
    }
    
     useEffect(() => {
        //isValid ? setSubmitted(true) : setSubmitted(true)

    }, [])

    return (
        <div>
            <form onSubmit={ login}>
                <label>Username</label>
                <input
                    type='text'
                    name='username'
                    value={state.username}
                    onChange={handleChange}
                />
                <br/>
                <label>Password</label>
                <input
                    type='text'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                />
                <br/>
                <input type='submit' value='login'></input>
        
            </form>
            <br/>
            <br />
            <br/>
            {/* {submitted && <h2> Validando credenciales...</h2>} */}
            { !isValid && <h1> Incorrect user or password! Try again</h1>}
            { token && isValid &&
                <div>
                   
                    <h1> Bienvenido {username}! </h1>
                    <input
                        type='submit'
                        name="logout"
                        value='logout'
                        onClick={logout}
                    />
                </div>
                
            }
        </div>
    )
}

export default Form
