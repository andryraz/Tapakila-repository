import {
  Admin,
  Create,
  List,
  Edit,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextInput,
  TextField,
  DateInput,
  DateField,
  Datagrid,
  required,
  Resource,
  FileInput,
  FileField,
  CustomRoutes,
  useRecordContext,
  useGetManyReference,
  ImageField,
} from 'react-admin';
import { dataProvider } from './data-provider';
import authProvider from './authProvider';
import { Dashboard } from './Dashboard';
import { createTheme } from '@mui/material';
import LoginPage from './components/LoginPage/LoginPage';
import UserIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import TicketIcon from '@mui/icons-material/ConfirmationNumber';
import { Route } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Chip,
} from '@mui/material';
import ReservationByEvent from './components/ReservationPage/ReservationByEvent';
import { ReservationListByEvenement } from './components/ReservationPage/ReservationListByEvenement';

// Thème minimaliste
const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#3f4245' },
    background: { default: '#fafafa' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 8 }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: { 
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { 
          borderRadius: 6,
          textTransform: 'none',
        }
      }
    }
  }
});

// Status avec Chip pour réutilisation
const StatusChip = ({ value }) => {
  if (!value) return null;
  const colors = {
    actif: 'success',
    publié: 'success',
    complet: 'primary',
    terminé: 'primary',
    annulé: 'error',
    reporté: 'warning',
  };
  return <Chip label={value} color={colors[value.toLowerCase()] || 'default'} size="small" />;
};

// Liste d'événements simplifiée
export const EventList = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>Événements</Typography>
    <List>
      <Datagrid rowClick="show">
        <TextField source="titre" />
        <DateField source="dateHeure" />
        <TextField source="lieu" />
        <TextField source="statut" render={record => <StatusChip value={record.statut} />} />
      </Datagrid>
    </List>
  </Box>
);

// Affichage des détails d'événement simplifié
export const EventShow = () => {
  const eventId = 1; // ID d'exemple, à rendre dynamique si nécessaire
  const { data: billets, isLoading, error } = useGetManyReference('billets', {
    target: 'evenementId',
    id: eventId,
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  const record = useRecordContext();

  return (
    <Show>
      <SimpleShowLayout>
        {/* Affichage de l'image de l'événement */}
        <ImageField source="image" label="Image de l'événement" />
        
        {/* Affichage des informations principales */}
        <TextField source="titre" label="Titre de l'événement" />
        <TextField source="lieu" label="Lieu" />
        <DateField source="dateHeure" label="Date" />
        <TextField source="categorie" label="Catégorie" />

        {/* Affichage de l'organisateur si présent */}
        {record?.organisateur && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Organisateur : {record.organisateur.nom} ({record.organisateur.email})
          </Typography>
        )}

        {/* Section pour afficher les billets */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Billets disponibles</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Prix (€)</TableCell>
                  <TableCell>Disponibilité</TableCell>
                  <TableCell>Limite d'achat</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billets?.map(billet => (
                  <TableRow key={billet.id}>
                    <TableCell>{billet.type}</TableCell>
                    <TableCell>{billet.prix}</TableCell>
                    <TableCell>{billet.disponibilite}</TableCell>
                    <TableCell>{billet.limiteAchat}</TableCell>
                    <TableCell>
                    <Chip 
                      label={billet.venteActive ? "Actif" : "Inactif"} 
                      color={billet.venteActive ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
// Création d'événement
export const EventCreate = () => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  return (
    <Create>
      <SimpleForm defaultValues={{ organisateurId: auth.id }}>
        <TextInput source="titre" validate={required()} fullWidth />
        <TextInput multiline source="description" validate={required()} rows={3} fullWidth />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextInput source="categorie" validate={required()} sx={{ flex: 1 }} />
          <TextInput source="lieu" validate={required()} sx={{ flex: 1 }} />
        </Box>
        <DateInput source="dateHeure" validate={required()} />
        <TextInput source="image" validate={required()} fullWidth />
      </SimpleForm>
    </Create>
  );
};

// Edition d'événement
export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="titre" validate={required()} fullWidth />
      <TextInput multiline source="description" validate={required()} rows={3} fullWidth />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextInput source="categorie" validate={required()} sx={{ flex: 1 }} />
        <TextInput source="lieu" validate={required()} sx={{ flex: 1 }} />
      </Box>
      <DateInput source="dateHeure" validate={required()} />
      <FileInput source="image" validate={required()}>
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);

// Liste d'utilisateurs
export const UserList = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h5" sx={{ mb: 3, color: 'primary.main' }}>Utilisateurs</Typography>
    <List>
      <Datagrid rowClick="show">
        <TextField source="nom" />
        <TextField source="email" />
        <TextField source="role" render={record => (
          <Chip 
            label={record.role} 
            color={record.role === 'Admin' ? 'primary' : record.role === 'Organisateur' ? 'secondary' : 'default'}
            size="small"
          />
        )} />
      </Datagrid>
    </List>
  </Box>
);

// Affichage des détails d'utilisateur
export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="nom" sx={{ fontSize: '1.25rem', fontWeight: 500 }} />
      <TextField source="email" />
      <TextField source="role" render={record => (
        <Chip 
          label={record.role} 
          color={record.role === 'Admin' ? 'primary' : record.role === 'Organisateur' ? 'secondary' : 'default'}
        />
      )} />
      <DateField source="dateCreation" />
    </SimpleShowLayout>
  </Show>
);

// Création d'utilisateur
export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="nom" validate={required()} fullWidth />
      <TextInput source="email" validate={required()} fullWidth />
      <TextInput source="role" validate={required()} />
    </SimpleForm>
  </Create>
);

// Edition d'utilisateur
export const UserEdit = () => (
  <Edit title="Mise à jour du rôle">
    <SimpleForm>
      <TextInput source="role" validate={required()} />
    </SimpleForm>
  </Edit>
);

const App = () => (
  <Admin
    dataProvider={dataProvider}
    theme={theme}
    authProvider={authProvider}
    dashboard={Dashboard}
    loginPage={LoginPage}
    disableTelemetry
  >
    <Resource
      name="evenements"
      list={EventList}
      show={EventShow}
      create={EventCreate}
      edit={EventEdit}
      icon={EventIcon}
      options={{ label: 'Événements' }}
    />
    <Resource
      name="utilisateurs"
      list={UserList}
      show={UserShow}
      create={UserCreate}
      edit={UserEdit}
      icon={UserIcon}
    />
    <Resource 
      name="reservations" 
      list={ReservationListByEvenement}
      icon={TicketIcon}
    />
    <CustomRoutes>
      <Route path="/reservations/:id" element={<ReservationByEvent />} />
    </CustomRoutes>
  </Admin>
);

export default App;