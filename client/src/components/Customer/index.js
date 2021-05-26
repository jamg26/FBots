import { useEffect } from "react";
import { connect } from "react-redux";
import * as customerActions from "../../actions/customer";
import CustomerTable from "./table";

const Customers = (props) => {
  useEffect(() => {
    props.getCustomers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const removeCustomer = async (data) => {
    await props.removeCustomer(data);
    props.getCustomers();
  };

  return (
    <>
      <CustomerTable
        removeCustomer={removeCustomer}
        customers={props.customers}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    customers: state.customers?.get_all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomers: () => dispatch(customerActions.getCustomers()),
    removeCustomer: (data) => dispatch(customerActions.removeCustomer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
