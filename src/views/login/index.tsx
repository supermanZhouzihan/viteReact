

// function About:any = () => {
//     return ( 
//         <div className="about">
//         这是about组件
//         </div>
//      );
// }

import { FunctionComponent, useEffect,useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";
import {getCodeImg} from "@/api/index"
import { useNavigate } from 'react-router-dom';
import './index.scss';
// export default About;

interface Props {

}

const Login: FunctionComponent<Props> = (props) => {
  const [codeUrl,setCodeUrl]=useState("");
  const [captchaOnOff,setCaptchaOnOff]=useState(false);
  const [username,setUsername]=useState("admin");
  const [password,setPassword]=useState("admin123");
  const [rememberMe,setRrememberMe]=useState(false);
  const [code,setCode]=useState("");
  const [uuid,setUuid]=useState("");
  const goNewPage = useNavigate();

  const onFinish = (values: { username: string, password: string, code: string | number, uuid: string }) => {
    axios.post('/api/auth/login', { username: values.username, password: values.password, code: values.code, uuid: uuid }).then((res) => {
      console.log(props)
      goNewPage('/about')
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const getCode = () => {
    // axios.get('/api/code')
    getCodeImg().then((response: { data: { captchaOnOff: boolean, uuid: string, img: string } }) => {
        let c = response.data;
            setUuid(c.uuid);
            setCaptchaOnOff(c.captchaOnOff?true : c.captchaOnOff);
            setCodeUrl("data:image/gif;base64," + c.img);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(()=>{
    getCode();
  },[])

  return (<div className='login'>
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
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

      <Form.Item name="remember" valuePropName="checked">
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