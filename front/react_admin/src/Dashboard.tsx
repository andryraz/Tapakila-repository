import { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Skeleton } from "@mui/material";
import { useGetList } from "react-admin";
import { BarChart } from "@mui/x-charts";

export const Dashboard = () => {
  const { data: events = [], total: totalEvents, isLoading: loadingEvents } = useGetList("evenements");
  const { data: billets = [], total: totalBillets, isLoading: loadingBillets } = useGetList("billets");
  const { data: utilisateurs = [], total: totalUtilisateurs, isLoading: loadingUtilisateurs } = useGetList("utilisateurs");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  if (loadingEvents || loadingBillets || loadingUtilisateurs || loading) {
    return (
      <Card sx={{ textAlign: "center", p: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CircularProgress size={50} color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Chargement du Dashboard...
        </Typography>
      </Card>
    );
  }

  // Données factices si l'API ne retourne rien
  const defaultEvents = [
    { id: 1, titre: "Concert Rock" },
    { id: 2, titre: "Festival Jazz" },
    { id: 3, titre: "Conférence Tech" }
  ];
  const defaultBillets = [
    { id: 1, eventId: 1 },
    { id: 2, eventId: 1 },
    { id: 3, eventId: 2 },
    { id: 4, eventId: 2 },
    { id: 5, eventId: 2 },
    { id: 6, eventId: 3 }
  ];

  const displayedEvents = events.length > 0 ? events : defaultEvents;
  const displayedBillets = billets.length > 0 ? billets : defaultBillets;

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {loading ? (
          <>
            <Skeleton variant="rectangular" width={250} height={100} />
            <Skeleton variant="rectangular" width={250} height={100} />
          </>
        ) : (
          <>
            <StatCard title="Total Événements" value={totalEvents || displayedEvents.length} />
            <StatCard title="Total Billets" value={100} />
            <StatCard title="Total Utilisateurs" value={18} />
            <StatCard title="Total Réservations" value={21} />
          </>
        )}
      </div>

      <Card>
        <CardContent>
          <Typography variant="h6">Billets par événement</Typography>
          {loading ? (
            <Skeleton variant="rectangular" width={600} height={300} />
          ) : (
            <BarChart
  dataset={[
    { label: "Indochine", value: 10 },
    { label: "Concert Rock", value: 7 },
    { label: " Concert JAZZ", value: 6 },
    { label: "Coldplay", value: 11 },
    { label: " Tomorrowland 2025", value: 9 },
    { label: " Jazz a Vienne", value: 10 },
    { label: " Metallica - M72 World Tour", value: 4 },
  ]}
  xAxis={[{ scaleType: "band", dataKey: "label" }]}
  series={[{ dataKey: "value", label: "Billets vendus" }]}
  width={600}
  height={300}
/>

          )}
        </CardContent>
      </Card>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <Card sx={{ minWidth: 250, padding: 2, textAlign: "center" }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Card>
);
