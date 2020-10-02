import React, { FC, useEffect, useState } from 'react';
import { Alert, Button, Col, Heading, Link, P, Row, Spinner } from 'maeven';

import { AppState } from '../App';
import { reservationsAgent, slotsAgent } from '../lib/agent';

interface Slot {
  _id: string;
  id: number;
  time: number;
  date: number;
  free: number;
}

interface SlotsState {
  loading: boolean;
  error: boolean;
  slots: Slot[];
}

export const Reserveren: FC<ReserverenProps> = ({
  setPage,
  setAppState,
  page,
  appState
}) => {
  const [slots, setSlots] = useState<SlotsState>({
    loading: false,
    error: false,
    slots: []
  });
  const [currentSlot, setCurrentSlot] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadSlots = async () => {
    setCurrentSlot(undefined);
    setLoading(false);
    setError(false);
    setSlots({
      loading: true,
      error: false,
      slots: []
    });

    try {
      const { data } = await slotsAgent.all();
      setSlots({
        loading: false,
        error: false,
        slots: data as Slot[]
      });
    } catch {
      setSlots({ loading: false, error: true, slots: [] });
    }
  };

  const save = async () => {
    setLoading(true);
    const slot = slots.slots.find((slot) => slot.id === currentSlot);
    if (!slot) return setError(true);

    const { data }: { data: Slot } = await slotsAgent.byId(slot._id);

    if (data.free < appState.number) setError(true);

    const dag =
      slot.date === 2410 ? 'zaterdag 24 oktober' : 'zondag 25 oktober';
    const tijd = `${slot.time}:00`;

    try {
      for (const name of appState.names) {
        await reservationsAgent.create({
          code: `${dag} ${tijd}`,
          name,
          slot: slot.id
        });
      }
      await slotsAgent.patch({
        _id: data._id,
        free: data.free - appState.number
      });
    } catch {
      return setError(true);
    }

    setAppState({
      ...appState,
      dag,
      tijd
    });

    setPage('done');
  };

  useEffect(() => {
    if (page === 'reserveren') loadSlots();
  }, [page]);

  return (
    <>
      <Heading level="h1" size="h3">
        <span role="img" aria-label="clock">
          🕰
        </span>{' '}
        Tijd kiezen
      </Heading>
      <P>Kies hieronder de dag en tijdstip dat je op verjaardagsvisite komt.</P>

      {slots.loading && (
        <Spinner color="primary" text="Tijdstippen worden geladen..." />
      )}

      {slots.error && (
        <Alert type="warning" title="Oeps!">
          <P>
            Er is iets mis gegaan bij het laden van de tijdstippen.{' '}
            <Link
              href="#/"
              onClick={(ev: any) => {
                ev.preventDefault();
                loadSlots();
              }}
            >
              Probeer opnieuw
            </Link>
            .
          </P>
        </Alert>
      )}

      {error && (
        <Alert type="danger" title="Oh nee!" animateOnOpen>
          <P>
            Er is iets mis gegaan bij het bevestigen{' '}
            <span role="img" aria-label="crying">
              😢
            </span>
            .{' '}
            <Link
              href="#/"
              onClick={(ev: any) => {
                ev.preventDefault();
                loadSlots();
              }}
            >
              Probeer opnieuw
            </Link>
            .
          </P>
        </Alert>
      )}

      {!error && slots.slots.length > 0 && (
        <Spinner
          spinning={loading}
          size={96}
          color="primary"
          text={
            <>
              <P>Bevestiging verzenden</P>
              <P>
                <small style={{ fontStyle: 'italic' }}>
                  Dit kan een aantal secondes duren
                </small>
              </P>
            </>
          }
        >
          <Row gutter={1}>
            <Col span={12} xs={12}>
              <Heading level="h2" size="h4">
                Za 24 okt
              </Heading>
              <div className="slots">
                {slots.slots
                  .filter((slot) => slot.date === 2410)
                  .map((slot) => (
                    <Button
                      key={slot._id}
                      disabled={
                        slot.free < appState.number ||
                        page !== 'reserveren' ||
                        loading
                      }
                      buttonType={
                        currentSlot === slot.id ? 'success' : 'default'
                      }
                      onClick={
                        slot.free >= appState.number
                          ? () => setCurrentSlot(slot.id)
                          : undefined
                      }
                    >
                      {slot.time}:00
                    </Button>
                  ))}
              </div>
            </Col>
            <Col span={12} xs={12}>
              <Heading level="h2" size="h4">
                Zo 25 okt
              </Heading>
              <div className="slots">
                {slots.slots
                  .filter((slot) => slot.date === 2510)
                  .map((slot) => (
                    <Button
                      key={slot._id}
                      disabled={
                        slot.free < appState.number ||
                        page !== 'reserveren' ||
                        loading
                      }
                      buttonType={
                        currentSlot === slot.id ? 'success' : 'default'
                      }
                      onClick={
                        slot.free >= appState.number
                          ? () => setCurrentSlot(slot.id)
                          : undefined
                      }
                    >
                      {slot.time}:00
                    </Button>
                  ))}
              </div>
            </Col>
            <Col span={12} xs={12}>
              <Button
                disabled={
                  page !== 'reserveren' || currentSlot === undefined || loading
                }
                buttonType="primary"
                fluid
                size="lg"
                onClick={save}
              >
                Bevestigen
              </Button>
            </Col>
            <Col span={12} xs={12}>
              <Button
                disabled={page !== 'reserveren' || loading}
                fluid
                size="lg"
                onClick={() => setPage('aantal')}
              >
                Terug
              </Button>
            </Col>
          </Row>
        </Spinner>
      )}
    </>
  );
};

interface ReserverenProps {
  setPage: (page: string) => void;
  setAppState: (state: AppState) => void;
  page: string;
  appState: AppState;
}
