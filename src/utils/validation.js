import { getObjectKeys } from "./object"
import { t } from "./translations"
import { TranslationKey } from "@constants/translations/translation-key"
import { SettingsModel } from "@models/settings-model"
import { ValidationError } from "class-validator"

export const isValidationErrors = (errors) => {
  if (Array.isArray(errors)) {
    return errors.every((error) => error instanceof ValidationError)
  }

  return false
}

export const plainValidationErrors = (errors) =>
  errors.reduce((acc, cur) => {
    let accTmp = []
    if (cur.children?.length) {
      accTmp = [...acc, ...cur.children]
    } else {
      accTmp = [...acc, cur]
    }
    return accTmp
  }, [])

export const plainValidationErrorAndApplyFuncForEachError = (error, func) => {
  const plainErrors = plainValidationErrors(error)
  plainErrors.forEach((err) => {
    if (err.constraints) {
      const [firstConstraint] = getObjectKeys(err.constraints)
      func({ errorProperty: err.property, constraint: err.constraints[firstConstraint] })
    }
  })
}

export const disallowsSpecialCharInFirstCharEmail = (field) =>
  field.charAt(0).replace(/[{}@"!#$%^&*()+=;:`~|'?/><, ]/, "")
export const disallowsSpecialCharInEmailField = (field) => field.replace(/[{}"!#$%^&*()+=;:`~|'?/><, ]/, "")

export const translateProposalsLeftMessage = (num1, num2) => {
  if (SettingsModel.languageTag === "ru") {
    return `Осталось ${num1} из ${num2} предложений`
  } else {
    return `${num1} out of ${num2} proposals left`
  }
}

export const validationMessagesArray = (
  errorMinLength,
  errorOneNumber,
  errorUppercaseLetter,
  errorLowercaseLetter,
  errorNoEngLetter,
) => [
  {
    name: t(TranslationKey["The password must contain"]),
    error: "",
  },
  {
    name: `${t(TranslationKey.minimum)} 6 ${t(TranslationKey.characters)},`,
    error: errorMinLength,
  },

  {
    name: `1 ${t(TranslationKey.number)},`,
    error: errorOneNumber,
  },
  {
    name: t(TranslationKey.uppercase),
    error: errorUppercaseLetter,
  },
  {
    name: t(TranslationKey.and),
    error: "",
  },

  {
    name: t(TranslationKey.lowercase),
    error: errorLowercaseLetter,
  },

  {
    name: t(TranslationKey["latin letters"]),
    error: errorNoEngLetter,
  },
]
