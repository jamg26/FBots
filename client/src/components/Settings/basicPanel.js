import React from "react";
import {
  Input,
  Button,
  Space,
  Popconfirm,
  Upload,
  Typography,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

const BasicPanel = (props) => {
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>Page Name</Text>

        <Input
          placeholder="Page Name"
          defaultValue={props.settings?.pageName}
          onChange={props.handleChangePageName}
          style={{ width: props.textInputWidth() }}
        />

        <Popconfirm
          title="You sure you want to change Page Name?"
          onConfirm={props.changePageName}
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
          onChange={props.handleChange}
          style={{ width: props.textInputWidth() }}
        />
        <Popconfirm
          title="You sure you want to change password?"
          onConfirm={props.changePassword}
        >
          <Button>Save</Button>
        </Popconfirm>
      </Space>

      <Divider />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>Notification emails are separated by comma (,)</Text>

        <Input.TextArea
          placeholder="Notification Emails"
          onChange={props.handleChangeEmails}
          rows={4}
          defaultValue={props.settings?.emails ? props.settings.emails : null}
          style={{ width: props.textInputWidth() }}
        />

        <Popconfirm
          title="You sure you want to change?"
          onConfirm={props.changeEmails}
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
          onChange={props.changeLogo}
        >
          <div>
            {props.image ? (
              <img
                src={props.image.logo_url}
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
    </>
  );
};

export default BasicPanel;
