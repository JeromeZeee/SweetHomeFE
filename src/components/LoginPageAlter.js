import React from "react";
import { Form, Button, Input, Space, Checkbox, message, Modal, } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register } from "../utils";

class LoginPageAlter extends React.Component {
  formRef = React.createRef();
  state = {
    asManager: false,
    loading: false,
  };

  onFinish = () => {
    console.log("finish form");
  };
  handleCheckboxOnChange = (e) => {
    this.setState({
      asManager: e.target.checked,
    });
  };

  handleLogin = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      const { asManager } = this.state;
      const resp = await login(formInstance.getFieldsValue(true), asManager);
      this.props.handleLoginSuccess(resp.token, asManager);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <div style={{ width: 500, margin: "20px auto" }}>
        <Form ref={this.formRef} onFinish={this.onFinish} style={{ marginTop: "120px" }}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              disabled={this.state.loading}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email: email@example.com"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              disabled={this.state.loading}
              placeholder="Password"
            />
          </Form.Item>
        </Form>
        <Space>
          <Button
            onClick={this.handleLogin}
            disabled={this.state.loading}
            shape="round"
            type="primary"
          >
            Login
          </Button>
          <Checkbox
            disabled={this.state.loading}
            checked={this.state.asManager}
            onChange={this.handleCheckboxOnChange}
          >
            As Manager
          </Checkbox>
          <RegiterButton />
        </Space>
      </div>
    );
  }
}

class RegiterButton extends React.Component {
  state = {
    asManager: false,
    loading: false,
    modalVisible: false,
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleRegister = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      await register(formInstance.getFieldsValue(true), this.state.asManager);
      message.success("Thanks for signing up.");
      this.handleCancel();
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleCheckboxOnChange = (e) => {
    this.setState({
      asManager: e.target.checked,
    });
  };

  handleRegisterClick = () => {
    this.setState({
      modalVisible: true,
    });
  };

  render() {
    return (
      <>
        <Button onClick={this.handleRegisterClick} shape="round" type="link">
          New here? Create your account
        </Button>
        <Modal
          destroyOnClose={true}
          title="Create Your Account"
          visible={this.state.modalVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Form
            preserve={false}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={this.handleRegister}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input
                disabled={this.state.loading}
                placeholder="Please input your name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true }]}
            >
              <Input
                disabled={this.state.loading}
                placeholder="Please input your email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                disabled={this.state.loading}
                placeholder="Please input your password"
              />
            </Form.Item>

            <Form.Item
              label="Room Number(optional)"
              name="room"
            >
              <Input
                disabled={this.state.loading}
                placeholder="Only for resident signing up"
              />
            </Form.Item>
            <Space style={{ display: "flex", justifyContent: "center" }}>
              <Checkbox
                disabled={this.state.loading}
                checked={this.state.asManager}
                onChange={this.handleCheckboxOnChange}
              >
                Register a manager account
              </Checkbox>
              <Button
                loading={this.state.loading}
                shape="round"
                type="primary"
                htmlType="submit"
              >
                Create Account
              </Button>
            </Space>
          </Form>
        </Modal>
      </>
    );
  }
}

export default LoginPageAlter;
