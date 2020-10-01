import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import {
  Form,
  Heading,
  P,
  FormFieldTextInput,
  FormField,
  Button,
  Spinner
} from 'maeven';

import sad from '../assets/sad.gif';
import { nameSchema } from '../lib/schema';
import { cancelsAgent } from '../lib/agent';

export const Jammer: FC<JammerProps> = ({ page, setPage }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const onChangeName = (ev: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setName(ev.target.value);
  };

  const onCancel = () => {
    setName('');
    setError(false);
    setPage('home');
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (error) return;

    setLoading(true);

    const { valid } = nameSchema.validate(name);

    if (!valid) {
      setError(true);
      setLoading(false);
      document.getElementById('jammerName')?.focus();
      return;
    }

    await cancelsAgent.create(name);

    setDone(true);
  };

  useEffect(() => {
    if (page === 'jammer') {
      setTimeout(() => {
        document.getElementById('jammerName')?.focus();
      }, 500);
    }
  }, [page]);

  return (
    <>
      <Heading level="h1" size="h3">
        Jammer
      </Heading>
      <P>
        Jammer dat je er niet bij bent. Wil je hieronder je naam invullen, dan
        weet ik dat je niet komt.
      </P>
      <P className="round" style={{ backgroundImage: `url(${sad})` }} />
      {done ? (
        <P>Bedankt voor het doorgeven!</P>
      ) : (
        <Spinner spinning={loading} size={48} color="primary">
          <Form layout="vertical" onSubmit={onSubmit}>
            <FormFieldTextInput
              disabled={page !== 'jammer' || loading}
              label="Je naam"
              id="jammerName"
              value={name}
              name="name"
              onChange={onChangeName}
              hasError={error}
            ></FormFieldTextInput>
            <FormField>
              <Button
                disabled={page !== 'jammer' || loading}
                type="submit"
                buttonType="primary"
              >
                Opslaan
              </Button>
              <Button
                disabled={page !== 'jammer' || loading}
                onClick={onCancel}
              >
                Annuleren
              </Button>
            </FormField>
          </Form>
        </Spinner>
      )}
    </>
  );
};

interface JammerProps {
  setPage: (page: string) => void;
  page: string;
}
