const ROUTES = {
    users: {
      list: `/users`,
      new: `/users/new`,
      show: `/users/[id]`,
      edit: `/users/[id]/edit`,
    },
    services: {
      list: `/services`,
      new: `/services/new`,
      show: `/services/[id]`,
      edit: `/services/[id]/edit`,
    },
    serviceDocuments: {
      list: `/servicedocument`,
      new: `/servicedocument/new`,
      show: `/servicedocument/[id]`,
      edit: `/servicedocument/[id]/edit`,
    },
  };
  
  export default ROUTES;