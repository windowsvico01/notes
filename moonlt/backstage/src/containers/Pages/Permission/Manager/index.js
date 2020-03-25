import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Title, Wrapper, FloatWrapper, FormOperate} from '@/components/Style';
import { Table, Button, Modal, Form, Input, Tree } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { selectUsers, selectTotal, selectCurrent, selectMenus } from './selectors';
import * as actions from './actions';
import moment from 'moment';
import { isNumber } from '@/utils/tools';
import { selectUserInfo } from '@/containers/App/selectors';
// 递归树形结构
const transMenuData = (data) => {
  const finalData = [];
  const findChild = (arr) => {
    const finalChild = arr;
    arr.forEach((pNode, index) => {
      const tChild = [];
      data.forEach((cNode) => {
        if (pNode.id === cNode.pid) {
          cNode.title = cNode.label;
          cNode.key = cNode.id.toString();
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
      item.title = item.label;
      item.key = item.id.toString();
      finalData.push(item);
    }
  })
  return findChild(finalData);
}
class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: '',
      checkedMenus: [],
      showEditUser: false,
      showMenus: false,
    };
  }
  componentWillMount() {
    this.props.getUsers({});
    this.props.loadMenu({ menu_ids: 'all' });
  }
  handlePageChange = (e) => {
    this.props.getUsers({ page: e })
  }
  handleInputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      ...this.state,
      values: e.target.value,
    })
  }
  handleSearch = () => {
    const { values } = this.state;
    const params = {};
    if (values) {
      const finalValues = values.replace(/,|\s/g,'');
      if (isNumber(finalValues)) params.uid = values;
      else params.username = values;
    }
    params.page = 1;
    this.props.getUsers(params);
  }
  handleEditPermission = (uid, permission) => {
    this.setState({
      ...this.state,
      checkedMenus: permission ? permission.split(',') : [],
      showMenus: true,
      editUid: uid,
    })
  }
  handleSelectMenu = (e) => {
    console.log(e);
    this.setState({
      ...this.state,
      checkedMenus: e.checked,
    })
  }
  handleCancelMenus = () => {
    this.setState({
      ...this.state,
      checkedMenus: [],
      showMenus: false,
      editUid: '',
    })
  }
  handleSubmitUpdate = () => {
    const { editUid, checkedMenus } = this.state;
    const params = {
      uid: editUid,
      permission: checkedMenus.join(','),
    }
    this.props.updateUser(params);
    setTimeout(() => {
      this.setState({
        ...this.state,
        checkedMenus: [],
        showMenus: false,
        editUid: '',
      })
    }, 500)
  }
  render() {
    const { users, total = 0, current = 1, userInfo = {}, menus = [] } = this.props;
    const { values, checkedMenus, showMenus, showEditUser } = this.state;
    const columns = [{
      title: 'uid',
      dataIndex: 'uid',
      key: 'uid',
      width: 80,
      fixed: true,
    }, {
      title: '用户昵称',
      dataIndex: 'username',
      key: 'username',
      width: 200,
      fixed: true,
    }, {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    }, {
      title: '注册时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (t) => <span>{ t ? moment(t).format('YYYY-MM-DD HH:mm:SS') : '--' }</span>,
    }, {
      title: '最近更新',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (t) => <span>{ t ? moment(t).format('YYYY-MM-DD HH:mm:SS') : '--' }</span>,
    }, {
      title: '最近登录',
      dataIndex: 'tk_timer',
      key: 'tk_timer',
      render: (t) => <span>{ t > 0 ? moment.unix(t/1000).format('YYYY-MM-DD HH:mm:SS') : '--' }</span>,
    }, {
      title: '操作',
      key: 'operate',
      width: 200,
      fixed: 'right',
      render: (t, record) => (
        <FormOperate>
          <Button type="link">编辑</Button>
          <Button type="link" onClick={() => this.handleEditPermission(record.uid, record.permission)}>菜单权限</Button>
        </FormOperate>
      )
    }];
    const pagination = {
      total,
      current: current * 1,
      pageSize: 10,
      onChange: (e) => this.handlePageChange(e),
    }
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }; 
    return (
      <div>
        <Title><div className="borderLeft"></div><h2>用户管理</h2></Title>
        <FloatWrapper>
          <Form layout="inline" style={{ float: 'left' }}>
            <Form.Item style={{ verticalAlign: '-webkit-baseline-middle' }}>
              <Input
                addonBefore={<UserOutlined />}
                placeholder="请输入uid或用户姓名"
                value={values}
                onChange={this.handleInputChange}
              />
            </Form.Item>
            <Form.Item>
              <Button className="f-r" type="primary" onClick={this.handleSearch}>
                搜索
              </Button>
            </Form.Item>
          </Form>
          <Button className="f-r" type="primary">
            添加用户
          </Button>
        </FloatWrapper>
        <Wrapper>
          <Table columns={columns} dataSource={users} scroll={{ x: 1200 }} rowKey="uid" pagination={pagination} />
        </Wrapper>
        <Modal
          title="菜单权限"
          visible={showMenus}
          width={400}
          onOk={this.handleSubmitUpdate}
          onCancel={this.handleCancelMenus}
        >
          <Tree
            checkable
            autoExpandParent
            defaultExpandAll
            checkStrictly
            checkedKeys={checkedMenus}
            treeData={transMenuData(menus)}
            onCheck={(e) => this.handleSelectMenu(e)}
          />
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    users: selectUsers(state),
    total: selectTotal(state),
    current: selectCurrent(state),
    userInfo: selectUserInfo(state),
    menus: selectMenus(state),
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
export default connect(mapStateToProps, mapActionsToProps)(Manager);