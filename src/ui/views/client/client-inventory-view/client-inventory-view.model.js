import {makeAutoObservable} from 'mobx'



export class ClientInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
 

  constructor({history, }) {
    this.history = history

    makeAutoObservable(this, undefined, {autoBind: true})
    
  }


  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }


  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

 

}
