import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const Signout = (props) => {
  useEffect(() => {
    props.signout();
    props.history.push("/signin");
  }, [props]);

  return <h3>Sign out!</h3>;
};

export default connect(null, actions)(Signout);
