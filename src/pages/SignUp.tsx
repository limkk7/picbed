import {Form, Input, Button} from 'antd';
import styled from 'styled-components';
const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px 30px;
`;

const SignUp = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Wrapper>
      <h1>注册</h1>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
            {
              min: 4,
              message: '用户名长度不能小于3',
            },
            {
              max: 10,
              message: '用户名长度不能大于10',
            },
            {
              validator: (_, value: string) => {
                if (/\W/.test(value)) return Promise.reject('不能出现字母数字下划线以外的字符');
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            {
              min: 4,
              message: '最少4字符',
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '请确认密码!',
            },
            ({getFieldValue}) => ({
              validator(_, value) {
                if (getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码不一致');
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default SignUp;
