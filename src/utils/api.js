const ResultType = {
  JSON: "JSON",
  BINARY: "BINARY",
  TEXT: "TEXT",
};

class Api {
  backendUrl = "http://localhost:5454";

  constructor(options) {
    this.options = options;
  }

  _fetchData(url, requestBody, args, resultType = ResultType.JSON) {
    return fetch(url, requestBody)
      .then((response) => {
        return this._processResponse(response, resultType);
      })
      .then((result) => {
        args?.resolveCallback?.(result);
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
        case NOT_AUTH_STATUS: {
          errorObj = {
            code: NOT_AUTH_STATUS,
            message: errJson.errorMessage,
            callStack: errJson.stackTrace,
          };
          break;
        }
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
    const url = `${this.backendUrl}/get-user`;
    const body = {
      method: "post",
      body: JSON.stringify({
        userId: args?.body?.id,
      }),
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
