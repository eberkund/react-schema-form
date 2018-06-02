import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Form from '@react-schema-form/bootstrap';
import samples from '@react-schema-form/utils-samples';

import {
  Container,
  Header,
  Main,
  Menu,
  Content,
  Title,
  Small,
  Nav,
  Link
} from './Layout';
import '../bootstrap.css';


const getLinks = () =>
  samples.allIds.map(id => {
    const { title } = samples.byId[id];
    return (
      <Link key={id} to={`/${id}`}>
        {title}
      </Link>
    );
  });

const getRoutes = ({ Form }) =>
  samples.allIds.map(id => {
    const { formProps } = samples.byId[id];
    return (
      <Route key={id} path={'/' + id} render={() => <Form {...formProps} />} />
    );
  });

class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Title>React JSON Schema Form</Title>
          <Small>Bootstrap 4 UI</Small>
        </Header>

        <Main>
          <Menu>
            <Nav>{getLinks()}</Nav>
          </Menu>

          <Content>
            <Switch>
              {getRoutes({ Form })}
              <Redirect to={`/${samples.allIds[0]}`} />
            </Switch>
          </Content>
        </Main>
      </Container>
    );
  }
}

export default App;
