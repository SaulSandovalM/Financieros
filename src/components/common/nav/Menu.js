import React from 'react'
import { bool } from 'prop-types'
import Nav from './Nav'
import NavC from './NavC'
import NavE from './NavE'
import NavN from './NavN'
import NavArchivos from './NavArchivos'
import { StyledMenu } from './Menu.styled'
import firebase from '../../../Firebase'

const Menu = ({ open, ...props }) => {
  var user = firebase.auth().currentUser
  var email

  if (user != null) {
    email = user.email
  }

  let admin
  if (email === 'administrador@procu.com') {
    admin = 'ADMIN'
  } else if (email === 'cecilia@procu.com') {
    admin = 'CECILIA'
  } else if (email === 'nayra@procu.com') {
    admin = 'NAYRA'
  } else if (email === 'laura@procu.com') {
    admin = 'LAURA'
  } else if (email === 'miguel@procu.com') {
    admin = 'MIGUEL'
  } else if (email === 'teresa@procu.com') {
    admin = 'TERESA'
  } else if (email === 'marcos@procu.com') {
    admin = 'MARCOS'
  } else if (email === 'eloy@procu.com') {
    admin = 'ELOY'
  } else if (email === 'karina@procu.com') {
    admin = 'KARINA'
  } else if (email === 'martha@procu.com') {
    admin = 'MARTHA'
  } else if (email === 'lilia@procu.com') {
    admin = 'LILIA'
  } else if (email === 'cenely@procu.com') {
    admin = 'CENELY'
  } else if (email === 'hector@procu.com') {
    admin = 'HECTOR'
  } else if (email === 'omar@procu.com') {
    admin = 'OMAR'
  } else if (email === 'eli@procu.com') {
    admin = 'ELI'
  }

  const isHidden = open !== false

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      {admin === 'ADMIN' && <Nav />}
      {admin === 'OMAR' && <Nav />}
      {admin === 'LILIA' && <Nav />}
      {admin === 'HECTOR' && <Nav />}
      {admin === 'CENELY' && <Nav />}
      {admin === 'KARINA' && <Nav />}
      {admin === 'ELOY' && <Nav />}
      {admin === 'MIGUEL' && <Nav />}
      {admin === 'TERESA' && <Nav />}
      {admin === 'MARCOS' && <Nav />}
      {admin === 'MARTHA' && <Nav />}
      {admin === 'NAYRA' && <NavN />}
      {admin === 'ELI' && <NavE />}
      {admin === 'CECILIA' && <NavC />}
      {admin === 'JUAN' && <NavArchivos />}
      {/* admin === 'LAURA' && <Nav /> */}
      {/* admin === 'JUAN' && <Nav /> */}
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired
}

export default Menu
