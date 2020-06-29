import React, { Component } from 'react';
import { Title, Wrapper, RightSide, LeftSide } from '@/components/Style';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, Form, Input, Card, Row, Col, TreeSelect, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { selectPlateList, selectFields, selectModalVisible, selectCategoryList } from './selectors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import moment from 'moment';
import { truncate } from 'fs';
const { TextArea } = Input;
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
      timer: null,
      fileList: [],
    };
  }
  formRef = React.createRef();
  componentWillMount() {
    this.props.loadCategory({});
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
  getImageList = (e) => {
    console.log(e);
    const imageList = [];
    if (!e.fileList || !Array.isArray(e.fileList)) return imageList;
    e && e.fileList.forEach((file) => {
      const tSuccess = file.response && file.response.code * 1 === 0;
      let tItem = {};
      if (tSuccess) { // 上传成功的
        tItem = file.response;
      } else { // 上传中和上传失败的
        tItem = file;
      }
      imageList.push(tItem);
    });
    return imageList;
  }
  transformFile = (file) => {
    return new File([file], file.name, { type: file.type, lastModifiedDate: new Date().valueOf() });
  }
  handleSubmitForum = () => {
    this.formRef.current.validateFields().then(values => {
      const params = {};
      Object.keys(values).forEach((key) => {
        if (key === 'cover') params.cover = values.cover[0].location;
        else params[key] = values[key];
      })
      this.props.addForum(params);
    })
  }
  render() {
    const { fields, categoryList = []} = this.props;
    const { fileList } = this.state;
    const _this = this;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    const covers = this.formRef && this.formRef.current && this.formRef.current.getFieldValue('cover') || [];
    console.log(covers);
    const uploadProps = {
      name: 'file',
      action: window.location.hostname === '127.0.0.1' ? 'http://127.0.0.1:3000/user/fileUpload' : 'http://62.234.73.102:3000/user/fileUpload',
      className: 'avatar-uploader',
      showUploadList: true,
      fileList,
      listType: 'picture-card',
      transformFile: this.transformFile,
      // defaultFileList: [],
      // headers: {
      //   authorization: 'authorization-text',
      // },
      onChange(info) {
        let curFileList = info.fileList;
        _this.setState({
          ..._this.state,
          fileList: curFileList,
        })
        _this.formRef && _this.formRef.current && _this.formRef.current.setFieldsValue({cover: _this.getImageList(info)});
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          console.log(info);
          message.success(`${info.file.name} 上传成功`);
          return info.fileList;
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
      onRemove(info) {
        _this.formRef && _this.formRef.current && _this.formRef.current.setFieldsValue({cover: _this.getImageList(info)});
      }
    }
    return (
      <div>
        <Title><Button style={{ float: 'left' }} icon={<LeftOutlined />} onClick={() => this.props.history.goBack()} /><h2>添加板块</h2></Title>
        <Wrapper>
          <Form
            {...layout}
            ref={this.formRef}
            onFieldsChange={(_, all) => this.handleFilesChange(all)}
            fields={(fields && fields.length) ? fields : []}
            initialValues={[]}
            style={{ maxWidth: '600px' }}
          >
            <Form.Item
              label="板块名称"
              name="name"
              rules={[{ required: true, message: '请输入板块名称' }]}
            >
              <Input
                placeholder="请输入板块名称"
                // value={values}
                onChange={this.handleInputChange}
              />
            </Form.Item>
            <Form.Item
              {...layout}
              label="所属类目"
              name="cid"
              required
            >
              <TreeSelect
                treeData={transCategoryData(categoryList)}
                placeholder="请选择类目"
                // onChange={this.handleLoadPlate}
                treeDefaultExpandAll
              />
            </Form.Item>
            <Form.Item
              label="简介"
              name="summary"
            >
              <TextArea rows={4} placeholder="请输入简介" />
            </Form.Item>
            <Form.Item
              label="标题颜色"
              name="color"
              rules={[{ required: false, message: '请输入板块标题颜色' }]}
            >
              <Input
                placeholder="请输入板块标题颜色"
                // value={values}
                // onChange={this.handleInputChange}
              />
            </Form.Item>
            <Form.Item
              {...layout}
              label="封面"
              name="cover"
              // getValueFromEvent={this.getImageList}
            >
              <ImgCrop
                rotate
                aspect={5/1}
                modalTitle="裁剪"
                modalOk="确定"
                modalCancel="确定"
              >
                {/* <Form.Item
                  name="cover"
                  getValueFromEvent={this.getImageList}
                  noStyle
                > */}
                  <Upload
                    {...uploadProps}
                  >
                    { !covers.length && (
                      <div>
                        <PlusOutlined />
                        <div className="ant-upload-text">上传</div>
                      </div>
                    )}
                  </Upload>
                {/* </Form.Item> */}
              </ImgCrop>

            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={() => this.handleSubmitForum()}>保 存</Button>
            </Form.Item>
          </Form>
        </Wrapper>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    // info: selectInfo(state),
    plateList: selectPlateList(state),
    fields: selectFields(state),
    modalVisible: selectModalVisible(state),
    categoryList: selectCategoryList(state),
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
export default connect(mapStateToProps, mapActionsToProps)(Add);