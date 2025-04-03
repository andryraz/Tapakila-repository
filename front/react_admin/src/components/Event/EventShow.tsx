import { Show, SimpleShowLayout, TextField, DateField, useRecordContext } from "react-admin";
import { Card, CardContent, Typography, CircularProgress, Switch } from "@mui/material";
import { ImageField } from "react-admin";
import { useEffect, useState } from "react";

export const EventShow = () => {
    const record = useRecordContext();
    const [billets, setBillets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (record?.id) {
            fetch(`http://localhost:5000/billets/${record.id}`)
                .then(response => response.json())
                .then(data => {
                    setBillets(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des billets :", error);
                    setLoading(false);
                });
        }
    }, [record?.id]);

    if (!record) return <CircularProgress />;

    return (
        <Show>
            <SimpleShowLayout>
                {/* Image de l'événement */}
                <ImageField 
                    source="image" 
                    title="titre" 
                    label="Image de l'événement" 
                    sx={{
                        width: "400px", 
                        height: "auto", 
                        position: "absolute",
                        top: 140, 
                        right: 20, 
                        overflow: "hidden", 
                    }}
                />

                {/* Détails de l'événement */}
                <TextField source="id" />
                <TextField source="titre" />
                <TextField source="description" />
                <DateField label="Date de l'événement" source="dateHeure" />
                <TextField source="lieu" />
                <TextField source="statut" label="Statut de l'événement" />
            </SimpleShowLayout>

            {/* Tableau des billets associés */}
            <Card sx={{ mt: 3, p: 2 }}>
                <CardContent>
                    <Typography variant="h6">Billets associés</Typography>

                    
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                            <thead>
                                <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
                                    <th style={{ padding: "10px" }}>ID</th>
                                    <th style={{ padding: "10px" }}>Type</th>
                                    <th style={{ padding: "10px" }}>Prix (€)</th>
                                    <th style={{ padding: "10px" }}>Disponibilité</th>
                                    <th style={{ padding: "10px" }}>Limite d'achat</th>
                                    <th style={{ padding: "10px" }}>Vente Active</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                    <tr  style={{ borderBottom: "1px solid #ddd" }}>
                                        <td style={{ padding: "10px" }}>test</td>
                                        <td style={{ padding: "10px" }}>test</td>
                                    </tr>
                            </tbody>
                        </table>
                   
                </CardContent>
            </Card>
        </Show>
    );
};
