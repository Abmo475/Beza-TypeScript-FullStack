import React, { useEffect, useState } from 'react';
import '../index.css';
import {  Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import DataServices from '../services/Data.services';
import FilesUpload from './FilesUpload';
import {Item,EditableCellProps} from '../Interfaces/Interfaces'
import Swal from 'sweetalert2'
const originData: Item[] = [];
 
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Main: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: Item) => record.id === editingKey;
  const edit = (record: Partial<Item> & { id: React.Key }) => {
    console.log(record)
    form.setFieldsValue({ item_no: '', description: '', unit: '', ...record });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...data];

      const currentrow={
        id:key,
        item_no:row.item_no,
        description:row.description,
        unit:row.unit,
        rate:row.rate,
        amount:row.amount,
        qty:row.qty
      }
      console.log(currentrow)
      DataServices.update(currentrow)
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const remove=(id:String)=>{
    Swal.fire({
      title: 'Do you want to delete record?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        DataServices.delete(id);
        DataServices.getAll();
        document.location=""
        Swal.fire('Record deleted', '', 'success')
      } 
    })
   
  }
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '10%',
      editable:false,
    },
    {
      title: 'item Number',
      dataIndex: 'item_no',
      width: '10%',
      editable: true,
    },
    {
      title: 'description',
      dataIndex: 'description',
      editable: true,
      width:'100%'
    },
    {
      title: 'unit',
      dataIndex: 'unit',
      width: '25%',
      editable: true,
    },
    {
      title: 'rate',
      dataIndex: 'rate',
      width: '25%',
      editable: true,
    },
    {
      title: 'quantity',
      dataIndex: 'qty',
      width: '25%',
      editable: true,
    },
    {
      title: 'amount',
      dataIndex: 'amount',
      width: '25%',
      editable: true,
    },
    {
      title: 'created At',
      dataIndex: 'createdAt',
      width: '40%',
      editable: true,
    },
    {
      title: 'updated At',
      dataIndex: 'updatedAt',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      width:'10%',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return <>
        {editable ? 
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
            <SaveOutlined />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <i><CloseCircleOutlined /></i>
            </Popconfirm>
          </span>
         : 
          <Typography.Link  disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined />
          </Typography.Link>
        
      }
       <Typography.Link className='delete' onClick={() => remove(record.id)} style={{ marginRight: 8 }}>
       <DeleteOutlined style={{color:"red"}}/>
            </Typography.Link>
        </>
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  useEffect(()=>{
    DataServices.getAll().then((response)=>{
      const originData: Item[] = [];
      for (let i = 0; i < response.data.length; i++) {
        originData.push({
          id:response.data[i].id,
          item_no:response.data[i].item_no,
          description: response.data[i].description,
          unit: response.data[i].unit,
          qty:response.data[i].qty,
          amount: response.data[i].amount,
          rate: response.data[i].rate,
          createdAt:response.data[i].createdAt.split("T")[0],
          updatedAt:response.data[i].updatedAt.split("T")[0]

        });
      }
      setData(originData)
    })
    },[])
  return (
    <Form form={form} component={false}>
      <FilesUpload/>
      <Table
      className='table'
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default Main;