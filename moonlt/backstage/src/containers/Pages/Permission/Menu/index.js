import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button, Modal, Form, Input } from 'antd';
import { Title, Wrapper, FloatWrapper, FormOperate} from '@/components/Style';
import * as actions from './actions';
import { selectMenus, selectFields, selectModalVisible, selectEditId } from './selectors';
import { countNum } from '@/utils/tools';
// 递归树形结构
const transMenuData = (data) => {
  const finalData = [];
  const findChild = (arr) => {
    const finalChild = arr;
    arr.forEach((pNode, index) => {
      const tChild = [];
      data.forEach((cNode) => {
        if (pNode.id === cNode.pid) {
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
// 查看是否为添加子菜单
const getTitle = (fields) => {
  let isChild = '添加菜单';
  fields && fields.length && fields.forEach((item) => {
    if (item.name && item.name[0] === 'pid' && item.value) isChild = '添加子菜单';
  })
  return isChild;
}
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formRef: React.createRef(),
      timer: '',
      editId: '',
    };
  }
  componentWillMount() {
    this.props.loadMenu({ menu_ids: 'all' });
  }
  handleUpdateMenu = () => {
    const { editId } = this.props;
    if (editId) { // 编辑
      this.state.formRef.current.validateFields().then(values => {
        const params = { id: editId };
        Object.keys(values).forEach((key) => {
          params[key] = values[key];
        })
        this.props.updateMenu(params);
      })
    } else { // 添加
      this.state.formRef.current.validateFields().then(values => {
        const params = {};
        Object.keys(values).forEach((key) => {
          params[key] = values[key];
        })
        this.props.addMenu(params);
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
  handleEditMenu = (fields) => {
    const finalFields = [];
    Object.keys(fields).forEach((key) => {
      if (key !== 'id') {
        finalFields.push({ name: [key], value: fields[key] });
      }
    })
    this.props.fieldsChange(finalFields, fields.id);
    this.toggleModalVisible(true);
  }
  handleAddChildMenu = (pid) => {
    const finalFields = [{ name: ['pid'], value: pid }];
    this.props.fieldsChange(finalFields);
    this.toggleModalVisible(true);
  }
  handleChangeMenuShow = (id, value) => {
    const params = { id, show_side: value };
    this.props.updateMenu(params);
  }
  render() {
    const { menus, fields, modalVisible } = this.props;
    const { formRef } = this.state;
    const label = formRef && formRef.current && formRef.current.getFieldValue('label') || '';
    const columns = [{
      title: '名称',
      dataIndex: 'label',
      key: 'label',
      width:400,
    }, {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    }, {
      title: '菜单中显示',
      dataIndex: 'show_side',
      key: 'show_side',
      render: (t, record) => <span>
      {t === '1' ?
        <Button type="primary" size="small" shape="round" onClick={() => this.handleChangeMenuShow(record.id, '0')}>显示</Button> :
        <Button type="primary" danger size="small" shape="round" onClick={() => this.handleChangeMenuShow(record.id, '1')}>隐藏</Button>}
      </span>,
    }, {
      title: '操作',
      key: 'operate',
      render: (t, record) => (
        <FormOperate>
          <Button type="link" onClick={() => this.handleAddChildMenu(record.id)}>添加子菜单</Button>
          <Button type="link" onClick={() => this.handleEditMenu(record)}>编辑</Button>
        </FormOperate>
      )
    }];
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }; 
    return (
      <div>
        <Title><div className="borderLeft"></div><h2>菜单管理</h2></Title>
        <FloatWrapper>
          <Button className="f-r" type="primary" onClick={() => this.toggleModalVisible(true)}>
            添加菜单
          </Button>
        </FloatWrapper>
        <Wrapper>
          <Table columns={columns} size="middle" dataSource={menus && !!menus.length && transMenuData(menus)} rowKey="route" />
        </Wrapper>
        <Modal
          title={this.props.editId ? '编辑菜单' : getTitle(fields)}
          visible={modalVisible}
          width={500}
          onOk={() => this.handleUpdateMenu()}
          onCancel={() => this.toggleModalVisible(false)}
          okText={this.props.editId ? '确定' : '添加'}
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
              name="label"
              rules={[{ required: true, message: '请输入菜单名称' }]}
            >
              <Input addonAfter={<div style={{ width: '50px' }}>{countNum(label)}个字</div>} />
            </Form.Item>
            <Form.Item
              {...layout}
              label="唯一标识"
              name="menu_key"
              rules={[{ required: true, message: '请输入唯一标识' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...layout}
              label="路径"
              name="path"
              rules={[{ required: true, message: '请输入路径' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...layout}
              label="图标"
              name="icon"
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...layout}
              label="Route"
              name="route"
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...layout}
              label="排序"
              name="sort_num"
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
    menus: selectMenus(state),
    fields: selectFields(state),
    modalVisible: selectModalVisible(state),
    editId: selectEditId(state),
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
export default connect(mapStateToProps, mapActionsToProps)(Menu);
