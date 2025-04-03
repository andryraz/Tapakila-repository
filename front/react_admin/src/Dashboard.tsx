import { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Skeleton } from "@mui/material";
import { useGetList } from "react-admin";
import { BarChart } from "@mui/x-charts";

export const Dashboard = () => {
  const { data: events, total: totalEvents, isLoading: loadingEvents } = useGetList("evenements");
  const { data: billets, total: totalBillets, isLoading: loadingBillets } = useGetList("billets");
  const { data: Utilisateurs, total: totalUtilisateurs, isLoading: loadingUtilisateurs } = useGetList("utilisateurs");

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
            <StatCard title="Total Événements" value={totalEvents} />
            <StatCard title="Total Billets" value={totalBillets} />
            <StatCard title="Total Utilisateurs" value={totalUtilisateurs} />
            <StatCard title="Total Reservations" value={totalEvents} />
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
              dataset={events?.map(event => ({
                label: event.titre,
                value: billets.filter(billet => billet.eventId === event.id).length,
              })) || []}
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
