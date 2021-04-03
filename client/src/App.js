import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components';
import Container from './components/Container';
import { HomeScreen } from './screens';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
          </Switch>
        </Container>
      </main>
    </Router>
  );
}

export default App;
