import { makeAutoObservable, reaction } from "mobx";
import PopupStore from "./PopupStore";

class StoredToken {
    
    sessionInfo = {
        token: undefined,
        timeStamp: undefined,
        login: "",
        pass: "",
    };

    messages = {
        infoMessage: "",
        errorMessage: "",
    };

    logged = false;

    userInfo = {
        name: "",
        pol: "",
    };
    popupStore = new PopupStore;
    loginWindow = false;
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
    
    setToken(access_token, login, pass) {
        this.sessionInfo.token = access_token;
        this.sessionInfo.timeStamp = new Date().getTime();
        this.sessionInfo.login = login;
        this.sessionInfo.pass = pass;
        const ls = window.localStorage;
        ls.setItem("sessionData", JSON.stringify(this.sessionInfo));
        this.logged = true;
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

    setSessionInfo(sessionInfo) {
        this.sessionInfo = sessionInfo;
    }

    setInfoMessage(infoMessage) {
        this.messages.infoMessage = infoMessage;
    }

    setErrorMessage(errorMessage) {
        this.messages.errorMessage = errorMessage;
    }

    clearMessages() {
        this.messages.errorMessage = "";
        this.messages.infoMessage = "";
    }

    getSessionInfo() {
        let result = null;
        console.log("exp " + this.isExpired());
        if (this.isExpired()) {
            return null;
        }
        const storedToken = this.sessionInfo.timeStamp;
        storedToken && this.sessionInfo.token && (result = this.sessionInfo);
        return result;
    };

    isLogged() {
        return this.logged;
    }

    setLoginWindow(loginWindow){
        this.loginWindow = loginWindow;
    }

    clearPopupStore(popupStore){
        this.popupStore = {};
    }
}
const tokenStorage = new StoredToken();
export { tokenStorage };