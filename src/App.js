import "antd/dist/antd.css";
import "./App.css";
import {Table, Modal, Input, Radio,RadioChangeEvent  } from "antd";
import { useState,useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
// import type { RadioChangeEvent } from 'antd';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);

  const [dataSource, setDataSource] = useState([
  
  ]);
  if(dataSource !==null){
   
  }

  const count=()=>{
    setMale(0)
    setFemale(0)
    dataSource.map((ele)=>{
      if(ele.gender==="male"){
        setMale(male+1)
      }
       if(ele.gender==="female"){
       setFemale(female+1)
      }
     })
  }


  useEffect(()=>{
    async function getemploy(){
      try{
        const USER = await axios.get(`https://621d1343806a09850a518b88.mockapi.io/user`)
      
       setDataSource(USER.data)
      
      }catch(error){
         console.log("error data is found")
      }
     }
    
    
    getemploy()
  },[dataSource])


  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Gender",
      dataIndex: "gender",
    },
    {
      key: "5",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "6",
      title: "Date Of Birth",
      dataIndex: "dateofbirth",
    },
   
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 25 }}
            />
          </>
        );
      },
    },
  ];

 
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
       return pre.filter(async(student) =>{  
            if(student.id== record.id){
          await axios.delete(`https://621d1343806a09850a518b88.mockapi.io/user/${student.id}`);}
            return student.id !== record.id});
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
 
 
 
 
 
 
 
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <div className="App">
      
      <header className="App-header">
      <h3 className="user">User Data</h3>

    
       
        <Table  columns={columns} dataSource={dataSource}></Table>
       
       
        <Modal 
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {

             
              return pre.map(async(student) => {
                if (student.id === editingStudent.id) {
                  await axios.put(`https://621d1343806a09850a518b88.mockapi.io/user/${student.id}`,editingStudent)
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input className="input" style={{margin:10}}
           prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="Name"
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input style={{margin:10}}
            value={editingStudent?.email}  placeholder="Email"
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input style={{margin:10}}
            value={editingStudent?.address}  placeholder="Address"
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />

<span style={{marginLeft:20}}>Gender</span>
 <Radio.Group  value={editingStudent?.gender} style={{marginLeft:50,margin:2 }} 
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, gender: e.target.value };
              });
            }}>
           
      <Radio value={"male"}>Male</Radio>
      <Radio value={"female"}>Female</Radio>
     
    </Radio.Group>
         
          <Input style={{margin:10}}
            value={editingStudent?.dateofbirth}  placeholder="DOB"
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, dateofbirth: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;