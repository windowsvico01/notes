import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
// import { useScroll } from 'react-router-scroll';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import configureStore, { history } from './configStore';
import globalSagas from './containers/App/sagas';
import { CRouter } from './routes';
import Dashboard from './containers/Dashboard';
import { ConnectedRouter } from 'connected-react-router/immutable';
import NotFound from './containers/NotFound';
import 'sanitize.css/sanitize.css';
import './utils/home.css'
import AppWrapper from './containers/App';
const initialState = {};
const store = configureStore(initialState, history);
store.runSaga(globalSagas);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <ConnectedRouter history={history} context={ReactReduxContext}>
            <BrowserRouter basename="/admin">
              <AppWrapper>
              <Switch>
                <Route path="/404" component={NotFound} />           
                {/* <Route exact path="/" render={() => <Dashboard><span>嘻嘻嘻嘻</span></Dashboard>} /> */}
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path="/" render={() => (
                  <Dashboard>
                    {CRouter(store)}
                    {/* <Redirect to="/404" /> */}
                  </Dashboard>
                )} /> 
                {/* <Redirect to="/404" /> */}
                <Route render={() => <Redirect to="/404" />} />
                {/* <Route component={NotFound} /> */}
              </Switch>
              </AppWrapper>
            </BrowserRouter>
          </ConnectedRouter>
      </Provider>
    </div>
  );
}

export default App;
