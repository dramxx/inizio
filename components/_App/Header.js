import React from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Container, Icon, Image, Menu } from 'semantic-ui-react';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = () => {
  const router = useRouter();
  const isLoggedIn = false;

  const isMenuItemActive = (route) => {
    return route === router.pathname;
  };

  return (
      <Menu fluid id='menu' inverted>
        <Container text>
          <Link href='/'>
            <Menu.Item header active={isMenuItemActive('/')}>
              <Image
                  size='mini'
                  src='/static/logo.svg'
                  style={{ marginRight: '1em' }}
              />
              Inizio
            </Menu.Item>
          </Link>

          {isLoggedIn?(
              <>
                <Link href='/account'>
                  <Menu.Item header active={isMenuItemActive('/account')}>
                    <Icon name='user' size='large'/>
                    Account
                  </Menu.Item>
                </Link>

                <Menu.Item header>
                  <Icon name='sign out' size='large'/>
                  Logout
                </Menu.Item>
              </>
          ):(
              <>
                <Link href='/login'>
                  <Menu.Item header active={isMenuItemActive('/login')}>
                    <Icon name='sign in' size='large'/>
                    Login
                  </Menu.Item>
                </Link>

                <Link href='/signup'>
                  <Menu.Item header active={isMenuItemActive('/login')}>
                    <Icon name='signup' size='large'/>
                    Sign Up
                  </Menu.Item>
                </Link>
              </>
          )}
        </Container>
      </Menu>
  );
};

export default Header;
