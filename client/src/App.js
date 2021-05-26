import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/";
import Signin from "./components/Signin";
// import Signup from "./components/Signup";
// import Feature from "./components/Feature";
import Signout from "./components/Signout";
import Users from "./components/Users";
import StripeComponent from "./components/Payments/stripe";
import FBOauthPage from "./components/Settings/Facebook/FbOauthPage";
import "./App.less";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signout" component={Signout} />
      <Route path="/admin" component={Users} />
      <Route path="/stripe/:pageid/:orderid/:pk" component={StripeComponent} />
      <Route path="/oauth/fb" component={FBOauthPage} />
    </BrowserRouter>
  );
}

export default App;
