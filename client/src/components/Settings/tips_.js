import { Card, Space, Typography } from "antd";

const { Text } = Typography;

const TipsComponent = (props) => {
  return (
    <>
      <Card>
        <Space direction="vertical">
          <Text type="danger" strong>
            CONFIGURATION GUIDE
          </Text>
          <Text>
            1. Change <Text strong>Basic Settings</Text> such as Page Name,
            Password, Emails & Logo.
          </Text>
          <Text>
            2. Authorize and add Facebook page in the{" "}
            <Text strong>Facebook Panel</Text>.
          </Text>
          <Text>
            3. Encode Categories in the <Text strong>"Categories"</Text>{" "}
            section.
          </Text>
          <Text>
            4. Encode your products in the <Text strong>"Products"</Text>{" "}
            section.
          </Text>
        </Space>
      </Card>
    </>
  );
};

export default TipsComponent;
