import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import Store from './store';

import App from './App'

// Containers
// import Full from './containers/Full/'

// Views
// import Login from './views/Pages/Login/'
// import Register from './views/Pages/Register/'
// import Page404 from './views/Pages/Page404/'
// import Page500 from './views/Pages/Page500/'

const history = createBrowserHistory();

const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);

{/*<HashRouter history={history}>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login}/>
      <Route exact path="/register" name="Register Page" component={Register}/>
      <Route exact path="/404" name="Page 404" component={Page404}/>
      <Route exact path="/500" name="Page 500" component={Page500}/>
      <Route path="/" name="Home" component={Full}/>
    </Switch>
  </HashRouter>*/}
