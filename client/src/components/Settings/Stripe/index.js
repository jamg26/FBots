import { useState, useEffect } from "react";
import * as settingsActions from "../../../actions/settings";
import { connect } from "react-redux";
import {
  Input,
  Button,
  Space,
  Popconfirm,
  Typography,
  Divider,
  Card,
} from "antd";

const { Text } = Typography;

const StripePanel = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [publicKey, setPublicKey] = useState(null);
  const [secretKey, setSecretKey] = useState(null);

  useEffect(() => {
    props.getSettings();
    window.addEventListener("resize", updateDimensions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
  };

  const textInputWidth = () => {
    return width > 991 ? "50%" : "100%";
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

  return (
    <Card>
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
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings?.get,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSettings: () => dispatch(settingsActions.getSettings()),
    changeStripeSecretKey: (key) =>
      dispatch(settingsActions.changeStripeSecretKey(key)),
    changeStripePublicKey: (key) =>
      dispatch(settingsActions.changeStripePublicKey(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StripePanel);
