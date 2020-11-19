import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
// import Signup from "./components/Signup";
// import Feature from "./components/Feature";
import Signout from "./components/Signout";
import Users from "./components/Users";
import StripeComponent from "./components/Payments/stripe";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signout" component={Signout} />
      <Route path="/admin" component={Users} />
      <Route path="/stripe/:pageid/:orderid" component={StripeComponent} />
    </BrowserRouter>
  );
}

export default App;
