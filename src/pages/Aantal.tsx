import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormField,
  FormFieldNativeSelect,
  FormFieldTextInput,
  Heading,
  P,
  Row
} from 'maeven';

import { AppState } from '../App';
import dance from '../assets/dance.gif';
import { nameSchema, numberSchema } from '../lib/schema';

const options = [
  { value: 1, text: '1 persoon' },
  { value: 2, text: '2 personen' },
  { value: 3, text: '3 personen' }
];

const emptyNames = ['', '', ''];

export const Aantal: FC<AantalProps> = ({
  setPage,
  setAppState,
  page,
  appState
}) => {
  const [errors, setErrors] = useState([false, false, false]);

  const onChangeAantal = (ev: ChangeEvent<HTMLSelectElement>) => {
    const aantal = Number(ev.target.value);
    const { valid } = numberSchema.validate(aantal);
    if (valid)
      setAppState({
        ...appState,
        number: aantal,
        names: [...appState.names, ...emptyNames].slice(0, aantal)
      });
  };

  const onChangeName = (index: number) => (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    const names = appState.names.slice(0);
    names[index] = ev.target.value;
    setErrors({
      ...errors,
      [index]: false
    });
    setAppState({
      ...appState,
      names
    });
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    let errors: boolean[] = [];

    for (let i = 0; i < appState.names.length; i++) {
      const name = appState.names[i];
      const { valid } = nameSchema.validate(name);
      errors.push(!valid as boolean);
    }

    setErrors(errors);
    if (errors.includes(true)) return;

    setPage('reserveren');
  };

  useEffect(() => {
    if (page === 'aantal') {
      setTimeout(() => {
        document.getElementById('aantalSelect')?.focus();
      }, 500);
    }
  }, [page]);

  return (
    <>
      <Heading level="h1" size="h3">
        <span role="img" aria-label="party">
          🥳
        </span>{' '}
        Hoera!
      </Heading>
      <P>Wat leuk dat je komt! </P>
      <P className="round" style={{ backgroundImage: `url(${dance})` }} />
      <Form layout="vertical" onSubmit={onSubmit}>
        <FormFieldNativeSelect
          label="Aantal personen"
          disabled={page !== 'aantal'}
          id="aantalSelect"
          value={appState.number}
          options={options}
          onChange={onChangeAantal}
        >
          <small style={{ fontStyle: 'italic' }}>
            Met hoeveel personen van 13 jaar en ouder kom je?
          </small>
        </FormFieldNativeSelect>
        <FormFieldTextInput
          label="Namen"
          disabled={page !== 'aantal'}
          id="naam1"
          hasError={errors[0]}
          placeholder="Naam 1"
          value={appState.names[0]}
          onChange={onChangeName(0)}
        >
          {appState.number === 1 && (
            <small style={{ fontStyle: 'italic' }}>
              Namen van personen van 13 jaar en ouder.
            </small>
          )}
        </FormFieldTextInput>
        {appState.number > 1 && (
          <FormFieldTextInput
            disabled={page !== 'aantal'}
            id="naam2"
            hasError={errors[1]}
            placeholder="Naam 2"
            value={appState.names[1]}
            onChange={onChangeName(1)}
          >
            {appState.number === 2 && (
              <small style={{ fontStyle: 'italic' }}>
                Namen van personen van 13 jaar en ouder.
              </small>
            )}
          </FormFieldTextInput>
        )}
        {appState.number > 2 && (
          <FormFieldTextInput
            disabled={page !== 'aantal'}
            id="naam3"
            hasError={errors[2]}
            placeholder="Naam 3"
            value={appState.names[2]}
            onChange={onChangeName(2)}
          >
            {appState.number === 3 && (
              <small style={{ fontStyle: 'italic' }}>
                Namen van personen van 13 jaar en ouder.
              </small>
            )}
          </FormFieldTextInput>
        )}
        <FormField>
          <Row gutter={1}>
            <Col span={12} xs={12}>
              <Button
                disabled={page !== 'aantal'}
                type="submit"
                buttonType="primary"
                fluid
                size="lg"
              >
                Ga verder
              </Button>
            </Col>
            <Col span={12} xs={12}>
              <Button
                disabled={page !== 'aantal'}
                fluid
                size="lg"
                onClick={() => setPage('home')}
              >
                Annuleren
              </Button>
            </Col>
          </Row>
        </FormField>
      </Form>
    </>
  );
};

interface AantalProps {
  setPage: (page: string) => void;
  setAppState: (state: AppState) => void;
  page: string;
  appState: AppState;
}
