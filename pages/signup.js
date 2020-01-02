import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import handleErrors from '../utils/handleErrors';
import axios from 'axios';

const userRegisterTemplate = {
  email: '',
  password: '',
  name: '',
  surname: '',
};

const Signup = () => {

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(userRegisterTemplate);

  useEffect(() => {
    setDisabled(!Object.values(user).every(val => !!val));
  }, [user]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    try {
      setLoading(true);
      setError('');
      await axios.post(`https://test-api.inizio.cz/api/user`, {
        email: user.email,
        password: user.password,
        name: user.name,
        lastname: user.surname,
      }).
          then((res) => console.log(res.data)).
          catch((err) => console.log(err));
    } catch (err) {
      handleErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <Message
            attached
            icon='settings'
            header='Get Started!'
            content='Register a new account'
            color='blue'
        />
        <Form
            onSubmit={ handleSubmit }
            loading={ loading }
            error={ !!error }
        >
          <Message error header='Something breaks horribly..'
                   content={ error }/>
          <Segment>
            <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                label='Name'
                placeholder='insert name here'
                name='name'
                value={ user.name }
                onChange={ handleChange }
            />
            <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                label='Surname'
                placeholder='insert surname here'
                name='surname'
                value={ user.surname }
                onChange={ handleChange }
            />
            <Form.Input
                fluid
                icon='envelope'
                iconPosition='left'
                label='Email'
                placeholder='insert email here'
                name='email'
                type='email'
                value={ user.email }
                onChange={ handleChange }
            />
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                label='Password'
                placeholder='insert email here'
                name='password'
                type='password'
                value={ user.password }
                onChange={ handleChange }
            />
            <Button
                icon='signup'
                type='submit'
                color='orange'
                content='Signup'
                disabled={ disabled || loading }
            />
          </Segment>
        </Form>
        <Message warning attached='bottom'>
          <Icon name='help'/>
          Do you already have an account?{ ' ' }
          <Link href='/login'>
            Log in
          </Link>{ ' ' }here, please.
        </Message>
      </>
  );
};

export default Signup;
