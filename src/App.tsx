import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Header} from 'components/Header';
import {Footer} from 'components/Footer';
import {Loading} from 'components/Loading';
import styled from 'styled-components';

const Home = lazy(() => import('pages/Home'));
const History = lazy(() => import('pages/History'));
const About = lazy(() => import('pages/About'));
const SignIn = lazy(() => import('pages/SignIn'));
const SignUp = lazy(() => import('pages/SignUp'));
// import Home from 'pages/Home';
// import History from 'pages/History';
// import About from 'pages/About';
const Main = styled.main`
  flex-grow: 1;
  padding: 10px 100px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/history" exact component={History} />
            <Route path="/about" exact component={About} />
            <Route path="/signIn" exact component={SignIn} />
            <Route path="/signUp" exact component={SignUp} />
          </Switch>
        </Suspense>
      </Main>
      <Footer />
    </Wrapper>
  );
}

export default App;
