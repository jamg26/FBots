import React from "react";
import { Input, Button, Space, Popconfirm, Typography, Divider } from "antd";

const { Text } = Typography;

const StripePanel = (props) => {
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>Stripe Public Key</Text>
        <Input
          placeholder={
            props.settings?.stripe_public
              ? props.settings.stripe_public
              : "Public Key"
          }
          onChange={props.handleChangeStripePublicKey}
          style={{ width: props.textInputWidth() }}
        />
        <Popconfirm
          title="You sure you want to Public Key?"
          onConfirm={props.changeStripePublicKey}
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
          onChange={props.handleChangeStripeSecretKey}
          style={{ width: props.textInputWidth() }}
        />
        <Popconfirm
          title="You sure you want to change Secret Key?"
          onConfirm={props.changeStripeSecretKey}
        >
          <Button>Save</Button>
        </Popconfirm>
      </Space>
    </>
  );
};

export default StripePanel;
