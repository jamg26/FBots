import React, { useState, useEffect } from "react";
import { Row, Col, Collapse, Modal, Form } from "antd";
import * as settingsActions from "../../actions/settings";
import * as pageActions from "../../actions/pages";
import * as userActions from "../../actions/user";
import { connect } from "react-redux";
import { uploader } from "../uploader";
import FacebookButton from "./fb";
import FacebookTable from "./fbTable";
import FacebookForm from "./fbForm";
import BasicPanel from "./basicPanel";
import StripePanel from "./stripePanel";
import Slide from "react-reveal/Slide";
import TipsComponent from "./tips";

const { Panel } = Collapse;

const Settings = (props) => {
  const [pass, setPass] = useState(null);
  const [pageName, setPageName] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [emails, setEmails] = useState(null);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [id, setId] = useState(null);

  //width
  const [width, setWidth] = useState(window.innerWidth);
  //const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    props.getSettings();
    props.getPages();
    props.getCurrentUser();
    window.addEventListener("resize", updateDimensions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setImage(props.settings);
  }, [props.settings]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  };

  const handleOk = (e) => {
    form.submit();
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

  const handleCancel = (e) => {
    setVisible(false);
    // setId(null);
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

  const handleChange = (e) => {
    e.persist();
    setPass(e.target.value);
  };

  const handleChangePageName = (e) => {
    e.persist();
    setPageName(e.target.value);
  };

  const handleChangeStripePublicKey = (e) => {
    e.persist();
    setPublicKey(e.target.value);
  };

  const handleChangeStripeSecretKey = (e) => {
    e.persist();
    setSecretKey(e.target.value);
  };

  const changeStripePublicKey = async (e) => {
    await props.changeStripePublicKey(publicKey);
    props.getSettings();
  };

  const changeStripeSecretKey = async (e) => {
    await props.changeStripeSecretKey(secretKey);
    props.getSettings();
  };

  const handleChangeEmails = (e) => {
    e.persist();
    setEmails(e.target.value);
  };

  const changeEmails = async (e) => {
    await props.changeEmails(emails);
    props.getSettings();
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

  const changePassword = (e) => {
    props.changePassword(pass);
    props.getSettings();
  };

  const changePageName = async (e) => {
    await props.changePageName(pageName);
    props.getSettings();
  };

  const changeLogo = async (image) => {
    const url = await uploader(image.file);
    const imgKit = url.location.replace(
      "https://ecommerce26.s3-ap-southeast-1.amazonaws.com/fb_cpanel_bot/",
      "https://ik.imagekit.io/jamg/"
    );
    await props.changeLogo(`${imgKit}?tr=w-100,h-100`);
    props.getSettings();
  };

  const textInputWidth = () => {
    return width > 991 ? "50%" : "100%";
  };

  return (
    <>
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
      <Row>
        {width < 991 ? (
          <Col md={24} lg={9} xs={24} sm={24}>
            <Slide top>
              <TipsComponent />
            </Slide>
          </Col>
        ) : null}

        <Col xs={24} md={24} lg={15} sm={24}>
          {/* <div style={{ padding: 10 }}> */}
          <Collapse defaultActiveKey={[]}>
            <Panel header="Basic Settings" key="0">
              <BasicPanel
                settings={props.settings}
                changePageName={changePageName}
                handleChangePageName={handleChangePageName}
                textInputWidth={textInputWidth}
                profile={props.profile}
                handleChange={handleChange}
                changePassword={changePassword}
                handleChangeEmails={handleChangeEmails}
                changeEmails={changeEmails}
                changeLogo={changeLogo}
                image={image}
              />
            </Panel>
            <Panel header="Facebook Panel" key="1">
              <FacebookButton
                addPage={props.addPage}
                getPages={props.getPages}
              />
              <FacebookTable
                addPage={addPage}
                editPage={editPage}
                deletePage={deletePage}
                pages={props.pages}
              />
            </Panel>
            <Panel header="Stripes Panel" key="2">
              <StripePanel
                settings={props.settings}
                handleChangeStripePublicKey={handleChangeStripePublicKey}
                changeStripePublicKey={changeStripePublicKey}
                changeStripeSecretKey={changeStripeSecretKey}
                handleChangeStripeSecretKey={handleChangeStripeSecretKey}
                textInputWidth={textInputWidth}
              />
            </Panel>
          </Collapse>
          {/* </div> */}
        </Col>

        {width > 991 ? (
          <Col md={18} lg={9}>
            <Slide right>
              <TipsComponent />
            </Slide>
          </Col>
        ) : null}
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings?.get,
    pages: state.pages?.get_all,
    profile: state.users?.get,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSettings: () => dispatch(settingsActions.getSettings()),
    getPages: () => dispatch(pageActions.getPages()),
    addPage: (data) => dispatch(pageActions.addPage(data)),
    deletePage: (data) => dispatch(pageActions.deletePage(data)),
    updatePage: (id, data) => dispatch(pageActions.updatePage(id, data)),
    changePassword: (pass) => dispatch(settingsActions.changePassword(pass)),
    changePageName: (data) => dispatch(settingsActions.changePageName(data)),
    changeLogo: (data) => dispatch(settingsActions.changeLogo(data)),
    changeStripeSecretKey: (key) =>
      dispatch(settingsActions.changeStripeSecretKey(key)),
    changeStripePublicKey: (key) =>
      dispatch(settingsActions.changeStripePublicKey(key)),
    changeEmails: (emails) => dispatch(settingsActions.changeEmails(emails)),
    getCurrentUser: () => dispatch(userActions.getCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
