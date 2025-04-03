import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login({ username: email, password });
        } catch (error) {
            notify("Identifiants incorrects", { type: "warning" });
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ width: 350, padding: 20 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Connexion
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Mot de passe"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
                            Se connecter
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
