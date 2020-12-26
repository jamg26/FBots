import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Space,
  Popconfirm,
  Upload,
  Typography,
  Collapse,
  Table,
  Modal,
  Form,
  Divider,
  Card,
  Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as settingsActions from "../../actions/settings";
import * as pageActions from "../../actions/pages";
import * as userActions from "../../actions/user";
import { connect } from "react-redux";
import { uploader } from "../uploader";
import IconFont from "../icon";
import FacebookButton from "./fb";

const { Text } = Typography;
const { Panel } = Collapse;

const Settings = (props) => {
  const [pass, setPass] = useState(null);
  const [pageName, setPageName] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [emails, setEmails] = useState(null);
  // const [pageId, setPageId] = useState(null);
  // const [pageToken, setPageToken] = useState(null);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [id, setId] = useState(null);

  //width
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

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
    setHeight(window.innerHeight);
  };

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => editPage(record)}>
            <IconFont type="icon-EditDocument" />
          </Button>

          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => deletePage(record)}
          >
            <Button size="small">
              <IconFont type="icon-delete_database" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Page ID",
      dataIndex: "pageid",
      key: "pageid",
      render: (text) => <Text copyable>{text}</Text>,
    },
    {
      title: "Page Name",
      dataIndex: "pagename",
      key: "pagename",
      responsive: ["md"],
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Page Token",
      dataIndex: "pagetoken",
      key: "pagetoken",
      responsive: ["md"],
      render: (text) => (
        <Tooltip title={text}>
          <Text>...{text.slice(-10)}</Text>
        </Tooltip>
      ),
    },
  ];

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

  // const changeCover = async (image) => {
  //   const url = await uploader(image.file);
  //   await props.changeCover(url.location);
  //   props.getSettings();
  // };

  return (
    <>
      <Modal
        title="Facebook Page Setting"
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
            name="pagename"
            rules={[{ required: true, message: "Please input Page Name!" }]}
          >
            <Input placeholder="Page Name" />
          </Form.Item>
          <Form.Item
            name="pageid"
            rules={[{ required: true, message: "Please input Page ID!" }]}
          >
            <Input placeholder="Page ID" />
          </Form.Item>
          <Form.Item
            name="pagetoken"
            rules={[{ required: true, message: "Please input Page Token!" }]}
          >
            <Input.TextArea rows={4} placeholder="Page Token" />
          </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col xs={24} md={24} lg={15}>
          {/* <div style={{ padding: 10 }}> */}
          <Collapse defaultActiveKey={["0", "1", "2"]}>
            <Panel header="Basic" key="0">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Page Name</Text>

                <Input
                  placeholder="Page Name"
                  defaultValue={props.settings?.pageName}
                  onChange={handleChangePageName}
                  style={{ width: textInputWidth() }}
                />

                <Popconfirm
                  title="You sure you want to change Page Name?"
                  onConfirm={changePageName}
                >
                  <Button>Save</Button>
                </Popconfirm>
              </Space>

              <Divider />

              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Email</Text>
                <Text strong>{props.profile?.email}</Text>

                <Text>Password</Text>
                <Input
                  placeholder="New Password"
                  onChange={handleChange}
                  style={{ width: textInputWidth() }}
                />
                <Popconfirm
                  title="You sure you want to change password?"
                  onConfirm={changePassword}
                >
                  <Button>Save</Button>
                </Popconfirm>
              </Space>

              <Divider />

              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Notification emails are separated by comma (,)</Text>

                <Input.TextArea
                  placeholder="Notification Emails"
                  onChange={handleChangeEmails}
                  rows={4}
                  defaultValue={
                    props.settings?.emails ? props.settings.emails : null
                  }
                  style={{ width: textInputWidth() }}
                />

                <Popconfirm
                  title="You sure you want to change?"
                  onConfirm={changeEmails}
                >
                  <Button>Save</Button>
                </Popconfirm>
              </Space>

              <Divider />

              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Change Logo (Ratio 1:1)</Text>
                <Upload
                  fileList=""
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={changeLogo}
                >
                  <div>
                    {image ? (
                      <img
                        src={image.logo_url}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <>
                        <PlusOutlined />{" "}
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </>
                    )}
                  </div>
                </Upload>
              </Space>
            </Panel>
            <Panel header="Facebook Panel" key="1">
              <FacebookButton
                addPage={props.addPage}
                getPages={props.getPages}
              />
              <Table
                title={() => (
                  <Space>
                    <Button onClick={addPage}>
                      <IconFont type="icon-add_database" />
                    </Button>
                  </Space>
                )}
                columns={columns}
                dataSource={props.pages}
                rowKey="_id"
                size="small"
                style={{ padding: 10 }}
              />
            </Panel>
            <Panel header="Stripes Panel" key="2">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Stripe Public Key</Text>
                <Input
                  placeholder={
                    props.settings?.stripe_public
                      ? props.settings.stripe_public
                      : "Public Key"
                  }
                  onChange={handleChangeStripePublicKey}
                  style={{ width: textInputWidth() }}
                />
                <Popconfirm
                  title="You sure you want to Public Key?"
                  onConfirm={changeStripePublicKey}
                >
                  <Button>Save</Button>
                </Popconfirm>
              </Space>

              <Divider />

              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Stripe Secret Key</Text>
                <Input
                  placeholder={
                    props.settings?.stripe_secret
                      ? props.settings.stripe_secret
                      : "Secret Key"
                  }
                  onChange={handleChangeStripeSecretKey}
                  style={{ width: textInputWidth() }}
                />
                <Popconfirm
                  title="You sure you want to change Secret Key?"
                  onConfirm={changeStripeSecretKey}
                >
                  <Button>Save</Button>
                </Popconfirm>
              </Space>
            </Panel>
          </Collapse>
          {/* </div> */}
        </Col>

        {width > 991 ? (
          <Col md={18} lg={9}>
            <Card>
              <Space direction="vertical">
                <Text type="danger">DANGER ZONE!</Text>
                <Text>
                  Do not change any of the configurations unless you know what
                  you're doing. Misconfiguration might cause Messenger Bot
                  malfunctioning.
                </Text>
              </Space>
            </Card>
          </Col>
        ) : null}

        {/* <Text>Change Cover</Text>

            <Upload
              fileList=""
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={changeCover}
            >
              <div>
                {image ? (
                  <img
                    src={image.cover_url}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <>
                    <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
                  </>
                )}
              </div>
            </Upload> */}
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
