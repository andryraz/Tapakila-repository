// ReservationEventSelector.tsx
import { useNavigate } from 'react-router-dom';
import { useDataProvider, useGetList } from 'react-admin';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

const ReservationEventSelector = () => {
  const { data, isLoading } = useGetList('evenements', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'dateHeure', order: 'DESC' },
  });

  const navigate = useNavigate();

  if (isLoading) return <div>Chargement des événements...</div>;

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Sélectionnez un événement pour voir les réservations</Typography>
      {data?.map((event) => (
        <Card key={event.id}>
          <CardContent>
            <Typography variant="h6">{event.titre}</Typography>
            <Typography>{event.dateHeure}</Typography>
            <Button variant="contained" onClick={() => navigate(`/reservations/${event.id}`)}>
              Voir les réservations
            </Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ReservationEventSelector;
