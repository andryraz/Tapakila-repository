// src/admin/reservations/ReservationListByEvenement.tsx

import { useEffect, useState } from "react";
import {
  useGetList,
  useListContext,
  ListBase,
  Datagrid,
  TextField,
  DateField,
  NumberField,
} from "react-admin";

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";

export const ReservationListByEvenement = () => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { data: events, isLoading } = useGetList('evenements');

  // 🎯 Sélectionner automatiquement le 1er événement dès que les données sont disponibles
  useEffect(() => {
    if (!isLoading && events && events.length > 0 && !selectedEventId) {
      setSelectedEventId(String(events[0].id));
    }
  }, [isLoading, events]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedEventId(event.target.value);
  };

  if (isLoading) {
    return (
      <Box p={2} display="flex" alignItems="center">
        <CircularProgress size={20} sx={{ mr: 1 }} />
        <Typography>Chargement des événements...</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Sélectionner un événement
      </Typography>

      <FormControl fullWidth sx={{ maxWidth: 400 }}>
        <InputLabel id="event-select-label">Événement</InputLabel>
        <Select
          labelId="event-select-label"
          value={selectedEventId ?? ''}
          label="Événement"
          onChange={handleChange}
        >
          {events?.map((event) => (
            <MenuItem key={event.id} value={String(event.id)}>
              {event.titre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedEventId && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Réservations pour l'événement #{selectedEventId}
          </Typography>
          <ListBase
            resource="reservations"
            filter={{ eventId: selectedEventId }}
            perPage={10}
          >
            <ReservationDataGrid />
          </ListBase>
        </Box>
      )}
    </Box>
  );
};

const ReservationDataGrid = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) return <div>Chargement des réservations...</div>;
  if (!data || data.length === 0) return <div>Aucune réservation trouvée.</div>;

  return (
    <Datagrid>
      <DateField source="dateReservation" label="Date de reservation"/>
      <TextField source="utilisateur.nom" label="Nom de l'organisateur" />
      <TextField source="utilisateur.email" label="Email de l'organisateur" />
      <TextField source="evenement.titre" label="Événement reservé" />
      <TextField source="billetsReserves[0].billet.type" label="Billet reservé" />
      <NumberField source="billetsReserves[0].quantite" label="Quantité reservé " /> 
    </Datagrid>
  );
};
