import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/bootstrap.min.css'
import './style/index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
import { Toaster } from 'react-hot-toast'
import { ContextProvider } from './context/ContextProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GoogleOAuthProvider clientId='432275462644-56u4aq49vu1cqasfheodv98kstke3ams.apps.googleusercontent.com'>
    <Provider store={store}>
      <ContextProvider>
        <Toaster />
        <App />
      </ContextProvider>
    </Provider>
  </GoogleOAuthProvider>
)
