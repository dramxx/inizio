import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import handleErrors from '../utils/handleErrors';
import axios from 'axios';

const userLoginTemplate = {
  email: '',
  password: '',
};

const Signup = () => {
  const [user, setUser] = useState(userLoginTemplate);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isUser = Object.values(user).every(el => !!el);
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setUser(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setLoading(true);
      setError('');
      await axios.post(`https://test-api.inizio.cz/api/user/login`, {
        'email': user.email,
        'password': user.password,
      }).
          then((res) => console.log(res.data)).
          catch((err) => console.log(err));
    } catch (error) {
      handleErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <Message
            attached
            icon='privacy'
            header='Welcome Back!'
            content='Log in with your email and password'
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
                icon='envelope'
                iconPosition='left'
                label='Email'
                placeholder='Email'
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
                placeholder='Password'
                name='password'
                type='password'
                value={ user.password }
                onChange={ handleChange }
            />
            <Button
                disabled={ disabled || loading }
                icon='sign in'
                type='submit'
                color='orange'
                content='Login'
            />
          </Segment>
        </Form>
        <Message warning attached='bottom'>
          <Icon name='help'/>
          New user?{ ' ' }
          <Link href='/signup'>
            Sign up
          </Link>{ ' ' }here, please.
        </Message>
      </>
  );
};

export default Signup;
