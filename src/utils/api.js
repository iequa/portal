import { tokenStorage } from "./StoredToken";

const ResultType = {
  JSON: "JSON",
  BINARY: "BINARY",
  TEXT: "TEXT",
};

class Api {
  backendUrl = "http://192.168.0.164:8085";

  constructor(options) {
    this.options = options;
  }

  _fetchData(url, requestBody, args, resultType = ResultType.JSON) {
    if (tokenStorage.isLogged()) {
      const token = tokenStorage.getToken();
      if (token && !tokenStorage.isExpired()) {
        if (requestBody.headers) {
          requestBody.headers.Token = token;
        } 
        else {
          if (requestBody) {
            requestBody.headers = {Token: token};
          } 
          else {
            requestBody = {headers: {
              Token: token,
            }};
          }
        }
      }
    }
    
    return fetch(url, requestBody)
      .then((response) => {
        return this._processResponse(response, resultType);
      })
      .then((result) => {
        args?.resolveCallback?.(result);
        if (result?.message) {
          tokenStorage.setInfoMessage(result?.message);
        }
        return result;
      })
      .catch((err) => {
        this._processError(err, url.toString().split("/").at(-1));
        args?.errorCallback?.(err);
        return err;
      })
      .finally(() => {
        args?.finalCallback?.();
      });
  }

  _processError(err, url) {
    console.log(err, url);
  }

  async _processResponse(response, resultType) {
    if(await response?.headers?.Token) {
      tokenStorage.setToken(response?.headers?.Token);
      tokenStorage.setIsLogged(true);
    }
    if (response.ok) {
      switch (resultType) {
        case ResultType.JSON: {
          return response.json();
        }
        case ResultType.BINARY: {
          return response.blob();
        }
        case ResultType.TEXT:
        default: {
          return response.text();
        }
      }
    } else {
      let errJson = {};
      let errorObj = {};
      let errorInfo = await response.text();

      try {
        errJson = JSON.parse(errorInfo);
      } catch (error) {}

      switch (response.status) {
        case 400:
        case 404:
        case 500: {
          errorObj = {
            code: response.status,
            message: errJson.errorMessage,
            callStack: errJson.stackTrace,
            innerMessage: errJson.causeMessage,
            innerCallStack: errJson.causeStackTrace,
          };
          tokenStorage.setErrorMessage(errJson.errorMessage);
          break;
        }
        case 401: {
          errorObj = {
            code: response.status,
            message: errJson.errorMessage,
            callStack: errJson.stackTrace,
            innerMessage: errJson.causeMessage,
            innerCallStack: errJson.causeStackTrace,
          };
          tokenStorage.setErrorMessage(errJson.errorMessage);
          tokenStorage.setIsLogged(false);
          break;
        }
        default: {
          errorObj = {
            code: response.status,
            message: "unknown error",
          };
          break;
        }
      }
      return Promise.reject(errorObj);
    }
  }

  processLogin(args) {
    const url = `${this.backendUrl}/process-login`;
    const body = {
      method: "post",
      body: JSON.stringify({
        login: args.login,
        value: args.value,
      }),
    };
    return this._fetchData(url, body, args);
  }

  processLogout(args) {
    const url = `${this.backendUrl}/process-logout`;
    const body = {
      method: "post",
    };
    return this._fetchData(url, body, args);
  }

  getDonorBloodData(args) {
    const url = `${this.backendUrl}/get-donorbloodlight`;
    const body = {
      method: "get",
    };
    return this._fetchData(url, body, args);
  }

  getNewsPreviews(args) {
    const url = `${this.backendUrl}/get-news-prevs`;
    const body = {
      method: "post",
      body: JSON.stringify({
        page: args.page,
      }),
    };
    return this._fetchData(url, body, args);
  }

  getNewsForPage(args) {
    const url = `${this.backendUrl}/get-news-data`;
    const body = {
      method: "post",
      body: JSON.stringify({
        id: args?.pageId,
      }),
    };
    return this._fetchData(url, body, args);
  }

  getCalendarData(args) {
    const url = `${this.backendUrl}/get-calendar-data`;
    const body = {
      method: "post",
      body: JSON.stringify({
        type: args?.body?.type,
        days: args?.body?.days,
      }),
    };
    return this._fetchData(url, body, args);
  }

  setServiceProvisionDate(args) {
    const url = `${this.backendUrl}/set-service-provision-date`;
    const body = {
      method: "put",
      body: JSON.stringify({
        selectedDatetime: args?.body?.selectedDatetime,
        user: args?.body?.user,
      }),
      resolveWithFullResponse: true,
    };
    return this._fetchData(url, body, args);
  }

  getUsersList(args) {
    const url = `${this.backendUrl}/get-users`;
    const body = {
      method: "post",
      body: JSON.stringify({
        page: args.page,
      }),
    };
    return this._fetchData(url, body, args);
  }

  getUserInfo(args) {
    const url = `${this.backendUrl}/get-user-data`;
    const body = {
      method: "GET",
    };
    return this._fetchData(url, body, args);
  }

  editUserInfo(args) {
    const url = `${this.backendUrl}/edit-user`;
    const body = {
      method: "post",
      body: JSON.stringify({
        user: args?.body?.user,
      }),
    };
    return this._fetchData(url, body, args);
  }

  deleteUser(args) {
    const url = `${this.backendUrl}/delete-user`;
    const body = {
      method: "post",
      body: JSON.stringify({
        userId: args?.body?.id,
        page: args?.body?.page,
      }),
    };
    return this._fetchData(url, body, args);
  }

  addUser(args) {
    const url = `${this.backendUrl}/add-user`;
    const body = {
      method: "post",
      body: JSON.stringify({
        user: args?.body?.user,
      }),
    };
    return this._fetchData(url, body, args);
  }
}

const api = new Api({
  baseUrl: "http://localhost:5000", //process.env.REACT_APP_HOST_API,
});

export { api };
