import React from "react";
import { Form, Input, Mentions } from "antd";

const { Option } = Mentions;

const AutomateForm = (props) => {
  return (
    <>
      <Form
        name="basic"
        onFinish={props.onFinish}
        form={props.form}
        size="large"
        onFinishFailed={props.onFinishFailed}
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
            <Option value="name}">{"{name}"}</Option>
          </Mentions>
        </Form.Item>
      </Form>
    </>
  );
};

export default AutomateForm;
