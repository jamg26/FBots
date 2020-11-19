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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as settingsActions from "../../actions/settings";
import * as pageActions from "../../actions/pages";
import { connect } from "react-redux";
import { uploader } from "../uploader";
import IconFont from "../icon";

const { Text } = Typography;
const { Panel } = Collapse;

const Settings = (props) => {
  const [pass, setPass] = useState(null);
  const [pageName, setPageName] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  // const [pageId, setPageId] = useState(null);
  // const [pageToken, setPageToken] = useState(null);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [id, setId] = useState(null);

  useEffect(() => {
    props.getSettings();
    props.getPages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setImage(props.settings);
  }, [props.settings]);

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
              <IconFont type="icon-delete" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Page ID",
      dataIndex: "pageid",
      key: "pageid",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Page Name",
      dataIndex: "pagename",
      key: "pagename",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Page Token",
      dataIndex: "pagetoken",
      key: "pagetoken",
      render: (text) => <Text>...{text.slice(-10)}</Text>,
    },
  ];

  const handleOk = (e) => {
    form.submit();
  };

  const onFinish = async (values) => {
    if (id) {
      await props.updatePage(id, values);
    } else {
      await props.addPage(values);
    }
    props.getPages();
    setVisible(false);
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

  const editPage = async (record) => {
    setVisible(true);
    form.setFieldsValue(record);
    setId(record);
  };

  const deletePage = async (record) => {
    await props.deletePage(record);
    props.getPages();
  };

  // const handleChangeId = (e) => {
  //   e.persist();
  //   setPageId(e.target.value);
  // };

  // const handleChangeToken = (e) => {
  //   e.persist();
  //   setPageToken(e.target.value);
  // };

  const changePassword = (e) => {
    props.changePassword(pass);
    props.getSettings();
  };

  // const changePageId = (e) => {
  //   props.changePageId(pageId);
  //   props.getSettings();
  // };

  // const changePageToken = (e) => {
  //   props.changePageToken(pageToken);
  //   props.getSettings();
  // };

  const changePageName = async (e) => {
    await props.changePageName(pageName);
    props.getSettings();
  };

  const changeLogo = async (image) => {
    const url = await uploader(image.file);
    await props.changeLogo(url.location);
    props.getSettings();
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
          <Form.Item
            name="pagename"
            rules={[{ required: true, message: "Please input Page Name!" }]}
          >
            <Input placeholder="Page Name" />
          </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col xs={24} md={18} lg={12}>
          <div style={{ padding: 10 }}>
            <Collapse>
              <Panel header="Basic" key="0">
                <Space direction="vertical">
                  <Space>
                    <Input
                      placeholder={
                        props.settings?.pageName
                          ? props.settings.pageName
                          : "Page Name"
                      }
                      onChange={handleChangePageName}
                    />
                    <Popconfirm
                      title="You sure you want to change Page Name?"
                      onConfirm={changePageName}
                    >
                      <Button>Save</Button>
                    </Popconfirm>
                  </Space>
                  <Space>
                    <Input placeholder="New Password" onChange={handleChange} />
                    <Popconfirm
                      title="You sure you want to change password?"
                      onConfirm={changePassword}
                    >
                      <Button>Save</Button>
                    </Popconfirm>
                  </Space>
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
              {/* <Panel header="Facebook Developers Panel" key="1">
             
            </Panel> */}
              <Panel header="Stripes Panel" key="2">
                <Space direction="vertical">
                  <Space>
                    <Input
                      placeholder={
                        props.settings?.stripe_public
                          ? props.settings.stripe_public
                          : "Public Key"
                      }
                      onChange={handleChangeStripePublicKey}
                    />
                    <Popconfirm
                      title="You sure you want to Public Key?"
                      onConfirm={changeStripePublicKey}
                    >
                      <Button>Save</Button>
                    </Popconfirm>
                  </Space>
                  <Space>
                    <Input
                      placeholder={
                        props.settings?.stripe_secret
                          ? props.settings.stripe_secret
                          : "Secret Key"
                      }
                      onChange={handleChangeStripeSecretKey}
                    />
                    <Popconfirm
                      title="You sure you want to change Secret Key?"
                      onConfirm={changeStripeSecretKey}
                    >
                      <Button>Save</Button>
                    </Popconfirm>
                  </Space>
                </Space>
              </Panel>
            </Collapse>
          </div>
        </Col>
        <Col xs={24} md={24} lg={24}>
          <Table
            title={() => (
              <>
                <Button onClick={addPage}>
                  <IconFont type="icon-createnewpost" />
                </Button>
              </>
            )}
            columns={columns}
            dataSource={props.pages}
            rowKey="_id"
            size="small"
            style={{ padding: 10 }}
          />
        </Col>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
