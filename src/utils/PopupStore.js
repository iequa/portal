import { makeAutoObservable } from "mobx";

export default class PopupStore {
  id = "";
  title = "";
  crose = false;
  main = {};
  footer = "";
  openPopUp = false;

  constructor() {
    makeAutoObservable(this);
  }

  setId(id){
    this.id = id
  }  

  setTitle(title){
    this.title = title
  }  

  setCrose(crose){
    this.crose = crose
  }  

  setMain(main){
    this.main = main
  }  

  setFooter(footer){
    this.footer = footer
  }  

  setOpenPopUp(openPopUp){
    this.openPopUp = openPopUp
  }

  

}

const popupStore = new PopupStore();

export { popupStore };
