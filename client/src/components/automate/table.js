import { Table, Space, Button, Typography, Popconfirm } from "antd";

import IconFont from "../icon";

const { Text } = Typography;

const AutomateTable = (props) => {
  const columns = [
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" onClick={() => props.editAutomated(record)}>
            <IconFont type="icon-EditDocument" />
          </Button>
          <Popconfirm
            title="You sure you want to delete?"
            onConfirm={() => props.deleteAutomated(record)}
          >
            <Button size="small">
              <IconFont type="icon-delete_database" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Keyword",
      dataIndex: "question",
      key: "question",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
      render: (text) => <Text>{text}</Text>,
    },
  ];
  return (
    <>
      <Table
        title={() => (
          <Button onClick={props.addAutomate}>
            <IconFont type="icon-add_database" />
          </Button>
        )}
        columns={columns}
        dataSource={props.automated}
        loading={props.automated ? false : true}
        rowKey="_id"
        size="small"
      />
    </>
  );
};

export default AutomateTable;
