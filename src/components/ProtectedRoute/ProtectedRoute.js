import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...props }) => {

  React.useEffect(() => {
    props.setLoginPopupActive(true);
  });

  return (
    <Route path={props.path}>
      {() =>
        props.user._id ? <Component {...props} /> : <Redirect  to="./" />
      }
    </Route>
  )
}

export default ProtectedRoute
