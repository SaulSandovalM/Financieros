import React from "react";
import { bool } from "prop-types";
import Nav from "./Nav";
import { StyledMenu } from "./Menu.styled";
import firebase from "../../../Firebase";

const Menu = ({ open, ...props }) => {
  var user = firebase.auth().currentUser;
  var email;

  if (user != null) {
    email = user.email;
  }

  let admin;

  const isHidden = open !== false;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <Nav />
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
