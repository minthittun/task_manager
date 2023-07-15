import React, { useEffect, useState } from 'react'
import { Layout, Menu, Button, theme, Select, Avatar, Modal, Drawer, Breadcrumb, Dropdown, Space, Badge } from 'antd';
import { UserOutlined, EditFilled, DeleteFilled, BranchesOutlined, MessageOutlined, PlusOutlined, CloseCircleFilled } from '@ant-design/icons';
import { useStore } from '../store/store'
import { observer } from 'mobx-react';
import TaskDetail from '../components/TaskDetail';


function Tasks() {

  //Required
  const { taskStore } = useStore();

  const [editMode, setEditMode] = useState(null);
  const [newRecord, setNewRecord] = useState({ task: '', assigne: '', description: '', });
  const [addNewMode, setAddNewMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  //Required

  //CRUD
  const handleCellEdit = (id, field, value) => {
    if (field !== 'id') {
      taskStore.updateTask(id, field, value);
    }
  };

  const handleEditMode = (id, field) => {
    if (field !== 'id') {
      setEditMode({ id, field });
    }
  };

  const handleEditModeExit = () => {
    setEditMode(null);
  };

  const handleNewRecordChange = (field, value) => {
    setNewRecord(prevRecord => ({ ...prevRecord, [field]: field === 'assigne' ? parseInt(value) : value }));
  };

  const handleAddRecord = () => {

    const id = Date.now().toString() + Math.random().toString().substr(2, 5);
    const task = { id, ...newRecord }
    taskStore.addTask(task);

    //reset
    setNewRecord({ task: '', assigne: '', description: '' });
    setAddNewMode(false);
  };

  const cancelAddNew = () => {
    //reset
    setNewRecord({ task: '', assigne: '', description: '' });
    setAddNewMode(false);
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddRecord();

      console.log(taskStore.tasks)
    }
  };

  const handleAddNewMode = () => {
    setAddNewMode(true);
  }

  const deleteTask = () => {
    taskStore.deleteTask(taskStore.selectedObject)

    handleCancel();
  };

  const showConfirmDialog = (object) => {
    taskStore.setSelectedObject(object);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //CRUD

  //Drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  //Drawer: close
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  //Drawer: show detail
  const showDetail = (obj) => {
    taskStore.setSelectedObject(obj);
    //close drawer
    setOpenDrawer(true);
  }



  return (
    <>
      <Modal
        title="Confirm Removal"
        open={isModalVisible}
        onOk={deleteTask}
        onCancel={handleCancel}
        okText="Remove"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
      <TaskDetail isVisible={openDrawer} onClose={closeDrawer} />


      <div className='fade-in'>
        <table className='table' >
          <thead>
            <tr>
              <th style={{ width: '65%' }}>Task Name</th>
              <th style={{ width: '10%' }} >Project</th>
              <th style={{ width: '10%' }} >Due Date</th>
              <th style={{ width: '10%' }} >Assignee</th>
              <th style={{ width: '5%' }}></th>
            </tr>
          </thead>
          <tbody>

            {taskStore.tasks.map(item => (
              <tr key={item.id} className='fade-in'>
                <td onClick={() => showDetail(item)} className='editable-cell'>
                  {editMode && editMode.id === item.id && editMode.field === 'task' ? (
                    <input
                      className="input-field"
                      type="text"
                      value={item.task}
                      onClick={e => e.stopPropagation()}
                      onChange={e => handleCellEdit(item.id, 'task', e.target.value)}
                      onBlur={handleEditModeExit}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEditModeExit();
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    item.task ? (
                      <>
                        <span className='editable-input' onClick={(e) => { e.stopPropagation(); handleEditMode(item.id, 'task'); }}>{item.task}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span >2 <MessageOutlined /></span>
                        &nbsp;&nbsp;
                        <span>2 <BranchesOutlined /></span>
                      </>
                    ) : (<Button type="text" shape="circle" icon={<EditFilled />} onClick={(e) => { e.stopPropagation(); handleEditMode(item.id, 'task'); }} />)
                  )}
                </td>
                <td> <Badge status="success" /> <span>UNICEF</span></td>
                <td><span>June 14, 2023</span></td>
                <td>
                  {editMode && editMode.id === item.id && editMode.field === 'assigne' ? (
                    <Select
                      style={{ width: 200 }}
                      value={item.assigne}
                      onChange={value => handleCellEdit(item.id, 'assigne', value)}
                      onBlur={handleEditModeExit}
                      autoFocus
                    >
                      {
                        taskStore.assigneOptions.map(option => (
                          <Select.Option key={option.id} value={option.id}>
                            {option.name}
                          </Select.Option>
                        ))
                      }
                    </Select>

                  ) : (
                    item.assigne ? (
                      <Avatar className='editable-input2' size="small" icon={<UserOutlined />} onClick={() => handleEditMode(item.id, 'assigne')} />
                    ) : (<Button type="text" shape="circle" icon={<EditFilled />} onClick={() => handleEditMode(item.id, 'assigne')} />)
                  )}
                </td>

                <td>

                  <Button size='small' onClick={() => showConfirmDialog(item)} danger type="primary" shape="circle" icon={<DeleteFilled />} />
                </td>
              </tr>
            ))}

            {
              addNewMode ?
                (

                  <tr>
                    <td style={{}} >
                      <input
                        className="input-field"
                        type="text"
                        value={newRecord.task}
                        placeholder="Task"
                        onChange={e => handleNewRecordChange('task', e.target.value)}
                        onKeyDown={handleKeyPress}
                        autoFocus
                      />
                    </td>
                    <td>UNICEF</td>
                    <td>June 14, 2023</td>
                    <td style={{}} >



                      <Select
                        style={{ width: 200 }}
                        placeholder="Choose assigne"
                        onChange={value => handleNewRecordChange('assigne', value)}
                        onBlur={handleAddRecord}
                      >
                        {
                          taskStore.assigneOptions.map(option => (
                            <Select.Option key={option.id} value={option.id}>
                              {option.name}
                            </Select.Option>
                          ))
                        }
                      </Select>

                    </td>
                    <td>
                    <Button size='small' onClick={cancelAddNew}  type="secondary" shape="circle" icon={<CloseCircleFilled />} />
                    </td>
                  </tr>
                ) : (
                  <tr onClick={handleAddNewMode} style={{ cursor: 'pointer' }}>
                    <td><span><PlusOutlined /> Click here to add a new task.</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                )
            }

          </tbody>
        </table>


      </div>


    </>
  )
}


export default observer(Tasks)
