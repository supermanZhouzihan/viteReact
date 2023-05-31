

import { FunctionComponent, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { getCodeImg, login } from "@/api/index"
import { useNavigate } from 'react-router-dom';
import { encrypt } from '@/utils/jsencrypt'
import {setToken,setExpiresIn} from "@/utils/auth"
import Cookies from "js-cookie";
import './index.scss';
interface Props {
  
}
interface ExpectedResponse {
  captchaOnOff: boolean;
  uuid: string;
  img: string;
}

const Login: FunctionComponent<Props> = (props) => {
  const [codeUrl, setCodeUrl] = useState("");
  const [captchaOnOff, setCaptchaOnOff] = useState(false);
  const [username,setUsername]=useState("admin");
  const [password,setPassword]=useState("admin123");
  const [rememberMe,setRrememberMe]=useState(false);
  // const [code,setCode]=useState("");
  const [uuid, setUuid] = useState("");
  const goNewPage = useNavigate();

  const onFinish = (values: { username: string, password: string, code: string | number, uuid: string ,rememberMe:boolean }) => {
    if (values.rememberMe) {
      let remerberVal=JSON.stringify(values.rememberMe) 
      Cookies.set("username", values.username, { expires: 30 });
      Cookies.set("password", encrypt(password), { expires: 30 });
      Cookies.set('rememberMe', remerberVal, { expires: 30 });
    } else {
      Cookies.remove("username");
      Cookies.remove("password");
      Cookies.remove('rememberMe');
    }
    login({ username: values.username, password: values.password, code: values.code, uuid: uuid }).then((res) => {
      setToken(res.data.access_token)
      setExpiresIn(res.data.expires_in)
      goNewPage('/about')
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const getCode = () => {
    getCodeImg().then((response: ExpectedResponse) => {
      setUuid(response.uuid);
      setCaptchaOnOff(response.captchaOnOff ? true : response.captchaOnOff);
      setCodeUrl("data:image/gif;base64," + response.img);
    })
      .catch(error => {
        console.error(error);
      });
  }

  const getCookie=()=>{
      const cookieUsername = Cookies.get("username");
      const cookiePassword = Cookies.get("password");
      const cookieRememberMe:boolean = Cookies.get('rememberMe');
      // this.loginForm = {
      //   username: username === undefined ? this.loginForm.username : username,
      //   password: password === undefined ? this.loginForm.password : decrypt(password),
      //   rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      // };
      setUsername(cookieUsername=== undefined ? username : cookieUsername)
      setPassword(cookiePassword=== undefined ? password : cookiePassword)
      setRrememberMe((cookieRememberMe==false)? rememberMe : cookieRememberMe)
  }

  useEffect(() => {
    getCode();
    getCookie();
  }, [])

  return (<div className='login'>
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      initialValues={{ rememberMe: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='login-form'
    >
      <h3 className="title">天宇</h3>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入您的账号' }]}
      >
        <Input placeholder='账号' style={{ height: 38 }} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入您的密码' }]}
      >
        <Input.Password placeholder='密码' style={{ height: 38 }} />
      </Form.Item>

      <Form.Item
        name="code"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <div>
          <Input placeholder='验证码' style={{ width: '63%', height: 38 }} />
          <div className="login-code">
            <img src={codeUrl} onClick={getCode} className="login-code-img" />
          </div>
        </div>


      </Form.Item>

      <Form.Item name="rememberMe" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  </div>);
}

export default Login;