import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Title, Wrapper, FloatWrapper, FormOperate} from '@/components/Style';
import { Table, Button, Modal, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { selectUsers, selectTotal, selectCurrent } from './selectors';
import * as actions from './actions';
import moment from 'moment';
import { isNumber } from '@/utils/tools';

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: '',
    };
  }
  componentWillMount() {
    this.props.getUsers({});
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
  render() {
    const { users, total = 0, current = 1 } = this.props;
    const { values } = this.state;
    const columns = [{
      title: 'uid',
      dataIndex: 'uid',
      key: 'uid',
    }, {
      title: '用户昵称',
      dataIndex: 'username',
      key: 'username',
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
      title: '最新登录时间',
      dataIndex: 'tk_timer',
      key: 'tk_timer',
      render: (t) => <span>{ t > 0 ? moment.unix(t/1000).format('YYYY-MM-DD HH:mm:SS') : '--' }</span>,
    }, {
      title: '操作',
      key: 'operate',
      width: 200,
      render: (t, record) => (
        <FormOperate>
          <Button type="link">编辑</Button>
          <Button type="link">菜单权限</Button>
        </FormOperate>
      )
    }];
    const pagination = {
      total,
      current: current * 1,
      pageSize: 10,
      onChange: (e) => this.handlePageChange(e),
    }
    console.log(pagination);
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
          <Table columns={columns} dataSource={users} rowKey="uid" pagination={pagination} />
        </Wrapper>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    users: selectUsers(state),
    total: selectTotal(state),
    current: selectCurrent(state),
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
export default connect(mapStateToProps, mapActionsToProps)(Manager);