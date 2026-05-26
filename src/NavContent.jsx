import React from "react";
import { Link } from "react-router-dom";
import "./NavContent.css";

export const NavContent = (props) => {
  return (
    <Link className="nav-links-div" to={props.link}>
      {props.name}
    </Link>
  );
};
