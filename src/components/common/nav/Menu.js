import React from 'react';
import { bool } from 'prop-types';
import Nav from './Nav';
import NavC from './NavC';
import NavE from './NavE';
import NavN from './NavN';
import { StyledMenu } from './Menu.styled';
import firebase from '../../../Firebase';

const Menu = ({ open, ...props }) => {

  var user = firebase.auth().currentUser;
  var email;

  if (user != null) {
    email = user.email;
  }

  let admin;
  if (email === 'administrador@procu.com') {
    admin = 'ADMIN';
  } else if (email === 'cecilia@procu.com') {
    admin = 'CECILIA'
  } else if (email === 'nayra@procu.com') {
    admin = 'NAYRA';
  } else if (email === 'laura@procu.com') {
    admin = 'LAURA';
  } else if (email === 'miguel@procu.com') {
    admin = 'MIGUEL';
  } else if (email === 'teresa@procu.com') {
    admin = 'TERESA';
  } else if (email === 'marcos@procu.com') {
    admin = 'MARCOS';
  } else if (email === 'eloy@procu.com') {
    admin = 'ELOY';
  } else if (email === 'karina@procu.com') {
    admin = 'KARINA';
  } else if (email === 'martha@procu.com') {
    admin = 'MARTHA';
  } else if (email === 'lilia@procu.com') {
    admin = 'LILIA';
  } else if (email === 'cenely@procu.com') {
    admin = 'CENELY';
  } else if (email === 'hector@procu.com') {
    admin = 'HECTOR';
  } else if (email === 'omar@procu.com') {
    admin = 'OMAR';
  } else if (email === 'fer@procu.com') {
   admin = 'FERNANDA';
  } else if (email === 'eli@prueba.com') {
    admin = 'ELI';
  }

  const isHidden = open ? true : false;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      {admin === 'ADMIN' && <NavE /> }
      {admin === 'CECILIA' && <NavC /> }
      {admin === 'ELI' && <NavE /> }
      {admin === 'NAYRA' && <NavN /> }
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;
