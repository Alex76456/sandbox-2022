import {action, makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {getObjectKeys} from '@utils/object'

export class AuthViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  email = ''
  password = ''
  remember = false

  showSuccessModal=true

  formValidationErrors = {
    email: null,
    password: null,
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  get hasFormErrors() {
    return getObjectKeys(this.formValidationErrors).every(error => this.formValidationErrors[error])
  }

  setField = fieldName =>
    action(value => {
      this.formValidationErrors[fieldName] = null

      if (fieldName === 'remember') {
        this[fieldName] = !this.remember
      } else {
        this[fieldName] = value
      }
    })

  onTriggerOpenModal(modal){

    this[modal]=!this[modal]
  }

  async onSubmitForm() {
    try {
      this.history.push('client/main')


    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      this.error = error
    }
  }
}
