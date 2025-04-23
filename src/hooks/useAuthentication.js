import { db } from "../firebase/config";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

import { useState, useEffect, use } from "react";

export function useAuthentication() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

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

            return user;

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if(error.message.includes('Password')) {
                systemErrorMessage = 'Sua senha deve conter no mínimo 6 caracteres';
            } else if(error.message.includes('email-already')) {
                systemErrorMessage = 'Este e-mail já está cadastrado';
            } else {
                systemErrorMessage = 'Ocorreu um erro ao cadastrar, tente novamente mais tarde';
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading
    }
}