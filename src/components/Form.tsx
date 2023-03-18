import React, { FormEvent, useEffect, useReducer } from "react";
import { useState } from "react";
// @ts-ignore
import useForm from '../hooks/useForm.ts'

interface AuthState {
    validating: Boolean,
    isOkay: Boolean,
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
                ...initialState,
            }
        case 'login':
            const { username, password } = action.payload
            const user = { username: 'ponmkesito22', password: 'danonino' }

            if (username == user.username && password == user.password){
                return{ username, isOkay: true, token: 'REACTRULES', validating:false }
            }else { return { ...initialState, isOkay: false } }
            
        default:
            return state;
    }
}
const initialState: AuthState = {
    validating: false,
    isOkay: true,
    token: null,
    username: '',
    password: ''
}

function Form() {
    const [state, handleChange] = useForm(initialState)
    const[{username, token, isOkay}, dispatch] = useReducer(authReducer, initialState)
   
    

    const login = (e: FormEvent<HTMLFormElement>) =>{
        const payload ={ username: state.username, password: state.password}
        e.preventDefault()
        dispatch({ type: 'login', payload })
    }

    const logout = (e: FormEvent<HTMLFormElement>) => {

        dispatch({ type: 'logout' })
    }
    
     useEffect(() => {
        

    }, [])

    return (
        <div className='card'>
            <form onSubmit={ login}>
                <label>Username</label>
                <br></br>
                <input
                    type='text'
                    name='username'
                    value={state.username}
                    onChange={handleChange}
                />
                <br/>
                <label>Password</label>
                <br></br>
                <input
                    type='password'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                />
                <br></br>
                <br/>
                <input className='button' type='submit' value='Login'></input>
        
            </form>
            <br/>
            <br />
            <br/>
            
            { !isOkay && <h1 className='textOut'> Creedenciales incorrectas, intenta otra vez .｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡. </h1>}
            { token && isOkay &&
                <div>
                   
                    <h1 className='text'> El usuario {username} ha iniciado sesión ＼(＾O＾)／ </h1>
                    <input
                        className='buttonOut'
                        type='submit'
                        name="logout"
                        value='Logout'
                        onClick={logout}

                    />
                </div>
                
            }
        </div>
    )
}

export default Form
