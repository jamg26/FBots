import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../actions";
import { compose } from "redux";

const Signup = (props) => {
  const { handleSubmit } = props;

  const onSubmit = (formProps) => {
    props.signup(formProps, () => {
      props.history.push("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label>Email</label>
        <Field name="email" type="text" component="input" autoComplete="none" />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <Field
          name="password"
          type="password"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <p>{props.errorMessage}</p>
      <button>Submit</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
  };
};

export default compose(
  reduxForm({ form: "signup" }),
  connect(mapStateToProps, actions)
)(Signup);
