import React, { FC, useState } from 'react';
import { Card, Container } from 'maeven';
import { Home } from './pages/Home';
import { Jammer } from './pages/Jammer';
import { useSpring, animated } from 'react-spring';
import { Aantal } from './pages/Aantal';
import { Reserveren } from './pages/Reserveren';
import { Done } from './pages/Done';

export interface AppState {
  number: number;
  names: string[];
  dag: string;
  tijd: string;
}

export const App: FC = () => {
  const [page, setPage] = useState('home');
  const [appState, setAppState] = useState<AppState>({
    number: 1,
    names: [''],
    dag: '',
    tijd: ''
  });

  const homeStyle = useSpring({
    to: {
      opacity: page === 'home' ? 1 : 0,
      transform: page === 'home' ? 'translateX(0%)' : 'translateX(-100%)',
      position: page === 'home' ? 'static' : 'absolute'
    }
  });

  const aantalStyle = useSpring({
    to: {
      opacity: page === 'aantal' ? 1 : 0,
      transform:
        page === 'aantal'
          ? 'translateX(0%)'
          : page === 'home'
          ? 'translateX(100%)'
          : 'translateX(-100%)',
      position: page === 'aantal' ? 'static' : 'absolute'
    }
  });

  const reserverenStyle = useSpring({
    to: {
      opacity: page === 'reserveren' ? 1 : 0,
      transform:
        page === 'reserveren'
          ? 'translateX(0%)'
          : page === 'done'
          ? 'translateX(-100%)'
          : 'translateX(100%)',
      position: page === 'reserveren' ? 'static' : 'absolute'
    }
  });

  const doneStyle = useSpring({
    to: {
      opacity: page === 'done' ? 1 : 0,
      transform: page === 'done' ? 'translateX(0%)' : 'translateX(100%)',
      position: page === 'done' ? 'static' : 'absolute'
    }
  });

  const jammerStyle = useSpring({
    to: {
      opacity: page === 'jammer' ? 1 : 0,
      transform: page === 'jammer' ? 'translateX(0%)' : 'translateX(100%)',
      position: page === 'jammer' ? 'static' : 'absolute'
    }
  });

  return (
    <>
      <div className="app-header"></div>
      <Container className="main-container">
        <Card className="main-card">
          <animated.div style={homeStyle} className="animated">
            <Home page={page} setPage={setPage} />
          </animated.div>
          <animated.div style={aantalStyle} className="animated">
            <Aantal
              page={page}
              setPage={setPage}
              appState={appState}
              setAppState={setAppState}
            />
          </animated.div>
          <animated.div style={reserverenStyle} className="animated">
            <Reserveren
              page={page}
              setPage={setPage}
              appState={appState}
              setAppState={setAppState}
            />
          </animated.div>
          <animated.div style={doneStyle} className="animated">
            <Done
              page={page}
              setPage={setPage}
              appState={appState}
              setAppState={setAppState}
            />
          </animated.div>
          <animated.div style={jammerStyle} className="animated">
            <Jammer page={page} setPage={setPage} />
          </animated.div>
        </Card>
      </Container>
    </>
  );
};
