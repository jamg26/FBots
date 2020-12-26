import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Button } from "antd";

const Signout = (props) => {
  // useEffect(() => {

  // }, [props]);

  const signOut = () => {
    document.title = "FBOTS";
    props.signout();
    //props.history.push("/signin");
  };

  return (
    <h3>
      <Button onClick={signOut}>Sign me out</Button>
    </h3>
  );
};

export default connect(null, actions)(Signout);
