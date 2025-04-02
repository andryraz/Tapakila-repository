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
} from 'react-admin';
import { dataProvider } from './data-provider';


//POSTS
export const PostList = () => (
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='titre' />
    </Datagrid>
  </List>
);

export const PostShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source='id' />
      <TextField source='title' />
      <RichTextField source='body' />
    </SimpleShowLayout>
  </Show>
);

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source='title' />
      <TextInput source='body' multiline={true} label='Short body' />
      <BooleanInput source='bool' label='Short body' />
      <NumberInput source='bool' label='Short body' />
    </SimpleForm>
  </Create>
);

export const PostEdit = () => (
  <Edit>
      <SimpleForm>
          <TextInput source="title" validate={required()} />
          <TextInput multiline source="body" validate={required()} label='Short body'/>
      </SimpleForm>
  </Edit>
);


//TODOS
export const TodoList = () => (
  <List>
      <Datagrid>
          <TextField source='id' />
          <TextField source='title' />
         
      </Datagrid>
  </List>
);

export const TodoShow = () => (
  <Show>
      <SimpleShowLayout>
          <TextField source='id' />
          <TextField source='title' />
         
      </SimpleShowLayout>
  </Show>
);

export const TodoCreate = () => (
  <Create>
      <SimpleForm>
          <TextInput source='title' validate={required()} />
         
      </SimpleForm>
  </Create>
);

export const TodoEdit = () => (
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
          <TextField source='name' />
          <TextField source='username' />
      </Datagrid>
  </List>
);

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source='id' />
      <TextField source='name' />
      <TextField source='username' />
      <TextField source='phone' />
      <TextField source='address.street' label="Street" />
      <TextField source='company.name' label="Company" />
    </SimpleShowLayout>
  </Show>
);

export const UserCreate = () => (
  <Create>
      <SimpleForm>
          <TextInput source='name' validate={required()} />
          <TextInput source='username' validate={required()} />
          <TextInput source='phone' validate={required()} />
          <TextInput source='address.street' validate={required()} />
          <TextInput source='company.name' validate={required()} />
      </SimpleForm>
  </Create>
);

export const UserEdit = () => (
  <Edit>
      <SimpleForm>
          <TextInput source='name' validate={required()} />
          <TextInput source='username' validate={required()} />
          <TextInput source='phone' validate={required()} />
          <TextInput source='address.street' validate={required()} />
          <TextInput source='company.name' validate={required()} />
      </SimpleForm>
  </Edit>
);


// export const authProvider: AuthProvider = {
//   // send username and password to the auth server and get back credentials
//   //async login(params) {/** ... **/},
//   // when the dataProvider returns an error, check if this is an authentication error
//   //async checkError(error) {/** ... **/},
//   // when the user navigates, make sure that their credentials are still valid
//  login: async function (params: any): Promise{},
//  const access token 
//   // remove local credentials and notify the auth server that the user logged out
//   //async logout() {/** ... **/},
//   // get the user's profile
//   //async getIdentity() {/** ... **/},
//   // check whether users have the right to perform an action on a resource (optional)
//   //async canAccess() {/** ... **/},
// };


const App = () => {
  return (
    <Admin  dataProvider={dataProvider}>
      <Resource name='posts' list={PostList} show={PostShow} create={PostCreate} edit={PostEdit}/>
      <Resource name='todos' list={TodoList} show={TodoShow} create={TodoCreate} edit={TodoEdit} />
      <Resource name='users' list={UserList} show={UserShow} create={UserCreate} edit={UserEdit}/>
     
    </Admin>
  );
};

export default App;