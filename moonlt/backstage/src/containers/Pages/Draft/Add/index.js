import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button, Modal, Form, Input, Tabs, Row, Col, Radio, TreeSelect, Select, Upload, message } from 'antd';
import { LeftOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
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
      publishing: false,
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
    const { publishing } = this.state;
    if (!publishing) {
      const _this = this;
      this.setState({
        publishing: true
      }, () => {
        setTimeout(() => {
          this.setState({
            publishing: false,
          })
        }, 1000);
        _this.state.formRef.current.validateFields().then(values => {
          const params = {};
          Object.keys(values).forEach((key) => {
            if (key === 'plate') params.plate = values.plate.join(',');
            if (key === 'cover') params.cover = values.cover.join('|');
            else params[key] = values[key];
          })
          params.type = '1';
          this.props.publishDraft(params);
        })
      })
    } else return;
  }
  getImageList = (e) => {
    const imageList = [];
    if (!e.fileList || !Array.isArray(e.fileList)) return imageList;
    e && e.fileList.forEach((file) => {
      const tUrl = file.response && file.response.code * 1 === 0 && file.response.location;
      if (tUrl) imageList.push(tUrl);
    });
    return imageList;
  }
  render() {
    const { categoryList, plateList, fields } = this.props;
    const { formRef } = this.state;
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };
    const layoutRight = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const operations = <ButtonCon>
      <Button> 保存草稿 </Button>
      <Button type="primary" onClick={() => this.handlePublish()}> 发布 </Button>
      </ButtonCon>;
    console.log(window.location.hostname);
    const uploadProps = {
      name: 'file',
      action: window.location.hostname === '127.0.0.1' ? 'http://127.0.0.1:3000/user/fileUpload' : 'http://62.234.73.102:3000/user/fileUpload',
      className: 'avatar-uploader',
      showUploadList: true,
      listType: 'picture-card',
      // headers: {
      //   authorization: 'authorization-text',
      // },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          return info.fileList;
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    }
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
                    required
                  >
                    <TreeSelect
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={transCategoryData(categoryList)}
                      placeholder="请选择类目"
                      onChange={this.handleLoadPlate}
                      treeDefaultExpandAll
                    />
                  </Form.Item>
                  {plateList && !!plateList.length && (
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
                  )}
                </RightSide>
                <LeftSide>
                  <Form.Item
                    {...layout}
                    label="标题"
                    name="title"
                    required
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
                  <Form.Item
                    {...layout}
                    label="封面"
                    name="cover"
                    getValueFromEvent={this.getImageList}
                  >
                    <Upload
                      {...uploadProps}
                    >
                      <div>
                        <PlusOutlined />
                        <div className="ant-upload-text">上传</div>
                      </div>
                    </Upload>
                  </Form.Item>
                  <div>
                    {/* {covers && !!covers.length && covers.map((url) => (
                      <div style={{ width: '100px', height: '100px', overflow: 'hidden', float: 'left', }} key={url}><img style={{ width: '100px', height: '100px' }} src={url} alt=""/></div>
                    ))} */}
                  </div>
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
