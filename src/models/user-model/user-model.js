import {makeAutoObservable, runInAction} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

import {ApiClient} from '@services/rest-api-service/codegen/src'
import {restApiService} from '@services/rest-api-service/rest-api-service'

import {UserInfoContract} from './user-model.contracts'

const persistProperties = ['accessToken', 'userInfo']

const stateModelName = 'UserModel'

class UserModelStatic {
  accessToken = undefined
  userInfo = undefined
  userId = undefined 
  isHydrated = false

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistable(this, {name: stateModelName, properties: persistProperties}).then(persistStore => {
      runInAction(() => {
        this.isHydrated = persistStore.isHydrated
        if (this.accessToken) {
          restApiService.setAccessToken(this.accessToken)
          this.getUserInfo()
        }
      })
    })
    restApiService.setAccessToken(this.accessToken)
  }

  isAuthenticated() {
    return !!this.accessToken
  }

  signOut() {
    this.accessToken = undefined
    this.userInfo = undefined
    this.userId = undefined
    restApiService.removeAccessToken()
  }

  async signIn(email, password) {
    const response = await restApiService.userApi.apiV1UsersSignInPost({
      body: {
        email,
        password,
      },
    })

    const accessToken = response.token
    runInAction(() => {
      this.accessToken = accessToken
    })
    restApiService.setAccessToken(accessToken)

    return accessToken
  }

  async signUp({name, email, password}) {
    const response = await restApiService.userApi.apiV1UsersPost({
      body: {
        name,
        email,
        password,
      },
    })
    this.userInfo = ApiClient.convertToType(response, UserInfoContract)
  }

  async isCheckUniqueUser({name, email}) {
    const response = await restApiService.userApi.apiV1UsersCheckIsUniqueNameOrEmailPost({
      body: {
        name,
        email,
      },
    })
    return response
  }

  async getUserInfo() {
    try {
      const response = await restApiService.userApi.apiV1UsersInfoGet()
      runInAction(() => {
        this.userInfo = response
        this.userId = response._id
      })
      return response
    } catch (error) {
      this.accessToken = undefined
      this.userInfo = undefined
      this.userId = undefined
    }
  }



}

export const UserModel = new UserModelStatic()
