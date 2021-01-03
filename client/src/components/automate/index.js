import React, { useState, useEffect } from "react";
import { Modal, Form } from "antd";
import { connect } from "react-redux";

import * as automatedActions from "../../actions/automated";

import AutomateTable from "./table";
import AutomateForm from "./form";

const AutomatedResponses = (props) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    props.getAutomated();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <AutomateForm
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
        />
      </Modal>
      <AutomateTable
        addAutomate={addAutomate}
        deleteAutomated={deleteAutomated}
        editAutomated={editAutomated}
        automated={props.automated}
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
