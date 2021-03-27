import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';

export const ProtectedRoute = ({isAuth: isAuth, component: Component, ...rest}) => {
  return(
    <Route 
      {...rest}
        render={props => {
          if(isAuth){
            return <Component {...props}/>
          }else{
            return(
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location
                  }
                }}
              />
            )
          }
          
        }}>
    </Route>
  )
}

