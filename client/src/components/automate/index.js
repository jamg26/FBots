import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Popconfirm,
  Mentions,
} from "antd";
import { connect } from "react-redux";
import * as automatedActions from "../../actions/automated";
import IconFont from "../icon";

const { Text } = Typography;
const { Option } = Mentions;

const AutomatedResponses = (props) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    props.getAutomated();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => editAutomated(record)}>
            <IconFont type="icon-EditDocument" />
          </Button>
          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => deleteAutomated(record)}
          >
            <Button size="small">
              <IconFont type="icon-delete_database" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Keyword",
      dataIndex: "question",
      key: "question",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
      render: (text) => <Text>{text}</Text>,
    },
  ];

  const deleteAutomated = async (record) => {
    await props.deleteAutomated(record);
    props.getAutomated();
  };

  const editAutomated = async (record) => {
    setVisible(true);
    form.setFieldsValue(record);
    setId(record);
  };

  const handleOk = (e) => {
    form.submit();
  };

  const onFinish = async (values) => {
    setVisible(false);
    if (id) {
      await props.updateAutomated(id, values);
    } else {
      await props.addAutomated(values);
    }
    props.getAutomated();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    //console.log(errorInfo);
  };

  const handleCancel = (e) => {
    setVisible(false);
    setId(null);
    form.resetFields();
  };

  const addAutomate = () => {
    form.resetFields();
    setVisible(true);
    setId(null);
  };

  return (
    <>
      <Modal
        title="Automated Response"
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
            name="question"
            rules={[{ required: true, message: "Please input your keyword!" }]}
          >
            <Input placeholder="Keyword" />
          </Form.Item>
          <Form.Item
            name="response"
            rules={[{ required: true, message: "Please input your response!" }]}
          >
            <Mentions
              rows="4"
              placeholder="You can use {name} to ref customer name."
              prefix="{"
            >
              <Option value="name}">{"{name}"} - Fullname</Option>
            </Mentions>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        title={() => (
          <Button onClick={addAutomate}>
            <IconFont type="icon-add_database" />
          </Button>
        )}
        columns={columns}
        dataSource={props.automated}
        rowKey="_id"
        size="small"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    automated: state.automated.get_all,
  };
};

export default connect(mapStateToProps, automatedActions)(AutomatedResponses);
