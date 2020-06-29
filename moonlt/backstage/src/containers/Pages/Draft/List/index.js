import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, Tabs, Row, Col, Radio, TreeSelect, Select } from 'antd';
import { Title, Wrapper, FormOperate, FloatWrapper } from '@/components/Style';
import * as actions from './actions';
import { selectCategoryList, selectPlateList, selectDraftList, selectPage, selectTotal } from './selectors';
import moment from 'moment';
const { Option } = Select;
// 递归树形结构
const transCategoryData = (data) => {
  const finalData = [];
  const findChild = (arr) => {
    const finalChild = arr;
    arr.forEach((pNode, index) => {
      const tChild = [];
      data.forEach((cNode) => {
        if (pNode.cid === cNode.pid) {
          cNode.title = cNode.name;
          cNode.value = cNode.cid;
          cNode.key = cNode.cid;
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
      item.title = item.name;
      item.value = item.cid;
      item.key = item.cid;
      finalData.push(item);
    }
  })
  return findChild(finalData);
}
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.loadCategory();
    this.props.loadDraft({});
  }
  handleLoadPlate = (value) => {
    const params = { cid: value };
    this.state.formRef.current.setFieldsValue({ plate: []})
    this.props.loadPlate(params);
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
  handlePublish = () => {
    this.state.formRef.current.validateFields().then(values => {
      const params = {};
      Object.keys(values).forEach((key) => {
        if (key === 'plate') params.plate = values.plate.join(',');
        else params[key] = values[key];
      })
      params.type = '1';
      this.props.publishDraft(params);
    })
  }
  handlePageChange = (e) => {
    this.props.loadDraft({ page: e })
  }
  render() {
    const { categoryList, plateList, draftList, page, total } = this.props;
    const columns1 = [{
      title: '稿件标题',
      dataIndex: 'title',
      key: 'title',
      width: 300,
    }, {
      title: '稿件类型',
      dataIndex: 'type',
      key: 'type',
      render: (t) => {
        if (t * 1 === 1) return '图文';
        if (t * 1 === 2) return '图集';
        if (t * 1 === 3) return '视频';
      }
    }, {
      title: '所属类目',
      dataIndex: 'category_name',
      key: 'category_name',
    }, {
      title: '所属板块',
      dataIndex: 'forum_name',
      key: 'forum_name',
    }, {
      title: '作者',
      dataIndex: 'author_name',
      key: 'author_name',
    }, {
      title: '发布时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (t) => <span>{ t && moment(t).format('YYYY-MM-DD HH:mm:ss') }</span>
    }, {
      title: '操作',
      key: 'operate',
      render: (t, record) => (
        <FormOperate>
          <Link to={`/manage/category/detail/${record.cid}`} style={{ padding: '4px 15px' }}>详情</Link>
        </FormOperate>
      )
    }];
    const pagination = {
      total,
      current: page * 1,
      pageSize: 10,
      onChange: (e) => this.handlePageChange(e),
    }
    return (
      <div>
        <Title>
          <div className="borderLeft"></div>
          <h2>稿件列表</h2>
        </Title>
        <FloatWrapper>
          <Form layout="inline" style={{ float: 'left' }}>
            <Form.Item style={{ verticalAlign: '-webkit-baseline-middle' }}>
              <Input
                placeholder="请输入文章标题"
                // value={values}
                // onChange={this.handleInputChange}
              />
            </Form.Item>
            <Form.Item>
              <Button className="f-r" type="primary">
                搜索
              </Button>
            </Form.Item>
          </Form>
          <Button type="primary" className="f-r" onClick={() => this.props.history.push('/draft/add')}>添加稿件</Button>
        </FloatWrapper>
        <Wrapper>
          <Table columns={columns1} dataSource={draftList && !!draftList.length && draftList} pagination={pagination} rowKey="article_id" />
        </Wrapper>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    categoryList: selectCategoryList(state),
    plateList: selectPlateList(state),
    draftList: selectDraftList(state),
    page: selectPage(state),
    total: selectTotal(state),
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
export default connect(mapStateToProps, mapActionsToProps)(List);
