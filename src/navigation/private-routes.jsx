

import {observer} from 'mobx-react'
import {Redirect, Route, useHistory} from 'react-router-dom'

import {overallRoutesConfigs, privateRoutesConfigs} from '@constants/routes'

export const PrivateRoutes = observer(() => {
  const history = useHistory()


  const generateAllowedRoutes = () => {
    const allowedRoutes = privateRoutesConfigs
      .concat(overallRoutesConfigs)

    const notAllowedRoute = !allowedRoutes.some(elem => elem.routePath === history.location.pathname)

    return (
      <>
        {allowedRoutes.map((route, index) => (
          <Route key={index} component={route.component} exact={route.exact} path={route.routePath} />
        ))}

        {notAllowedRoute ? (
          allowedRoutes[0] ? (
            <Redirect to={allowedRoutes[0].routePath} />
          ) : (
            <Redirect to={'/auth'} />
          )
        ) : undefined}
      </>
    )
  }


  return generateAllowedRoutes()
})
 