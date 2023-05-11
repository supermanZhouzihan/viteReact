// import React  from "react";
// interface  Props {

// }

// interface  State {

// }

// class Login  extends React.Component<Props,State> {

//     state = { userName:'' }
//     render() { 
//         return ( <div>登录页</div> );
//     }
// }

// export default Login ;


import React, { Component } from 'react';
import axios from "axios";
import { Button, Checkbox, Form, Input } from 'antd';
import {useNavigate } from "react-router-dom"

import { getCodeImg } from "../../api"
import './index.scss';
// interface Response {
//   any:any
// }





export default class Login extends Component {
  goNewPage =()=> useNavigate();
  state = {
    codeUrl: "",
    captchaOnOff: "",
    loginForm: {
      username: "admin",
      password: "admin123",
      rememberMe: false,
      code: "",
      uuid: ""
    }
  };
   onFinish = (values: {username:string,password:string,code:string|number,uuid:string}) => {
    console.log('Success:', values);
    axios.post('/api/auth/login',{username:values.username,password:values.password,code:values.code,uuid:this.state.loginForm.uuid}).then((res)=>{
      // this.props.history.
      this.goNewPage('/about')
    })
  };
  
   onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
   getCode = () => {
    axios.get('/api/code')
      .then((response:{data:{captchaOnOff:undefined|boolean,uuid:string,img:string}}) => {
        let c = response.data;
        this.setState({
          captchaOnOff:c.captchaOnOff === undefined ? true : c.captchaOnOff
        })
        // this.state. = 
        let obj={
          username: this.state.loginForm.username,
          password: this.state.loginForm.password,
          rememberMe: this.state.loginForm.rememberMe,
          code: this.state.loginForm.code,
          uuid:c.uuid
        }
        if (this.state.captchaOnOff) {
          this.setState({
            captchaOnOff: c.captchaOnOff === undefined ? true : c.captchaOnOff,
            codeUrl: "data:image/gif;base64," + c.img,
            loginForm:obj
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.getCode();
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className='login'>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
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
                <img src={this.state.codeUrl} onClick={this.getCode} className="login-code-img" />
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
      </div>




      //     <div>
      //       <div class="login">
      //   <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      //     <h3 class="title">天宇</h3>
      //     <el-form-item prop="username">
      //       <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
      //         <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
      //       </el-input>
      //     </el-form-item>
      //     <el-form-item prop="password">
      //       <el-input
      //         v-model="loginForm.password"
      //         type="password"
      //         auto-complete="off"
      //         placeholder="密码"
      //         @keyup.enter.native="handleLogin"
      //       >
      //         <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
      //       </el-input>
      //     </el-form-item>
      //     <el-form-item prop="code" v-if="captchaOnOff">
      //       <el-input
      //         v-model="loginForm.code"
      //         auto-complete="off"
      //         placeholder="验证码"
      //         style="width: 63%"
      //         @keyup.enter.native="handleLogin"
      //       >
      //         <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
      //       </el-input>
      //       <div class="login-code">
      //         <img :src="codeUrl" @click="getCode" class="login-code-img"/>
      //       </div>
      //     </el-form-item>
      //     <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      //     <el-form-item style="width:100%;">
      //       <el-button
      //         :loading="loading"
      //         size="medium"
      //         type="primary"
      //         style="width:100%;"
      //         @click.native.prevent="handleLogin"
      //       >
      //         <span v-if="!loading">登 录</span>
      //         <span v-else>登 录 中...</span>
      //       </el-button>
      //       <div style="float: right;" v-if="register">
      //         <router-link class="link-type" :to="'/register'">立即注册</router-link>
      //       </div >
      //     </el - form - item >
      //   </el - form >
      //   < !--底部  -->
      //     <div class="el-login-footer">
      //       <span>Copyright © 2018-2021 tysp All Rights Reserved.</span>
      //     </div>
      // </div >
      // </div >
    )
  }
}


