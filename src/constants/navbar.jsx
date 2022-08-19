import { navBarActiveCategory } from "./navbar-active-category"
import { DashboardIcon } from "./navbar-svg-icons"
import { TranslationKey } from "./translations/translation-key"
import { UserRole } from "./user-roles"
import { t } from "@utils/translations"

export const navbarConfig = () => ({
  [UserRole.CLIENT]: [
    {
      icon: DashboardIcon,
      title: t(TranslationKey.Dashboard),
      route: "/client/main",
      subtitles: null,
      key: navBarActiveCategory.NAVBAR_MAIN,
      checkHideBlock: () => true,
    },
  ],
})
