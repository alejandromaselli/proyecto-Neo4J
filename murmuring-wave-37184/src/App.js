import React from 'react';
import Layout from './components/layout/Layout';
import { isAuth } from './components/auth/helpers'

const App = () => {
  return (
    <React.Fragment>
      <Layout>
      </Layout>
      <div className="content">
        {
          isAuth() ? (
            <h1>Bienvenido {isAuth().name}!</h1>
          ) : (
              <div className="col-md-6 offset-md-3 text-center">
                <div className="d-flex align-items-center justify-content-center flex-column" style={{height: '100vh'}}>
                  <h1 className="pt-5">Bienvenido!</h1>
                  <div className="button-group">
                    <button type="button" className="btn btn-primary">Iniciar sesión</button>
                    <button type="button" className="btn btn-primary">Crear cuenta</button>
                  </div>
                </div>
              </div>
            )
        }
      </div>
    </React.Fragment>
  )
}

export default App
