import React from "react";
import FacebookButton from "./fb";
import FacebookTable from "./fbTable";
import FacebookForm from "./fbForm";
import { Modal, Form, Card } from "antd";
import { connect } from "react-redux";
import * as pageActions from "../../../actions/pages";

const FacebookPanel = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [form] = Form.useForm();

  React.useEffect(() => {
    props.getPages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOk = (e) => {
    form.submit();
  };
  const handleCancel = (e) => {
    setVisible(false);
    // setId(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    setVisible(false);
    if (id) {
      await props.updatePage(id, values);
    } else {
      await props.addPage(values);
    }
    props.getPages();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const addPage = () => {
    form.resetFields();
    setVisible(true);
    setId(null);
  };

  const editPage = async (record) => {
    setVisible(true);
    form.setFieldsValue(record);
    setId(record);
  };

  const deletePage = async (record) => {
    await props.deletePage(record);
    props.getPages();
  };

  return (
    <Card>
      <Modal
        title="Facebook Page Setting"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FacebookForm
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
        />
      </Modal>
      <FacebookButton addPage={props.addPage} getPages={props.getPages} />
      <FacebookTable
        addPage={addPage}
        editPage={editPage}
        deletePage={deletePage}
        pages={props.pages}
      />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    pages: state.pages?.get_all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPages: () => dispatch(pageActions.getPages()),
    addPage: (data) => dispatch(pageActions.addPage(data)),
    deletePage: (data) => dispatch(pageActions.deletePage(data)),
    updatePage: (id, data) => dispatch(pageActions.updatePage(id, data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FacebookPanel);
