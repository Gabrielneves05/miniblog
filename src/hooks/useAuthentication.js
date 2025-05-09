import { db, auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

import { useState, useEffect } from "react";

export function useAuthentication() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const [cancelled, setCancelled] = useState(false);

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

    // Register
    const createUser = async data => {
        checkIfIsCancelled();

        setLoading(true);

        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return { user };

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if(error.message.includes('Password')) {
                systemErrorMessage = 'Sua senha deve conter no mínimo 6 caracteres!';
            } else if(error.message.includes('email-already')) {
                systemErrorMessage = 'Este e-mail já está cadastrado!';
            } else {
                systemErrorMessage = 'Ocorreu um erro ao cadastrar, tente novamente mais tarde!';
            }

            setLoading(false);
            setError(systemErrorMessage);

            return { error: systemErrorMessage };
        }
    }

    // Sign out
    const logout = async () => {
        checkIfIsCancelled();

        signOut(auth);
    }

    // Sign in
    const login = async data => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
            return { success: true };
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes('auth/invalid-credential')) {
                systemErrorMessage = 'Credenciais inválidas';
            } else {
                systemErrorMessage = 'Ocorreu um erro ao fazer login, tente novamente mais tarde';
            }

            setError(systemErrorMessage);
            setLoading(false);

            return { error: systemErrorMessage };
        }
    };


    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
}