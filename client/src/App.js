import React from 'react';
import './App.css';
import client from './config/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Form, Detail } from './pages';
import { Navbar, Movies, Series, Favorites } from './components';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <Movies />
              <br />
              <Series />
            </Route>
            <Route exact path='/movie' component={Movies} />
            <Route exact path='/series' component={Series} />
            <Route exact path='/favorites' component={Favorites} />
            <Route exact path='/movie/create' component={Form} />
            <Route exact path='/series/create' component={Form} />
            <Route exact path='/movie/edit/:id' component={Form} />
            <Route exact path='/series/edit/:id' component={Form} />
            <Route exact path='/movie/:id' component={Detail} />
            <Route exact path='/movie/:id' component={Detail} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
