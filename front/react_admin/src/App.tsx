import
 { Admin,
  AuthProvider,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  NumberInput,
  ReferenceManyField,
  required,
  Resource,
  RichTextField,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext,
  ReferenceField,
  ImageField,
  useSidebarState,
  Menu,
  Layout,
  NumberField,
  SelectInput,
  useGetList,
  FileInput,
  FileField,
  CustomRoutes
} from 'react-admin';
import { dataProvider } from './data-provider';
import authProvider from './authProvider';
import { Dashboard } from './Dashboard';
import { createTheme } from '@mui/material';
import { defaultTheme } from 'react-admin';
import LoginPage from './components/LoginPage/LoginPage';
import UserIcon from '@mui/icons-material/People';
import EventIcon from "@mui/icons-material/Event";
import ConfirmationNumberIcon from "@mui/icons-material/Label";
import { useGetManyReference } from 'react-admin'; // Utilisation de la méthode getManyReference
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ReservationEventSelector from './components/ReservationPage/ReservationEventSelector';
import ReservationByEvent from './components/ReservationPage/ReservationByEvent';
import { Route } from 'react-router-dom';
import { ReservationListByEvenement } from './components/ReservationPage/ReservationListByEvenement';
//import MyLoginPage from './components/LoginPage/LoginPage';

//theme
const myTheme = createTheme({
  ...defaultTheme,
  palette: {
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#3f4245', 
    },
    background: {
      default: '#f4f6f8', 
      paper: '#ffffff', 
    },
  },
});

//event
export const EventList = () => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h4" gutterBottom>
      Liste des événements
    </Typography>

    {/* Tableau des événements */}
    <Paper sx={{ padding: 2 }}>
      <List>
        <Datagrid rowClick="show">
          <TextField 
            source="titre" 
            label="Titre de l'événement" 
            sx={{ fontWeight: 'bold', color: '#556c85' }} 
          />
          <DateField 
            label="Date de l'événement" 
            source="dateHeure" 
            sx={{ fontWeight: 'bold', color: '#556c85' }} 
          />
          <TextField 
            source="lieu" 
            label="Lieu" 
            sx={{ fontWeight: 'bold', color: '#556c85' }} 
          />
          <TextField 
            source="statut" 
            label="Statut" 
            sx={{ fontWeight: 'bold', color: '#556c85' }} 
          />
        </Datagrid>
      </List>
    </Paper>
  </Box>
);


const OrganisateurField = () => {
  const record = useRecordContext();
  if (!record || !record.organisateur) return null;
  
  return <span>{record.organisateur.nom} ({record.organisateur.email})</span>;
};


