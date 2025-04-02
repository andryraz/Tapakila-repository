// src/authProvider.ts
import { AuthProvider } from 'react-admin';

interface User {
    username: string;
    password: string;
    role: string;
}

const users: User[] = [
    { username: "admin1", password: "password123", role: "admin" },
    { username: "admin2", password: "password123", role: "admin" }
];

const authProvider: AuthProvider = {
    login: async ({ username, password }: { username: string; password: string }) => {
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return Promise.reject(new Error("Invalid credentials"));
        }

        localStorage.setItem("auth", JSON.stringify(user));
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

    getIdentity: async () => {
        const auth = localStorage.getItem("auth");
        if (!auth) return Promise.reject();

        const { username, role } = JSON.parse(auth);
        return Promise.resolve({ id: username, fullName: username, role });
    },

    getPermissions: async () => {
        const auth = localStorage.getItem("auth");
        return auth ? Promise.resolve(JSON.parse(auth).role) : Promise.reject();
    }
};

export default authProvider;
