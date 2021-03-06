import {Form, Input, Button} from 'antd';
import {useHistory} from 'react-router';
import {useStores} from 'stores';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px 30px;
`;

type UserInfo = {
  username: string;
  password: string;
};

const SignIn = () => {
  const {AuthStore} = useStores();
  const history = useHistory();
  const onFinish = (values: UserInfo) => {
    console.log('sign in', values);
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password);
    AuthStore.signIn()
      .then(user => {
        console.log('component: sign in success', user);
        history.push(`/`);
      })
      .catch(e => {
        console.log('component: sign in failed', e);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Wrapper>
      <h1>登录</h1>
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
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default SignIn;
