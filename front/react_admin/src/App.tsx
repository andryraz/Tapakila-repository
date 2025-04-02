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
  ReferenceField
} from 'react-admin';
import { dataProvider } from './data-provider';

import authProvider from './authProvider';
//import MyLoginPage from './components/LoginPage/LoginPage';

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

export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
    <TextField source='id' />
      <TextField source='titre' />
      <DateField label="Date de l'evenement" source="dateHeure" />
      <TextField source='lieu' />
      <TextField source='statut' />
      <TextField source="statut" label="Statut de l'événement" />
      <ReferenceField source="organisateurId" reference="Utilisateur" label="Organisateur" />
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
        authProvider={authProvider}
    >
      <Resource name='evenements' list={EventList} show={EventShow} create={EventCreate} edit={EventEdit}/>
      <Resource name='billets' list={TicketList} show={TicketShow} create={TicketCreate} edit={TicketEdit} />
      <Resource name='utilisateurs' list={UserList} show={UserShow} create={UserCreate} edit={UserEdit}/>
     
    </Admin>
  );
};

export default App;