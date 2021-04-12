import React from "react";
import { Button, Modal, Table, Space, Typography, Tooltip } from "antd";
import { connect } from "react-redux";
import * as fbActions from "../../../actions/facebook";

const { Text } = Typography;

const FacebookButton = (props) => {
  // const [fbCreds, setFbCreds] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={async () => {
              await props.addPage({
                pagetoken: record.access_token,
                pageid: record.id,
                pagename: record.name,
              });
              props.getPages();
            }}
          >
            ATTACH
          </Button>
        </Space>
      ),
    },
    {
      title: "Page ID",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Page Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Page Token",
      dataIndex: "access_token",
      key: "access_token",
      responsive: ["md"],
      render: (text) => (
        <Tooltip title={text}>
          <Text>...{text.slice(-10)}</Text>
        </Tooltip>
      ),
    },
  ];

  const login = () => {
    setLoading(true);
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          //if (!props.fb_page_tokens.length) setFbCreds(response);
          props.getFbTokens(response);
          setIsModalVisible(true);
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
        setLoading(false);
      },
      {
        scope: "public_profile,email,pages_messaging,pages_show_list",
        //auth_type: "reauthenticate",
      }
    );
  };

  return (
    <>
      <Modal
        title="Authorized Pages"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        <Table
          columns={columns}
          dataSource={props.fb_page_tokens}
          rowKey="id"
          size="small"
          style={{ padding: 10 }}
        />
      </Modal>
      <Button onClick={login} type="primary" loading={loading}>
        Authorize Facebook
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fb_page_tokens: state.facebook?.fb_page_tokens,
  };
};

export default connect(mapStateToProps, fbActions)(FacebookButton);
