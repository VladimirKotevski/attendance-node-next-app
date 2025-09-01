const addAuthorization = (config: any, shouldAuthorize: boolean) => {
    if (shouldAuthorize) {
      config.withCredentials = true;
    }
  };
  
  const defaultPostHeaders = {
    "Content-Type": "application/json",
  };
  
  const apiService = {
    makeGetCall: async (path: string, authorize = false, headers?: any) => {
      const url = `${path}`;
      const config: any = {
        method: "GET",
        headers: headers,
      };
  
      try {
        const res = await fetch(url, config);

        //console.log('Response:', res);
        // if (!res.ok) {
        //   throw new Error(`Failed with status ${res.status}`);
        // }
        const data = await res.json();

        return data;
      } catch (e: any) {
        console.error(`Error during GET '/${path}':`, e.message || e);
        return { success: false, error: e.message || 'Network error' };
      }
    },
  
    makePostCall: async (
      path: string,
      authorize = false,
      headers: Record<string, string> = defaultPostHeaders,
      body?: any
    ) => {
      const url = `${path}`;
    
      const config: RequestInit = {
        method: "POST",
        body: headers["Content-Type"] === "application/json" ? JSON.stringify(body) : body,
        headers: {
          ...headers,
        },
      };
    
      // Add authorization header if required, and ensure it’s safe for both client and server.
      addAuthorization(config, authorize);
    
      try {
        const res = await fetch(url, config);
        const serverResponse = await res.json();
    
        return serverResponse;
      } catch (error) {
        console.error(`Error during POST '${url}':`, error);
        return {
          responseStatus: false,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        };
      }
    },
  
    makePutCall: async (path: string, authorize = false, headers: any = defaultPostHeaders, body?: any) => {
      const url = `${path}`;
      const config = {
        method: "PUT",
        body: headers["Content-Type"] === "application/json" ? JSON.stringify(body) : body,
        headers: {
          ...headers,
        },
      };
      addAuthorization(config, authorize);
  
      try {
        const res = await fetch(url, config);
        return await res.json();
      } catch (e: any) {
        console.log(e);
        console.log(`Error during PUT '/${path}': ${e.responseMessage}`);
        return { responseStatus: false };
      }
    },
  
    makeDeleteCall: async (path: string, authorize = false, headers?: any) => {
      const url = `${path}`;
      const config: any = {
        method: "DELETE",
        headers: headers,
      };
      addAuthorization(config, authorize);
  
      try {
        const res = await fetch(url, config);
        return await res.json();
      } catch (e: any) {
        console.log(e);
        console.log(`Error during DELETE '/${path}': ${e.responseMessage}`);
        return { responseStatus: false };
      }
    },
  };
  export default apiService;