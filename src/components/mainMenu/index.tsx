
import { useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';


import type { MenuProps } from 'antd';
import { Menu, theme } from 'antd'
// import {  } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];
const Comp: React.FC = () => {


    const goNewPage = useNavigate();
    const getCurrentLocation = useLocation();
    
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const goPage = (e: any) => {
        if (e && e.key) {
            goNewPage(e.key);
        }

    }

    let firstOpenKey: string = ""

    const items: MenuItem[] = [
        {
            key: '/about',
            icon: <PieChartOutlined />,
            label: 'about'
        },
        {
            key: '/detail',
            icon: <DesktopOutlined />,
            label: 'detail'
        },
        {
            key: '/help',
            icon: <DesktopOutlined />,
            label: 'help',
            children: [
                {
                    key: '/intro',
                    icon: <DesktopOutlined />,
                    label: 'intro'
                },
            ]
        }
    ];
    for (let i = 0; i < items.length; i++) {
        if (items[i]!['children'] && items[i]!['children'].length > 0 && items[i]!['children'].find(firstActiveMenu)) {
            firstOpenKey = items[i]!.key as string;
            break;
        }
    }
    const [openkeys, setOpenkeys] = useState([firstOpenKey]);

    function firstActiveMenu(obj) {
        return obj.key === getCurrentLocation.pathname
    }



    const handleOpenChange = (keys: string[]) => {

        setOpenkeys([keys[keys.length - 1]])
        console.log(openkeys)
    }

    return (<Menu theme="dark" defaultSelectedKeys={[getCurrentLocation.pathname]} mode="inline" items={items} onOpenChange={handleOpenChange} openKeys={openkeys} onClick={goPage} />
    )
}

export default Comp;