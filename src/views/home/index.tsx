
// function About:any = () => {
//     return ( 
//         <div className="about">
//         这是about组件
//         </div>
//      );
// }

// export default About;

// import { FunctionComponent } from "react";

// interface Props {

// }

// const Home: FunctionComponent<Props> = () => {
//     return ( <div className="home">
//             这是home组件
//             </div> );
// }

// export default Home;

import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import MainMenu from "@/components/mainMenu"
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '/about', <PieChartOutlined />),
  getItem('Option 2', '/detail', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openkeys, setOpenkeys] = useState(['']);

  const goNewPage = useNavigate();
  const handleOpenChange = (keys: string[]) => {

    setOpenkeys([keys[keys.length - 1]])
    console.log(openkeys)
  }

  // React.useEffect(() => {
  //   console.log("这是模拟componentDidMount钩子函数")
  //   getCode()
  //   return () => {//return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
  //     console.log("这是模拟componentWillUnmount钩子函数")
  //   }
  // },[])//第二个参数一定是一个空数组，因为如果不写会默认监听所有状态，这样写就不会监听任何状态，只在初始化时执行一次。




  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const goPage = (e: any) => {
    if (e && e.key) {
      console.log(e.key)
      goNewPage(e.key);
    }

  }



  function getCode() {
    axios.get('/api/code')
      .then(response => {
        console.log('11111', response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }




  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        {/* <Menu theme="dark" defaultSelectedKeys={['/about']} mode="inline" items={items} onOpenChange={handleOpenChange} openKeys={openkeys} onClick={goPage} /> */}
        <MainMenu> </MainMenu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Breadcrumb style={{ margin: '16px  0', padding: '0 16px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ margin: '16px 16px 0 ' }}>
          <Outlet></Outlet>
          {/* <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
          </div> */}
        </Content>
        <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;