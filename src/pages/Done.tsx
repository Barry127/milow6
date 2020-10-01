import React, { FC } from 'react';
import { Heading, P } from 'maeven';

import { AppState } from '../App';

import gotit from '../assets/gotit.gif';

export const Done: FC<DoneProps> = ({
  setPage,
  setAppState,
  page,
  appState
}) => (
  <>
    <Heading level="h1" size="h3">
      <span role="img" aria-label="thumb up">
        👍
      </span>{' '}
      Je bent geweldig!
    </Heading>
    <P>
      Goed gedaan! Je komt {appState.dag} om {appState.tijd} op
      verjaardagsvisite.
    </P>
    <P className="round" style={{ backgroundImage: `url(${gotit})` }} />
  </>
);

interface DoneProps {
  setPage: (page: string) => void;
  setAppState: (state: AppState) => void;
  page: string;
  appState: AppState;
}
