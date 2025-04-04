// ReservationByEvent.tsx
import { useParams } from 'react-router-dom';
import { useGetList } from 'react-admin';
import { List, Datagrid, TextField, NumberField } from 'react-admin';

const ReservationByEvent = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetList('reservations', {
    pagination: { page: 1, perPage: 50 },
    sort: { field: 'id', order: 'DESC' },
    filter: { eventId: id },
  });

  if (isLoading) return <div>Chargement des réservations...</div>;

  return (
    <List resource="reservations" title={`Réservations de l'événement #${id}`} hasCreate={false}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="utilisateur.nom" label="Nom de l'utilisateur" />
        <NumberField source="quantite" />
      </Datagrid>
    </List>
  );
};

export default ReservationByEvent;
