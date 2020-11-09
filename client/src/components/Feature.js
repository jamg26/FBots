import React from 'react';
import requireAuth from './requireAuth';

const Feature = (props) => {
  return <h3>Feature!</h3>;
};

export default requireAuth(Feature);
