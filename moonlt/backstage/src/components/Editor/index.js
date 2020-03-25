import React from 'react';
import E from 'wangeditor';
import styled from 'styled-components';

const ToolDef = styled.div`
  border: 1px solid #ccc;
`;
const ToolCus = styled.div`
  height: 30px;
`;
const Edit = styled.div`
  border: 1px solid #ccc;
  height: 300px;
  overflow: scroll;
`;
class Editor extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            editorContent: '',
        };
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        const toolElem = this.refs.toolDefElem;
        const editor = new E(toolElem, elem);
        // 配置工具栏
        editor.customConfig.menus = [
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
        editor.customConfig.onchange = html => {
            this.setState({
              editorContent: html
            })
            console.log(this.props.onChange);
            if (this.props.onChange) this.props.onChange(html);
        }
        editor.create()
        editor.txt.html(this.props.defaultValue || '');
    }
    render() {
        return (
            <div>
              <ToolDef id="toolDef" ref="toolDefElem"></ToolDef>
              <ToolCus id="toolCus"></ToolCus>
              <Edit ref="editorElem"></Edit>
            </div>
        );
    }
}

export default Editor;