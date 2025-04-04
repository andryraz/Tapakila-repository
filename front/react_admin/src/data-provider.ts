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
  UpdateResult,
  fetchUtils, GetManyReferenceParams, GetManyReferenceResult, RaRecord
} from 'react-admin';
const apiUrl = 'http://localhost:5000';

const httpClient = async (url: string, options: any = {}) => {
    const auth = localStorage.getItem("auth");
    const token = auth ? JSON.parse(auth).token : null;

    if (!options.headers) {
        options.headers = new Headers({ "Content-Type": "application/json" });
    }

    if (token) {
        options.headers.set("Authorization", `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
};

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


    // Autres méthodes (getList, getOne, create, delete, etc.)
  
    getManyReference: async function <RecordType extends RaRecord = any>(
      resource: string,
      params: GetManyReferenceParams
    ): Promise<GetManyReferenceResult<RecordType>> {
      // Construire l'URL pour récupérer les billets associés à l'ID de l'événement
      const url = `${apiUrl}/billets/${params.id}`;
  
      // Effectuer la requête API
      const response = await fetchUtils.fetchJson(url);
  
      // Récupérer les données de la réponse
      const data = response.json;
  
      // Retourner la réponse dans le format attendu par React Admin
      return {
        data: data,  // Les billets associés à l'événement
        total: data.length,  // Le nombre total de billets
      };
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


  
  
      create: async (resource: string, params: any) => {
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
                  throw new Error(`Ressource ${resource} non supportée`);
          }
  
          const { data } = params;
  
          const response = await httpClient(apiUrl, {
              method: 'POST',
              body: JSON.stringify(data),
          });
  
          if (!response.json.id) {
              throw new Error("L'API ne renvoie pas d'ID valide pour l'événement");
          }
  
          return { data: response.json };
      },


      update: async function <RecordType extends RaRecord = any>(
        resource: string,
        params: UpdateParams
      ): Promise<UpdateResult<RecordType>> {
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
      
        const auth = localStorage.getItem("auth");
        const token = auth ? JSON.parse(auth).token : null;
      
        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params.data),
        });
      
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour");
        }
      
        return {
          data: await response.json(),
        };
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



  deleteMany: async function <RecordType extends RaRecord = any>(
      resource: string,
      params: DeleteManyParams
  ): Promise<DeleteManyResult<RecordType>> {
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
      const { ids } = params;

      try {
          const promises = ids.map(id =>
              fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
          );

          const responses = await Promise.all(promises);
          const allOk = responses.every(response => response.ok);

          if (!allOk) {
              throw new Error("Erreur lors de la suppression de plusieurs éléments.");
          }

          const result: DeleteManyResult<RecordType> = {
              data: ids as unknown as RecordType[],
          };

          return result;
      } catch (error) {
          console.error("Erreur lors de la suppression de plusieurs éléments :", error);
          throw error;
      }
  },
};














