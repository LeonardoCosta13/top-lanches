import { createContext, ReactNode, useState, useEffect } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClient';
import { toast } from 'react-toastify';
import axios from 'axios';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: String;
    email: String;
    password: String;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@toplanches.token')
        console.log("Erro")
        // Router.push('/')
    
        
    }
    catch{
        console.log('Erro ao deslogar.')
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {
       const { '@toplanches.token': token } = parseCookies();
        if(token){
            axios.get('/me').then( response => {
            const { id, name, email } = response.data;

            setUser({
                id,
                name,
                email
                })
            })
            .catch(() => {
                // se deu erro deslogamoso user.
                signOut();
            })
        }

    }, [])

    async function signIn({ email,password }: SignInProps){
        try{
            const response = await api.post('/session', {
                email, 
                password
            })
            // console.log(response.data);
            const { id, name, token } = response.data;

            setCookie(undefined, '@toplanches.token', token, {
                maxAge: 60 * 60 * 24 * 30,  // Vai espirar em 1 mÊs
                path: "/" // quais caminhos  terão acesso ao  cookie
            })
            setUser({
                id,
                name,
                email,
            })

            // Passar para proximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

            // Redirecionar o user para /dashboard
            Router.push('/dashboard')
            
        }
        catch(err){
            toast.error('Erro ao acessar!')
            console.log("ERRO AO ACESSAR", err);
        }
    }

    async function signUp({ name, email, password}: SignUpProps){
        try{
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success('Conta criada com sucesso!')

            Router.push('/')

        }
        catch(err){
            toast.error('Erro ao cadastrar!')
            console.log("Erro ao cadastrar!!!", err)
        }
    }


    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}