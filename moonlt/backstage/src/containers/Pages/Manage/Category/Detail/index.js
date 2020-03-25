import React, { Component } from 'react';
import { Title, Wrapper, FloatWrapper, FormOperate} from '@/components/Style';
import { Table, Button, Modal, Form, Input, Card, Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { selectInfo, selectPlateList, selectFields, selectModalVisible } from './selectors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import moment from 'moment';
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formRef: React.createRef(),
    };
  }
  componentWillMount() {
    this.props.loadCategory({ cid: this.props.params.cid });
    this.props.loadPlate({ cid: this.props.params.cid });
  }
  toggleModalVisible = (bool) => {
    if (!bool) {
      this.state.formRef.current.resetFields();
      this.props.fieldsChange([]); // 清空
    }
    this.props.changeModal(bool);
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
  handleAddPlate = () => {
    const { cid } = this.props.params;
    this.state.formRef.current.validateFields().then(values => {
      const params = {};
      Object.keys(values).forEach((key) => {
        params[key] = values[key];
      })
      params.cid = cid;
      this.props.addPlate(params);
    })
  }
  render() {
    const { info, plateList, fields, modalVisible } = this.props;
    const { formRef } = this.state;
    const columns = [{
      title: '板块名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    }, {
      title: '板块id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '所属类目',
      dataIndex: 'category_name',
      key: 'category_name',
    }, {
      title: '关注人数',
      dataIndex: 'members',
      key: 'members',
    }, {
      title: '文章总数',
      dataIndex: 'news_count',
      key: 'news_count',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (t) => <span>{ t ? moment(t).format('YYYY-MM-DD HH:mm:ss') : '--' }</span>
    }, {
      title: '操作',
      key: 'operate',
      render: (t, record) => (
        <FormOperate>
          <Button type="link" onClick={() => this.handleEditCategory(record)}>编辑</Button>
          {/* <Link to={`/manage/category/detail/${record.cid}`} style={{ padding: '4px 15px' }}>详情</Link> */}
        </FormOperate>
      )
    }];
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Title><Button style={{ float: 'left' }} icon={<LeftOutlined />} onClick={() => this.props.history.goBack()} /><h2>类目详情</h2></Title>
        <Wrapper>
          <Card>
            <Form>
              <Row>
                <Col><Form.Item label="标题">{info.name}</Form.Item></Col>
                <Col><Form.Item label="类目id">{info.cid}</Form.Item></Col>
              </Row>
              <Row>
                <Col><Form.Item label="创建时间">{info.create_time ? moment(info.create_time).format('YYYY-MM-DD HH:mm:SS') : '--'}</Form.Item></Col>
                {/* <Col><Form.Item label="标题">aaaa</Form.Item></Col> */}
              </Row>
            </Form>
          </Card>
        </Wrapper>
        <Title><div className="borderLeft"></div><h2>板块</h2></Title>
        <FloatWrapper>
          <Form layout="inline" style={{ float: 'left' }}>
            <Form.Item style={{ verticalAlign: '-webkit-baseline-middle' }}>
              <Input
                placeholder="请输入板块标题"
                // value={values}
                onChange={this.handleInputChange}
              />
            </Form.Item>
            <Form.Item>
              <Button className="f-r" type="primary" onClick={this.handleSearch}>
                搜索
              </Button>
            </Form.Item>
          </Form>
          <Button className="f-r" type="primary" onClick={() => this.toggleModalVisible(true)}>
            添加板块
          </Button>
        </FloatWrapper>
        <Wrapper>
          <Table columns={columns} size="middle" dataSource={plateList && !!plateList.length && plateList} pagination={false} rowKey="id" />
        </Wrapper>
        <Modal
          title="添加模块"
          visible={modalVisible}
          width={500}
          onOk={() => this.handleAddPlate()}
          onCancel={() => this.toggleModalVisible(false)}
          okText="确定"
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
              label="板块名称"
              name="name"
              rules={[{ required: true, message: '请输入板块名称' }]}
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
    info: selectInfo(state),
    plateList: selectPlateList(state),
    fields: selectFields(state),
    modalVisible: selectModalVisible(state),
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
export default connect(mapStateToProps, mapActionsToProps)(Detail);