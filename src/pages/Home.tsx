import React, { FC, useEffect } from 'react';
import { Button, Heading, P, Text, Row, Col } from 'maeven';

export const Home: FC<HomeProps> = ({ page, setPage }) => {
  useEffect(() => {
    if (page === 'home') {
      setTimeout(() => {
        document.getElementById('jaIkKom')?.focus();
      }, 500);
    }
  }, [page]);

  return (
    <>
      <Heading level="h1" size="h3">
        <span role="img" aria-label="party">
          🎉
        </span>{' '}
        Milow jarig
      </Heading>
      <P>
        Hallo! Zaterdag 24 en zondag 25 oktober vier ik mijn{' '}
        <Text inline color="pink" style={{ fontSize: '1.2em' }}>
          <strong>
            6<sup>e</sup>
          </strong>
        </Text>{' '}
        verjaardag! Kom je ook?
      </P>
      <P>
        Door de corona maatregelen mogen er niet meer dan 3 bezoekers van 13
        jaar en ouder tegelijk op mijn verjaardag komen. Daarom kan je in deze
        app aangeven hoe laat je komt, zo kan toch iedereen komen!
      </P>
      <Row gutter={1}>
        <Col span={12} xs={12}>
          <Button
            autoFocus
            id="jaIkKom"
            size="lg"
            buttonType="primary"
            fluid
            onClick={() => setPage('aantal')}
          >
            <span role="img" aria-label="party">
              🥳
            </span>{' '}
            Ja, ik kom!
          </Button>
        </Col>
        <Col span={12} xs={12}>
          <Button size="lg" fluid onClick={() => setPage('jammer')}>
            <span role="img" aria-label="sad">
              😞
            </span>{' '}
            Ik kan niet
          </Button>
        </Col>
      </Row>
    </>
  );
};

interface HomeProps {
  setPage: (page: string) => void;
  page: string;
}
