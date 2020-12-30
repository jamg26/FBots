import React from "react";
import { Table, Space, Button, Typography, Popconfirm } from "antd";
import { connect } from "react-redux";
import * as customerActions from "../../actions/customer";
import IconFont from "../icon";

const { Text } = Typography;
const Customers = (props) => {
  React.useEffect(() => {
    props.getCustomers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => removeCustomer(text)}
          >
            <Button size="small">
              <IconFont type="icon-delete_database" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Page",
      dataIndex: "page",
      key: "page",
      render: (text) => <Text>{text.pagename}</Text>,
    },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <Text>
          {new Date(text).toLocaleString("en-US", {
            hour12: true,
          })}
        </Text>
      ),
    },
  ];

  const removeCustomer = async (data) => {
    await props.removeCustomer(data);
    props.getCustomers();
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.customers}
        rowKey="_id"
        size="small"
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
