
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
import {Outlet,useNavigate } from 'react-router-dom';

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
  getItem('Option 2', '/home', <DesktopOutlined />),
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

  const goNewPage=useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const goPage=(e:any)=>{
    if(e&&e.key){
      console.log(e.key)
      goNewPage(e.key);
    }
    
  }
    
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={goPage}/>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
        <Breadcrumb style={{ margin: '16px  0',padding:'0 16px' }}>
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
        <Footer style={{ textAlign: 'center',padding:0,lineHeight:'48px' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;