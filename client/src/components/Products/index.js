import { useState, useEffect } from "react";
import { Modal, Form } from "antd";
import * as categoryActions from "../../actions/category";
import * as productActions from "../../actions/product";
import { connect } from "react-redux";
import { uploader } from "../uploader";
import ProductTable from "./table";
import ProductForm from "./form";

const Products = (props) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.auth) {
      props.getCategories();
      props.getProducts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onCategoryChange = (value) => {
    form.setFieldsValue({
      category: value,
    });
  };

  const onEnabledChange = (value) => {
    form.setFieldsValue({
      enabled: value,
    });
  };

  const handleOk = (e) => {
    form.submit();
  };

  const onFinish = async (values) => {
    setVisible(false);
    if (id) {
      await props.editProduct(id, values);
    } else {
      await props.addProduct(values);
    }
    props.getProducts();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const addProductButton = () => {
    setVisible(true);
    form.resetFields();
    setImage(null);
    setId(null);
  };

  const deleteProduct = async (record) => {
    await props.deleteProduct(record);
    props.getProducts();
  };

  const editProduct = async (record) => {
    setVisible(true);
    form.setFieldsValue(record);
    setId(record);
    setImage(record.image_url);
  };

  const uploadImage = async (image) => {
    const url = await uploader(image.file);
    setImage(url.location);
    form.setFieldsValue({ image_url: url.location });
  };

  return (
    <>
      <Modal
        title="Product"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProductForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          categories={props.categories}
          onCategoryChange={onCategoryChange}
          uploadImage={uploadImage}
          image={image}
          onEnabledChange={onEnabledChange}
        />
      </Modal>
      <ProductTable
        addProductButton={addProductButton}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
        products={props.products}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(categoryActions.getCategory()),
    addProduct: (product) => dispatch(productActions.addProduct(product)),
    getProducts: () => dispatch(productActions.getProduct()),
    deleteProduct: (product) => dispatch(productActions.deleteProduct(product)),
    editProduct: (id, product) =>
      dispatch(productActions.updateProduct(id, product)),
  };
};

const mapStateToProps = (state) => {
  return {
    categories: state.category?.get_all,
    products: state.products?.get_all,
    auth: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
