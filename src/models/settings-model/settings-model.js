import {makeAutoObservable, reaction} from 'mobx'
import {makePersistable} from 'mobx-persist-store'

import {LanguageKey} from '@constants/translations/language-key'

import {setI18nConfig} from '@utils/translations'

const persistProperties = ['dataGridState', 'activeSubCategoryState', 'viewTableModeState', 'languageTag']

const stateModelName = 'SettingsModel'
class SettingsModelStatic {
  languageTag = LanguageKey.en
  isHydrated = false

  showHints = true

  constructor() {
    makeAutoObservable(this, undefined, {autoBind: true})
    makePersistable(this, {name: stateModelName, properties: persistProperties}).then(({isHydrated}) => {
      this.isHydrated = isHydrated
    })
    reaction(
      () => this.isHydrated,

      isHydrated => {
        if (isHydrated) {
          setI18nConfig()
        }
      },
    )
  }

  onTriggerShowHints() {
    this.showHints = !this.showHints
  }


  setLanguageTag(languageKey) {
    this.languageTag = languageKey
  }
}

export const SettingsModel = new SettingsModelStatic()
