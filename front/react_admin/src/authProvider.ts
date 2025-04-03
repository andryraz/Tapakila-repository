import { AuthProvider } from "react-admin";

const API_URL = "http://localhost:5000/auth";

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: username, motDePasse: password }),
        });

        if (!response.ok) {
            throw new Error("Email ou mot de passe incorrect");
        }

        const { token, user } = await response.json();

        localStorage.setItem("auth", JSON.stringify({ token, ...user }));
        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
    },

    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem("auth");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getIdentity: () => {
        const auth = localStorage.getItem("auth");
        if (!auth) return Promise.reject();

        const { id, nom, email } = JSON.parse(auth);
        return Promise.resolve({ id, fullName: nom || email });
    },

    getPermissions: () => {
        const auth = localStorage.getItem("auth");
        return auth ? Promise.resolve(JSON.parse(auth).role) : Promise.reject();
    },
};

export default authProvider;
