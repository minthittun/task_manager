import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, theme, Select, Avatar, Modal, Drawer, Breadcrumb, Dropdown, Space, Badge } from 'antd';
import { UserOutlined, NotificationOutlined, HomeFilled, DatabaseFilled, ProfileFilled, SettingFilled, DashboardFilled } from '@ant-design/icons';
import Tasks from './pages/Tasks';
import DataRepo from './pages/DataRepo';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Setting from './pages/Setting';
import Profile from './pages/Profile'

const { Header, Sider, Content } = Layout;

const items = [
  {
    label: 'Profile',
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Settings',
    key: '3',
  },
];


function App() {

  let navigate = useNavigate();

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={280} theme="dark" style={{ position: 'fixed', height: '100vh', left: 0 }}>

          <div style={{ width: '100%', color: '#fff', padding: "30px 10px", fontWeight: 'bold', fontSize: '28px', textAlign: 'center' }}>
            T-Manager
          </div>

          <Menu
            onClick={({ key }) => {
              navigate(key)
            }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            items={[
              {
                type: 'group',
                key: 'main_sub_menu',
                label: 'Main',
                children: [
                  {
                    key: '/',
                    icon: <HomeFilled />,
                    label: 'Tasks'
                  },
                  /*{
                    key: '/datarepo',
                    icon: <DatabaseFilled />,
                    label: 'Data Repository',
                    to: '/datareop'
                  }*/
                  {
                    key: '/projects',
                    icon: <DatabaseFilled />,
                    label: 'Projects',
                    to: '/projects'
                  },
                  {
                    key: '/reports',
                    icon: <DashboardFilled />,
                    label: 'Reports',
                    to: '/reports'
                  }
                ]
              },
              {
                type: 'group',
                key: 'other_sub_menu',
                label: 'Other',
                children: [
                  {
                    key: '/profile',
                    icon: <ProfileFilled />,
                    label: 'Profile',
                    to: '/profile'
                  },
                  {
                    key: '/setting',
                    icon: <SettingFilled />,
                    label: 'Setting',
                    to: '/setting'
                  }
                ]
              }
            ]}
          />


        </Sider>
        <Layout style={{ marginLeft: 280, }}>

          <Header
            style={{
              position: 'fixed',
              width: '100%',
              zIndex: 1,
              background: '#fff',
              paddingLeft: 30,
              paddingRight: 310,
            }}
          >
            <div style={{ float: 'left', width: '50%' }}>

            </div>
            <div style={{ float: 'right', width: '50%', textAlign: 'right' }}>
              <Badge count={1}><Avatar style={{ backgroundColor: '#1890ff' }} icon={<NotificationOutlined />} /></Badge> &nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </a>
              </Dropdown>
            </div>
            <div style={{ clear: 'both' }}></div>
          </Header>

          <Content style={{ background: '#fff', overflow: 'initial', marginTop: 74 }}>

            <Routes>
              <Route path='/' element={<Tasks />}></Route>
              <Route path='/projects' element={<Projects />}></Route>
              <Route path='/reports' element={<Reports />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/setting' element={<Setting />}></Route>
              <Route path='/datarepo' element={<DataRepo />}></Route>
            </Routes>

          </Content>
        </Layout>
      </Layout >

    </>
  )
}


export default App
