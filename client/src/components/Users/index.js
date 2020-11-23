import React, { useEffect, useState } from "react";
import * as userActions from "../../actions/user";
import { connect } from "react-redux";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Popconfirm,
} from "antd";
import IconFont from "../icon";

const { Text } = Typography;

const UsersComponent = (props) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    props.getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => deleteUser(record)}
          >
            <Button>
              <IconFont type="icon-delete1" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text>{text}</Text>,
    },
  ];

  const deleteUser = (user) => {
    props.deleteUser(user);
    props.getUsers();
  };

  const handleOk = (e) => {
    form.submit();
  };

  const onFinish = async (values) => {
    await props.signup(values);
    props.getUsers();
    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const handleCancel = (e) => {
    setVisible(false);
    form.resetFields();
  };

  const addUser = () => {
    form.resetFields();
    setVisible(true);
  };

  return (
    <>
      <Modal
        title="Add User"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          form={form}
          size="large"
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        title={() => (
          <Button onClick={addUser}>
            <IconFont type="icon-add" />
          </Button>
        )}
        columns={columns}
        dataSource={props.users}
        rowKey="_id"
        size="small"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.get_all,
  };
};

export default connect(mapStateToProps, userActions)(UsersComponent);
