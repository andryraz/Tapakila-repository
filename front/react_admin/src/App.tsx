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
  Layout
} from 'react-admin';
import { dataProvider } from './data-provider';
import authProvider from './authProvider';
import { Dashboard } from './Dashboard';
import { createTheme } from '@mui/material';
import { defaultTheme } from 'react-admin';
import LoginPage from './components/LoginPage/LoginPage';
import { BilletsList } from './BilletsList';
import { TypesBilletsList } from './TypesBilletsList';
import { Route, useParams } from 'react-router-dom';
import UserIcon from '@mui/icons-material/People';
import EventIcon from "@mui/icons-material/Event";
import { MyLayout } from './MyLayout';
import ConfirmationNumberIcon from "@mui/icons-material/Label";
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
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='titre' />
      <DateField label="Date de l'evenement" source="dateHeure" />
      <TextField source='lieu' />
      <TextField source='statut' />
    </Datagrid>
  </List>
);

const OrganisateurField = () => {
  const record = useRecordContext();
  if (!record || !record.organisateur) return null;
  
  return <span>{record.organisateur.nom} ({record.organisateur.email})</span>;
};
export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
    
        <ImageField source="image" title="titre" label="Image de l'événement" 
        sx={{
          width: "400px", 
          height: "auto", 
          position: "absolute",
          top: 140, 
          right: 20, 
          overflow: "hidden", 
        }}
        />
    <TextField source='id' />
      <TextField source='titre' />
      <DateField label="Date de l'evenement" source="dateHeure" />
      <TextField source='lieu' />    
      <TextField source="statut" label="Statut de l'événement" />
      <OrganisateurField label="Organisateur" />
     
    </SimpleShowLayout>
  </Show>
);

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source='title' />
      <TextInput source='body' multiline={true} label='Short body' />
      <BooleanInput source='bool' label='Short body' />
      <NumberInput source='bool' label='Short body' />
    </SimpleForm>
  </Create>
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput multiline source="body" validate={required()} label='Short body' />
    </SimpleForm>
  </Edit>
);


//billets
export const TicketList = () => (
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='prix' />
      <TextField source='type' />
      <TextField source='evenementId' />
    </Datagrid>
  </List>
);

export const TicketShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source='id' />
      <TextField source='type' />
      <TextField source='disponibilite' />
    </SimpleShowLayout>
  </Show>
);

export const TicketCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source='title' validate={required()} />

    </SimpleForm>
  </Create>
);

export const TicketEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source='title' validate={required()} />

    </SimpleForm>
  </Edit>
);

//USERS
export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='nom' />
      <TextField source='role' />
    </Datagrid>
  </List>
);

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source='id' />
      <TextField source='nom' />
      <TextField source='email' />
      <TextField source='role' />
      <DateField label="Date de creation" source="dateCreation" />
    </SimpleShowLayout>
  </Show>
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
  <Edit>
    <SimpleForm>
      <TextInput source='nom' validate={required()} />
      <TextInput source='email' validate={required()} />
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
      <Resource name='billets' list={TicketList} show={TicketShow} create={TicketCreate} edit={TicketEdit} icon={ConfirmationNumberIcon}/>
      <Resource name='utilisateurs' list={UserList} show={UserShow} create={UserCreate} edit={UserEdit} icon={UserIcon}/>
     
    </Admin>
  );
};

export default App;