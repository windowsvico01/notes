import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, Form, Input } from 'antd';
import { Title, Wrapper, FloatWrapper, FormOperate} from '@/components/Style';
import * as actions from './actions';
import { selectCategory, selectFields, selectModalVisible, selectEditCid } from './selectors';
import { countNum } from '@/utils/tools';
// 递归树形结构
const transCategoryData = (data) => {
  console.log(data);
  const finalData = [];
  const findChild = (arr) => {
    const finalChild = arr;
    arr.forEach((pNode, index) => {
      const tChild = [];
      data.forEach((cNode) => {
        if (pNode.cid === cNode.pid) {
          tChild.push(cNode);
        }
      })
      if (tChild.length) {
        findChild(tChild);
        finalChild[index].children = tChild;
      }
    })
    return finalChild
  }
  data.forEach((item) => {
    if (item.pid === 0) {
      finalData.push(item);
    }
  })
  return findChild(finalData);
}
// 查看是否为添加子类目
const getTitle = (fields) => {
  let isChild = '添加类目';
  fields && fields.length && fields.forEach((item) => {
    if (item.name && item.name[0] === 'pid' && item.value) isChild = '添加子类目';
  })
  return isChild;
}
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formRef: React.createRef(),
      timer: '',
      editId: '',
    };
  }
  componentWillMount() {
    this.props.loadCategory();
  }
  handleUpdateCategory = () => {
    const { editCid } = this.props;
    if (editCid) { // 编辑
      this.state.formRef.current.validateFields().then(values => {
        const params = { cid: editCid };
        Object.keys(values).forEach((key) => {
          params[key] = values[key];
        })
        this.props.updateCategory(params);
      })
    } else { // 添加
      this.state.formRef.current.validateFields().then(values => {
        const params = {};
        Object.keys(values).forEach((key) => {
          params[key] = values[key];
        })
        this.props.addCategory(params);
      })
    }
    
  }
  toggleModalVisible = (bool) => {
    if (!bool) {
      this.state.formRef.current.resetFields();
      this.props.fieldsChange([]); // 清空
    }
    this.props.modalVisibleToggle(bool);
  }
  handleFilesChange = (values) => {
    if (this.state.timer) clearTimeout(this.state.timer);
    const tTimer = setTimeout(() => {
      this.props.fieldsChange(values);
      this.setState({
        timer: '',
      })
    }, 200)
    this.setState({
      timer: tTimer
    })
  }
  handleEditCategory = (fields) => {
    const finalFields = [];
    Object.keys(fields).forEach((key) => {
      if (key !== 'cid') {
        finalFields.push({ name: [key], value: fields[key] });
      }
    })
    this.props.fieldsChange(finalFields, fields.cid);
    this.toggleModalVisible(true);
  }
  handleAddChildCategory = (pid) => {
    const finalFields = [{ name: ['pid'], value: pid }];
    this.props.fieldsChange(finalFields);
    this.toggleModalVisible(true);
  }
  render() {
    const { category, fields, modalVisible } = this.props;
    const { formRef } = this.state;
    const label = formRef && formRef.current && formRef.current.getFieldValue('label') || '';
    const columns = [{
      title: '类目名称',
      dataIndex: 'name',
      key: 'name',
      width:400,
    }, {
      title: 'cid',
      dataIndex: 'cid',
      key: 'cid',
    },  {
      title: '操作',
      key: 'operate',
      render: (t, record) => (
        <FormOperate>
          <Button type="link" onClick={() => this.handleEditCategory(record)}>编辑</Button>
          <Link to={`/manage/category/detail/${record.cid}`} style={{ padding: '4px 15px' }}>详情</Link>
          { record.pid * 1 === 0 && <Button type="link" onClick={() => this.handleAddChildCategory(record.cid)}>添加子类目</Button>}
        </FormOperate>
      )
    }];
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }; 
    return (
      <div>
        <Title>
          <div className="borderLeft"></div>
          <h2>类目管理</h2>
          <Button type="primary" className="btn-r" onClick={() => this.toggleModalVisible(true)}>添加类目</Button>
        </Title>
        <Wrapper>
          <Table columns={columns} size="middle" dataSource={category && !!category.length && transCategoryData(category)} pagination={false} rowKey="cid" />
        </Wrapper>
        <Modal
          title={this.props.editCid ? '编辑类目' : getTitle(fields)}
          visible={modalVisible}
          width={500}
          onOk={() => this.handleUpdateCategory()}
          onCancel={() => this.toggleModalVisible(false)}
          okText={this.props.editCid ? '确定' : '添加'}
          cancelText="取消"
          maskClosable={false}
          forceRender
        >
          <Form
            ref={formRef}
            onFieldsChange={(_, all) => this.handleFilesChange(all)}
            fields={(fields && fields.length) ? fields : []}
            initialValues={[]}
          >
            <Form.Item
              {...layout}
              label="名称"
              name="name"
              rules={[{ required: true, message: '请输入类目名称' }]}
            >
              <Input addonAfter={<div style={{ width: '50px' }}>{countNum(label)}个字</div>} />
            </Form.Item>
            <Form.Item
              {...layout}
              label="key"
              name="path_key"
              rules={[{ required: true, message: '请输入唯一key值' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...layout}
              label="pid"
              name="pid"
              style={{ display: 'none' }}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    category: selectCategory(state),
    fields: selectFields(state),
    modalVisible: selectModalVisible(state),
    editCid: selectEditCid(state),
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
export default connect(mapStateToProps, mapActionsToProps)(List);
