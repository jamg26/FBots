import { useState, useEffect } from "react";
import { Modal, Form } from "antd";
import { connect } from "react-redux";
import * as categoryActions from "../../actions/category";
import { uploader } from "../uploader";
import CategoriesTable from "./table";
import CategoriesForm from "./form";

const Categories = (props) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    props.getCategory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteCategory = async (record) => {
    await props.deleteCategory(record);
    props.getCategory();
  };

  const editCategory = async (record) => {
    setVisible(true);
    form.setFieldsValue(record);
    setId(record);
    setImage(record.image_url);
  };

  const handleOk = (e) => {
    form.submit();
  };

  const onFinish = async (values) => {
    setVisible(false);
    if (id) {
      await props.updateCategory(id, values);
    } else {
      await props.addCategory(values);
    }
    props.getCategory();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const handleCancel = (e) => {
    setVisible(false);
    setId(null);
    form.resetFields();
  };

  const addCategory = () => {
    form.resetFields();
    setVisible(true);
    setImage(null);
    setId(null);
  };

  const uploadImage = async (image) => {
    const url = await uploader(image.file);
    setImage(url.location);
    form.setFieldsValue({ image_url: url.location });
  };

  return (
    <>
      <Modal
        title="Category"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CategoriesForm
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          uploadImage={uploadImage}
          image={image}
        />
      </Modal>
      <CategoriesTable
        addCategory={addCategory}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
        categories={props.categories}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.category.get_all,
  };
};

export default connect(mapStateToProps, categoryActions)(Categories);
