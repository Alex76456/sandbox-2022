import { TranslationKey } from "./translations/translation-key"
import { UserRole } from "./user-roles"
import { AuthView } from "@views/auth"
import { ClientMainView } from "@views/client/client-main-view"
import { RegistrationView } from "@views/registration"

// import { AnotherUserProfileView } from "@views/shared/another-user-profile-view"
// import { UserProfileView } from "@views/shared/user-profile-view/user-profile-view"

export const publicRoutesConfigs = [
  {
    routePath: "/auth",
    component: AuthView,
    exact: false,
  },
  {
    routePath: "/registration",
    component: RegistrationView,
    exact: false,
  },
]

export const overallRoutesConfigs = [
  // {
  //   routePath: "/profile",
  //   component: UserProfileView,
  //   exact: false,
  //   crumbNameKey: TranslationKey.Profile,
  // },
  // {
  //   routePath: "/another-user",
  //   component: AnotherUserProfileView,
  //   exact: false,
  //   crumbNameKey: TranslationKey.User,
  // },
]

export const privateRoutesConfigs = [
  {
    routePath: "/client/main",
    component: ClientMainView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Inventory,
  },
]
