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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as settingsActions from "../../actions/settings";
import { connect } from "react-redux";
import { uploader } from "../uploader";

const { Text } = Typography;

const Settings = (props) => {
  const [pass, setPass] = useState(null);
  const [pageId, setPageId] = useState(null);
  const [pageToken, setPageToken] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    props.getSettings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setImage(props.settings);
  }, [props.settings]);

  const handleChange = (e) => {
    e.persist();
    setPass(e.target.value);
  };
  const handleChangeId = (e) => {
    e.persist();
    setPageId(e.target.value);
  };
  const handleChangeToken = (e) => {
    e.persist();
    setPageToken(e.target.value);
  };

  const changePassword = (e) => {
    props.changePassword(pass);
  };

  const changePageId = (e) => {
    props.changePageId(pageId);
  };

  const changePageToken = (e) => {
    props.changePageToken(pageToken);
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
      <Row>
        <Col xs={24} md={18} lg={8}>
          <Space direction="vertical">
            <Space>
              <Input placeholder="New Password" onChange={handleChange} />
              <Popconfirm
                title="You sure you want to change password?"
                onConfirm={changePassword}
              >
                <Button>Save</Button>
              </Popconfirm>
            </Space>
            <Space>
              <Input
                placeholder={
                  props.settings.page_id
                    ? `ID: ${props.settings.page_id}`
                    : "Page ID"
                }
                onChange={handleChangeId}
              />
              <Popconfirm
                title="You sure you want to change page id?"
                onConfirm={changePageId}
              >
                <Button>Save</Button>
              </Popconfirm>
            </Space>
            <Space>
              <Input
                placeholder={
                  props.settings.token
                    ? `TOKEN: ${props.settings.token}`
                    : "Page Token"
                }
                onChange={handleChangeToken}
              />
              <Popconfirm
                title="You sure you want to change page token?"
                onConfirm={changePageToken}
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
                    <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
                  </>
                )}
              </div>
            </Upload>
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
          </Space>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings?.get,
  };
};

export default connect(mapStateToProps, settingsActions)(Settings);
