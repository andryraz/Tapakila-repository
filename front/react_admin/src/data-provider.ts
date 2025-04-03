import {
  CreateParams,
  CreateResult,
  DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, fetchUtils, GetListParams,
  GetListResult, GetOneParams,
  GetOneResult,
  Identifier,
  QueryFunctionContext,
  RaRecord,
  UpdateParams,
  UpdateResult
} from 'react-admin';


export const dataProvider: DataProvider = {
  getList: async function <RecordType extends RaRecord = any>(
      resource: string,
      params: GetListParams & QueryFunctionContext
  ): Promise<GetListResult<RecordType>> {
      let apiUrl;

      switch (resource) {
          case 'evenements':
              apiUrl = 'http://localhost:5000/evenements/admin';
              break;
          case 'billets':
              apiUrl = 'http://localhost:5000/billets/1';
              break;
          case 'utilisateurs':
              apiUrl = 'http://localhost:5000/utilisateurs';
              break;
          default:
              throw new Error(`Resource ${resource} is not supported`);
      }

      const data = await fetch(apiUrl, { method: 'GET' });
     const { pagination } = params;
      const { page = 1, perPage = 10 } = pagination || {};
      const offset = (page - 1) * perPage;
      const items = await data.json();
      const pageNumber = items.length / perPage;

      const result: GetListResult = {
          data: items.slice(offset, offset + perPage),
          total: items.length,
          pageInfo: {
              hasNextPage: page < pageNumber,
              hasPreviousPage: page !== 1,
          },
      };

      return result;
  },


  getOne: async function <RecordType extends RaRecord = any>(
      resource: string,
      params: GetOneParams<RecordType> & QueryFunctionContext
  ): Promise<GetOneResult<RecordType>> {
      let apiUrl;

      switch (resource) {
          case 'evenements':
              apiUrl = `http://localhost:5000/evenements/${params.id}`;
              break;
          case 'billets':
              apiUrl = `http://localhost:5000/billets/${params.id}`;
              break;
          case 'utilisateurs':
              apiUrl = `http://localhost:5000/utilisateurs/${params.id}`;
              break;
          default:
              throw new Error(`Resource ${resource} is not supported`);
      }
      const data = await fetch(apiUrl, { method: 'GET' });

      const result: GetOneResult = {
          data: await data.json(),
      };

      return result;
  },


  create: async function <RecordType extends Omit<RaRecord, 'id'> = any, ResultRecordType extends RaRecord = RecordType & { id: Identifier }>(
      resource: string,
      params: CreateParams
  ): Promise<CreateResult<ResultRecordType>> {
      let apiUrl;

      switch (resource) {
        case 'evenements':
            apiUrl = `http://localhost:5000/evenements`;
            break;
        case 'billets':
            apiUrl = `http://localhost:5000/billets`;
            break;
        case 'utilisateurs':
            apiUrl = `http://localhost:5000/utilisateurs`;
            break;
        default:
            throw new Error(`Resource ${resource} is not supported`);
    }
      const { data } = params;
      const createdItem = await fetch(apiUrl, { method: 'POST', body: JSON.stringify(data) });

      const result: CreateResult = {
          data: await createdItem.json(),
      };

      return result;
  },


  delete: async function <RecordType extends RaRecord = any>(
      resource: string,
      params: DeleteParams
  ): Promise<DeleteResult<RecordType>> {
      let apiUrl;

      switch (resource) {
        case 'evenements':
            apiUrl = `http://localhost:5000/evenements/${params.id}`;
            break;
        case 'billets':
            apiUrl = `http://localhost:5000/billets/${params.id}`;
            break;
        case 'utilisateurs':
            apiUrl = `http://localhost:5000/utilisateurs/${params.id}`;
            break;
        default:
            throw new Error(`Resource ${resource} is not supported`);
    }
      const response = await fetch(apiUrl, {
          method: 'DELETE',
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Erreur lors de la suppression de l'élément ${params.id}`);
      }

      const result: DeleteResult<RecordType> = {
          data: { id: params.id } as unknown as RecordType,
      };

      return result;
  },




//   deleteMany: async function <RecordType extends RaRecord = any>(
//       resource: string,
//       params: DeleteManyParams
//   ): Promise<DeleteManyResult<RecordType>> {
//       let apiUrlBase;

//       switch (resource) {
//           case 'posts':
//               apiUrlBase = 'https://jsonplaceholder.typicode.com/posts';
//               break;
//           case 'todos':
//               apiUrlBase = 'https://jsonplaceholder.typicode.com/todos';
//               break;
//           case 'albums':
//               apiUrlBase = 'https://jsonplaceholder.typicode.com/albums';
//               break;
//           default:
//               throw new Error(`Resource ${resource} is not supported`);
//       }
//       const { ids } = params;

//       try {
//           const promises = ids.map(id =>
//               fetch(`${apiUrlBase}/${id}`, { method: 'DELETE' })
//           );

//           const responses = await Promise.all(promises);
//           const allOk = responses.every(response => response.ok);

//           if (!allOk) {
//               throw new Error("Erreur lors de la suppression de plusieurs éléments.");
//           }

//           const result: DeleteManyResult<RecordType> = {
//               data: ids as unknown as RecordType[],
//           };

//           return result;
//       } catch (error) {
//           console.error("Erreur lors de la suppression de plusieurs éléments :", error);
//           throw error;
//       }
//   },

//   update: async function <RecordType extends RaRecord = any>(
//       resource: string,
//       params: UpdateParams
//   ): Promise<UpdateResult<RecordType>> {
//       let apiUrl;

//       switch (resource) {
//           case 'posts':
//               apiUrl = `https://jsonplaceholder.typicode.com/posts/${params.id}`;
//               break;
//           case 'todos':
//               apiUrl = `https://jsonplaceholder.typicode.com/todos/${params.id}`;
//               break;
//           case 'albums':
//               apiUrl = `https://jsonplaceholder.typicode.com/albums/${params.id}`;
//               break;
//           default:
//               throw new Error(`Resource ${resource} is not supported`);
//       }
//       const { id, data } = params;
//       const response = await fetch(apiUrl, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || `Erreur lors de la mise à jour de l'élément ${id}`);
//       }

//       const updatedRecord = await response.json();

//       const result: UpdateResult<RecordType> = {
//           data: updatedRecord as RecordType,
//       };

//       return result;
//   },
};



















