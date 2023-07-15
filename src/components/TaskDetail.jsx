import { useRef, useState, useEffect } from 'react'
import { Button, Input, List, Drawer, Avatar, Image, Space } from 'antd';
import { FileAddFilled, EditFilled } from '@ant-design/icons';
import { useStore } from '../store/store'
import { observer } from 'mobx-react';
import sample from '../assets/sample.png';


function TaskDetail({ isVisible, onClose }) {

    const { taskStore } = useStore();

    const targetRef = useRef(null);


    const [editMode, setEditMode] = useState(null);

    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({
        name: 'David',
        message: ''
    });

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessages((prevFormArray) => [...prevFormArray, formData]);
        // Reset the form fields
        setFormData({
            name: 'David',
            email: ''
        });
        scrollToBottom();
    };

    const scrollToBottom = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    //CRUD
    const handleCellEdit = (id, field, value) => {
        if (field !== 'id') {
            taskStore.updateSelectedObject(field, value)
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


    return (
        <Drawer
            bodyStyle={{ padding: 0 }}
            title="Task Detail"
            size='large'
            placement="right"
            onClose={onClose}
            open={isVisible}
            footer={
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type="primary">
                            <FileAddFilled />
                        </Button>
                        <form method="post" onSubmit={handleSubmit} style={{ flex: 1, marginLeft: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                <Input
                                    autoComplete='off'
                                    placeholder="Type your message..."
                                    name="message"
                                    style={{ marginRight: 8 }}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                                <Button type="primary" htmlType='submit'>
                                    Send
                                </Button>

                            </div>
                        </form>
                    </div>
                </>
            }>

            {
                taskStore.selectedObject &&
                <>
                    <div className='main-content-padding'>

                        {
                            editMode && editMode.id === taskStore.selectedObject.id && editMode.field == "task" ? (
                                <input
                                    className="input-field"
                                    type="text"
                                    value={taskStore.selectedObject.task}
                                    onChange={e => handleCellEdit(taskStore.selectedObject.id, 'task', e.target.value)}
                                    onBlur={handleEditModeExit}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleEditModeExit();
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                taskStore.selectedObject.task ? (
                                    <h2 onClick={(e) => { handleEditMode(taskStore.selectedObject.id, 'task'); }}>{taskStore.selectedObject.task}</h2>
                                ) : (<Button type="text" shape="circle" icon={<EditFilled />} onClick={(e) => { handleEditMode(item.id, 'task'); }} />)
                            )
                        }
                        <div className='default-margin-2'></div>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td><span className='strong-font'>Project</span></td>
                                    <td> : </td>
                                    <td><span >WW3</span></td>
                                </tr>
                                <tr>
                                    <td><span className='strong-font'>Assigne</span></td>
                                    <td> : </td>
                                    <td><span >Mg Mg</span></td>
                                </tr>
                                <tr>
                                    <td><span className='strong-font'>Due Date</span></td>
                                    <td> : </td>
                                    <td><span >June 23, 2023</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='default-margin-2'></div><div className='default-margin-2'></div><div className='default-margin-2'></div>
                        <span className='strong-font'>Description</span>
                        <div className='default-margin'></div>
                        {
                            editMode && editMode.id === taskStore.selectedObject.id && editMode.field == 'description' ? (
                                <input
                                    className="input-field"
                                    type="text"
                                    name='description'
                                    value={taskStore.selectedObject.description}
                                    onChange={(e) => handleCellEdit(taskStore.selectedObject.id, 'description', e.target.value)}
                                    onBlur={handleEditModeExit}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleEditModeExit();
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                taskStore.selectedObject.description ? (
                                    <p className='editable-input' onClick={(e) => handleEditMode(taskStore.selectedObject.id, 'description')}>{taskStore.selectedObject.description}</p>
                                ) : (<Button type="text" shape="circle" icon={<EditFilled />} onClick={(e) => { e.stopPropagation(); handleEditMode(taskStore.selectedObject.id, 'description'); }} />)
                            )
                        }
                        <div className='default-margin-2'></div>
                        <span className='strong-font'>Attachments</span>
                        <div className='default-margin'></div>
                        <Space>
                            <Image
                                width={100}
                                src={sample}
                            />
                            <Image
                                width={100}
                                src={sample}
                            />
                            <Image
                                width={100}
                                src={sample}
                            />
                        </Space>

                    </div>
                    <div className='main-content-padding'>
                        {
                            (messages.length > 0) &&
                            <>

                                <span className='strong-font'>Comments</span>
                                <div className='default-margin'></div>
                            </>
                        }
                        <List
                            itemLayout="horizontal"
                            dataSource={messages}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                        title={item.name}
                                        description={item.message}
                                    />
                                    <span>10 mins ago</span>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div ref={targetRef} style={{ height: 60 }}></div>
                </>
            }

        </Drawer>
    )
}

export default observer(TaskDetail)