import React from 'react'
import { bool } from 'prop-types'
import Nav from './Nav'
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
  } else if (email === 'cecilia@procuraduria.com') {
    admin = 'CECILIA'
  } else if (email === 'alfredo@procuraduria.com') {
    admin = 'ALFREDO'
  } else if (email === 'nayra@procuraduria.com') {
    admin = 'NAYRA'
  } else if (email === 'lizbeth@procuraduria.com') {
    admin = 'LIZBETH'
  } else if (email === 'miguel@procuraduria.com') {
    admin = 'MIGUEL'
  } else if (email === 'teresa@procuraduria.com') {
    admin = 'TERESA'
  } else if (email === 'marcos@procuraduria.com') {
    admin = 'MARCOS'
  } else if (email === 'eloy@procuraduria.com') {
    admin = 'ELOY'
  } else if (email === 'karina@procuraduria.com') {
    admin = 'KARINA'
  } else if (email === 'martha@procuraduria.com') {
    admin = 'MARTHA'
  } else if (email === 'lilia@procuraduria.com') {
    admin = 'LILIA'
  } else if (email === 'cenely@procuraduria.com') {
    admin = 'CENELY'
  } else if (email === 'hector@procuraduria.com') {
    admin = 'HECTOR'
  } else if (email === 'omar@procuraduria.com') {
    admin = 'OMAR'
  } else if (email === 'elizabeth@procuraduria.com') {
    admin = 'ELI'
  } else if (email === 'juan@procuraduria.com') {
    admin = 'JUAN'
  }

  const isHidden = open !== false

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      {admin === 'CECILIA' && <Nav />}
      {admin === 'ALFREDO' && <Nav />}
      {admin === 'NAYRA' && <Nav />}
      {admin === 'ELI' && <Nav />}
      {admin === 'MIGUEL' && <Nav />}
      {admin === 'OMAR' && <Nav />}
      {admin === 'LILIA' && <Nav />}
      {admin === 'HECTOR' && <Nav />}
      {admin === 'CENELY' && <Nav />}
      {admin === 'KARINA' && <Nav />}
      {admin === 'ELOY' && <Nav />}
      {admin === 'TERESA' && <Nav />}
      {admin === 'MARCOS' && <Nav />}
      {admin === 'MARTHA' && <Nav />}
      {admin === 'JUAN' && <Nav />}
      {admin === 'LIZBETH' && <Nav />}
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired
}

export default Menu
