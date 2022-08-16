import { makeAutoObservable } from "mobx"

export class NavbarModel {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