export const EventShow = () => {
  const eventId = 1; // ID de l'événement, à récupérer dynamiquement si nécessaire
  
  const { data: billets, total, isLoading, error } = useGetManyReference('billets', {
    target: 'evenementId',  // La clé de référence qui relie les billets à l'événement
    id: eventId, // ID de l'événement pour filtrer les billets
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="titre" label="Titre de l'événement" />
        <TextField source="lieu" label="Lieu de l'événement" />
        <DateField source="dateHeure" label="Date de l'événement" />
        <TextField source="categorie" label="Categorie de l'événement" />
        <OrganisateurField label="Organisateur"/>
        {/* Titre avant le tableau */}
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="#556c85" sx={{ fontWeight: 'bold' }}>
            Billets associés
          </Typography>
        </Box>

        {/* Tableau des billets associés */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Type de billet</strong></TableCell>
                <TableCell><strong>Prix (€)</strong></TableCell>
                <TableCell><strong>Disponibilité</strong></TableCell>
                <TableCell><strong>Limite d'achat</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billets?.map(billet => (
                <TableRow key={billet.id}>
                  <TableCell>{billet.type}</TableCell>
                  <TableCell>{billet.prix}</TableCell>
                  <TableCell>{billet.disponibilite}</TableCell>
                  <TableCell>{billet.limiteAchat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SimpleShowLayout>
    </Show>
  );
};

export const EventCreate = () => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const organisateurId = auth.id;  // Récupère l'ID de l'utilisateur connecté
  console.log("Id organisateur:"+ organisateurId)
  return (
      <Create>
          <SimpleForm defaultValues={{ organisateurId }}>
              <TextInput source="titre" validate={required()} />
              <TextInput multiline source="description" validate={required()} />
              <TextInput source="categorie" validate={required()} />
              <TextInput source="lieu" validate={required()} />
              <TextInput source="image" validate={required()} />
              <DateInput source="dateHeure" label="Date de l'événement" validate={required()} />
          </SimpleForm>
      </Create>
  );
};

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="titre" validate={required()} />
      <TextInput multiline source="description" validate={required()} label="Short body" />
      <TextInput source="categorie" validate={required()} />
      <TextInput source="lieu" validate={required()} />
      <DateInput source="dateHeure" label="Date de l'événement" validate={required()} />
       <FileInput source="image" label="Image de l'événement" validate={required()}>
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);

//billets
// export const ReservationList = () => (
//   <List>
//     <Datagrid>
//       <TextField source='id' />
//       <TextField source='dateReservation' />
//     </Datagrid>
//   </List>
// );

// export const ReservationShow = () => (
//   <Show>
//     <SimpleShowLayout>
//       <TextField source='id' />
//       <TextField source='type' />
//       <TextField source='disponibilite' />
//     </SimpleShowLayout>
//   </Show>
// );

// export const ReservationCreate = () => (
//   <Create>
//     <SimpleForm>
//       <TextInput source='title' validate={required()} />

//     </SimpleForm>
//   </Create>
// );

// export const ReservationEdit = () => (
//   <Edit>
//     <SimpleForm>
//       <TextInput source='title' validate={required()} />

//     </SimpleForm>
//   </Edit>
// );

//USERS
export const UserList = () => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h4" gutterBottom>
      Liste des utilisateurs
    </Typography>

    {/* Tableau des utilisateurs */}
    <Paper sx={{ padding: 2 }}>
      <List>
        <Datagrid rowClick="show">
          <TextField 
            source="nom" 
            label="Nom" 
            sx={{ fontWeight: 'bold', color: '#556c85' }} 
          />
          <TextField 
            source="role" 
            label="Rôle" 
            sx={{ fontWeight: 'bold', color: '#556c85' }} 
          />
        </Datagrid>
      </List>
    </Paper>
  </Box>
);


export const UserShow = () => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h4" gutterBottom>
      Détails de l'utilisateur
    </Typography>

    {/* Conteneur Paper pour le formulaire */}
    <Paper sx={{ padding: 3 }}>
      <Show>
        <SimpleShowLayout>
          <TextField 
            source="nom" 
            label="Nom" 
            sx={{ fontWeight: 'bold', color: '#556c85', marginBottom: 2 }} 
          />
          <TextField 
            source="email" 
            label="Email" 
            sx={{ fontWeight: 'bold', color: '#556c85', marginBottom: 2 }} 
          />
          <TextField 
            source="role" 
            label="Rôle" 
            sx={{ fontWeight: 'bold', color: '#556c85', marginBottom: 2 }} 
          />
          <DateField 
            label="Date de création" 
            source="dateCreation" 
            sx={{ fontWeight: 'bold', color: '#556c85', marginBottom: 2 }} 
          />
        </SimpleShowLayout>
      </Show>
    </Paper>
  </Box>
);
export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source='nom' validate={required()} />
      <TextInput source='email' validate={required()} />
      <TextInput source='role' validate={required()} />
    </SimpleForm>
  </Create>
);

export const UserEdit = () => (
  <Edit title="Mise à jour du rôle">
    <SimpleForm>
      <TextInput source='role' validate={required()} />
    </SimpleForm>
  </Edit>
);



const App = () => {
  return (
    <Admin  dataProvider={dataProvider}
        theme={myTheme}
        authProvider={authProvider}
        dashboard={Dashboard}
        loginPage={LoginPage}
    >
      <Resource name='evenements' list={EventList} show={EventShow} create={EventCreate} edit={EventEdit} icon={EventIcon} />
      <Resource name='utilisateurs' list={UserList} show={UserShow} create={UserCreate} edit={UserEdit} icon={UserIcon}/>
      <Resource name="reservations" list={ReservationListByEvenement} />
  <CustomRoutes>
    <Route path="/reservations/:id" element={<ReservationByEvent />} />
  </CustomRoutes>
     
    </Admin>
  
)};

export default App;