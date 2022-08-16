import {makeAutoObservable} from 'mobx'

import {SettingsModel} from '@models/settings-model'

export class AppbarModel {
  requestStatus = undefined
  error = undefined

 

  get showHints() {
    return SettingsModel.showHints
  }

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onExitFromRole() {
    // UserModel.signOut()
  }

  onTriggerShowHints() {
    SettingsModel.onTriggerShowHints()
  }

  async changeUserInfo(data) {
    try {
      // await UserModel.changeUserInfo(data)
    } catch (error) {
      console.log(error)
    }
  }
}
