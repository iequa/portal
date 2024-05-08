import { makeAutoObservable, reaction } from "mobx";

class StoredToken {
    
    sessionInfo = {
        token: undefined,
        timeStamp: undefined,
    };
    logged = false;
    userInfo = {
        name: "",
        pol: ""
    }
    /**
     * Токен имеет фиксированное время жизни.
     * Важно, так как храним в localStorage и уменьшаем риск в случае xss.
     * Время жизни токена ставим в 23 часа 59 минут
     */
    TOKEN_TTL_MS = 86340000;
    
    constructor() {
        makeAutoObservable(this);
    }

    isExpired(timeStamp) {
        if (!timeStamp) return false;
    
        const now = new Date().getTime();
        const diff = now - timeStamp;
    
        return diff > TOKEN_TTL_MS;
    };
    
    setToken(access_token) {
        console.log("set " + access_token);
        this.sessionInfo = {
            token: access_token,
            timeStamp: new Date().getTime(),
        }
        this.logged = true;
    };
    
    removeToken() {
        this.sessionInfo = {
            token: undefined,
            timeStamp: undefined,
        };
    };
    
    getToken() {
        let result = null;
        const storedToken = this.sessionInfo.timeStamp;
        storedToken && (result = this.sessionInfo.token);
        return result;
    };

    clearAll() {
        this.sessionInfo = {};
    }

    setIsLogged(isLogged) {
        this.logged = isLogged;
        if (!this.logged) {
            this.clearAll();
        }
    }

    setUserInfo(userInfo) {
        this.userInfo = userInfo;
    }

    getUserName() {
        return this.userInfo.name;
    }

    isLogged() {
        return this.logged;
    }
}
const tokenStorage = new StoredToken();
export { tokenStorage };