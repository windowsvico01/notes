import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button, Modal, Form, Input, Tabs, Row, Col, Radio, TreeSelect, Select } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Title, Wrapper, RightSide, LeftSide } from '@/components/Style';
import styled from 'styled-components';
import * as actions from './actions';
import { selectFields, selectCategoryList, selectPlateList } from './selectors';
import { countNum } from '@/utils/tools';
import WangEditor from '@/components/Editor';
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const ButtonCon = styled.div`
  button{
    margin-right: 15px;
  }
`;
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
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formRef: React.createRef(),
    };
  }
  componentWillMount() {
    this.props.loadCategory();
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
  render() {
    const { categoryList, plateList, fields } = this.props;
    const { formRef } = this.state;
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };
    const layoutRight = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const operations = <ButtonCon>
      <Button> 保存草稿 </Button>
      <Button type="primary" onClick={this.handlePublish}> 发布 </Button>
      </ButtonCon>;
    return (
      <div>
        <Title><Button style={{ float: 'left' }} icon={<LeftOutlined />} onClick={() => this.props.history.goBack()} /><h2>添加稿件</h2></Title>
        <Wrapper style={{ minWidth: '950px' }}>
          <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={operations}>
            <TabPane tab="文章" key="1">
              <Form
                ref={formRef}
                onFieldsChange={(_, all) => this.handleFilesChange(all)}
                fields={(fields && fields.length) ? fields : []}
                initialValues={[]}
              >
                <RightSide>
                  <Form.Item
                    {...layoutRight}
                    label="类目"
                    name="cid"
                  >
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={transCategoryData(categoryList)}
                      placeholder="请选择类目"
                      onChange={this.handleLoadPlate}
                      treeDefaultExpandAll
                    />
                  </Form.Item>
                  <Form.Item
                    {...layoutRight}
                    label="板块"
                    name="plate"
                  >
                    <Select
                      mode="tags"
                      placeholder="请选择板块"
                      defaultValue={[]}
                    >
                      {plateList && !!plateList.length && plateList.map((item) => {
                        return <Option key={item.id}>{item.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </RightSide>
                <LeftSide>
                  <Form.Item
                    {...layout}
                    label="标题"
                    name="title"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...layout}
                    label="简介"
                    name="summary"
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item
                    {...layout}
                    label="正文"
                    name="content"
                  >
                    <WangEditor
                      defaultValue={''}
                    />
                  </Form.Item> 
                </LeftSide>
              </Form> 
            </TabPane>
            <TabPane tab="图集" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="视频" key="3">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>

        </Wrapper>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    fields: selectFields(state),
    categoryList: selectCategoryList(state),
    plateList: selectPlateList(state),
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
export default connect(mapStateToProps, mapActionsToProps)(Add);
