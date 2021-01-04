import React from "react";
import {
  Input,
  Button,
  Space,
  Popconfirm,
  Upload,
  Typography,
  Divider,
  Card,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as settingsActions from "../../../actions/settings";
import * as userActions from "../../../actions/user";
import { uploader } from "../../uploader";
import { connect } from "react-redux";

const { Text } = Typography;

const BasicPanel = (props) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  const [pass, setPass] = React.useState(null);
  const [pageName, setPageName] = React.useState(null);
  const [emails, setEmails] = React.useState(null);
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    props.getSettings();
    props.getCurrentUser();
    window.addEventListener("resize", updateDimensions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    setImage(props.settings);
  }, [props.settings]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  };

  const handleChange = (e) => {
    e.persist();
    setPass(e.target.value);
  };

  const handleChangePageName = (e) => {
    e.persist();
    setPageName(e.target.value);
  };

  const handleChangeEmails = (e) => {
    e.persist();
    setEmails(e.target.value);
  };

  const changeEmails = async (e) => {
    await props.changeEmails(emails);
    props.getSettings();
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
    <Card>
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
          defaultValue={props.settings?.emails ? props.settings.emails : null}
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
                <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
              </>
            )}
          </div>
        </Upload>
      </Space>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings?.get,
    profile: state.users?.get,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSettings: () => dispatch(settingsActions.getSettings()),
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicPanel);
