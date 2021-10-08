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
  if (email === 'cecilia@procuraduria.com') {
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
  } else if (email === 'candy@procuraduria.com') {
    admin = 'CANDY'
  } else if (email === 'angel@procuraduria.com') {
    admin = 'VALIDACION2'
  } else if (email === 'danya@procuraduria.com') {
    admin = 'VALIDACION2'
  } else if (email === 'mario@procuraduria.com') {
    admin = 'VALIDACION3'
  } else if (email === 'hortensia@procuraduria.com') {
    admin = 'VALIDACION3'
  }

  const isHidden = open !== false

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      {(admin === 'CANDY' ||
        admin === 'VALIDACION2' ||
        admin === 'VALIDACION2' ||
        admin === 'VALIDACION3' ||
        admin === 'VALIDACION3' ||
        admin === 'CECILIA' ||
        admin === 'ALFREDO' ||
        admin === 'NAYRA' ||
        admin === 'ELI' ||
        admin === 'MIGUEL' ||
        admin === 'OMAR' ||
        admin === 'LILIA' ||
        admin === 'HECTOR' ||
        admin === 'CENELY' ||
        admin === 'KARINA' ||
        admin === 'ELOY' ||
        admin === 'TERESA' ||
        admin === 'MARCOS' ||
        admin === 'MARTHA' ||
        admin === 'JUAN' ||
        admin === 'LIZBETH'
      ) && <Nav />}
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired
}

export default Menu
