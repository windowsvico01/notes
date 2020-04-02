import React from 'react';
import E from 'wangeditor';
import { Button, Modal, Form, Input, Upload, message, Spin } from 'antd';
import { LeftOutlined, UploadOutlined, PlusOutlined, PictureOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ToolDef = styled.div`
  border: 1px solid #ccc;
  border-bottom: none;
`;
const ToolCus = styled.div`
  height: 30px;
  padding: 0 5px;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
`;
const Edit = styled.div`
  border: 1px solid #ccc;
  height: 300px;
  overflow: scroll;
`;
const ToolBtn = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  color: #999;
  line-height: 14px;
  font-weight: 500;
  :hover {
    color: #000;
  }
`;
class Editor extends React.PureComponent {
    constructor(props){
        super(props);
        this.wEditor = {};
        this.state = {
            editorContent: '',
            imgUploading: false,
        };
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        const toolElem = this.refs.toolDefElem;
        this.wEditor = new E(toolElem, elem);
        // 配置工具栏
        this.wEditor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          // 'emoticon',  // 表情
          // 'image',  // 插入图片
          'table',  // 表格
          // 'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        this.wEditor.customConfig.onchange = html => {
            this.setState({
              editorContent: html
            })
            if (this.props.onChange) this.props.onChange(html);
        }
        this.wEditor.create()
        this.wEditor.txt.html(this.props.defaultValue || '');
    }
    render() {
      const _this = this;
      const props = {
        name: 'file',
        action: 'http://127.0.0.1:3000/user/fileUpload',
        showUploadList: false,
        onChange(info) {
          _this.setState({
            imgUploading: true
          });
          if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
            _this.setState({
              imgUploading: false
            });
            _this.wEditor.txt.append(`<p><img src='${info.file.response.location}' /></p>`)
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
            _this.setState({
              imgUploading: false
            });
          }
        },
      };
      return (
        <div>
          <ToolDef id="toolDef" ref="toolDefElem"></ToolDef>
          <ToolCus id="toolCus">
          <Upload {...props}>
            <ToolBtn>
              {this.state.imgUploading ? <Spin size="small" /> : <PictureOutlined />}
            </ToolBtn>
          </Upload>
          </ToolCus>
          <Edit ref="editorElem"></Edit>
        </div>
      );
    }
}

export default Editor;