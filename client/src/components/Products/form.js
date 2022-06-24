import { Form, Input, Select, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const ProductForm = (props) => {
  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={props.onFinish}
        form={props.form}
        size="large"
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input your product name!" },
          ]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>

        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please input price!" }]}
        >
          <InputNumber placeholder="0.00" />
        </Form.Item>

        <Form.Item
          name="category"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select
            placeholder="Select a category"
            onChange={props.onCategoryChange}
          >
            {props.categories?.map((cat) => {
              return (
                <Option key={cat._id} value={cat.name}>
                  {cat.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input.TextArea
            placeholder="Product Description"
            rows={4}
            showCount
            maxLength={900}
          />
        </Form.Item>

        <Form.Item name="image_url">
          <Upload
            fileList=""
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={props.uploadImage}
          >
            <div>
              {props.image ? (
                <img src={props.image} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <>
                  <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
                </>
              )}
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          name="enabled"
          rules={[{ required: true, message: "Please select state!" }]}
        >
          <Select style={{ width: 120 }} onChange={props.onEnabledChange}>
            <Option value={true}>Enabled</Option>
            <Option value={false}>Disabled</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="quantity"
          rules={[{ required: true, message: "Please input quantity!" }]}
        >
          <InputNumber placeholder="0" />
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductForm;
