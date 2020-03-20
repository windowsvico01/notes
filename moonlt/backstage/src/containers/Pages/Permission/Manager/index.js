import React, { Component } from 'react';
import { Title, Wrapper, FloatWrapper, FormOperate} from '@/components/Style';
import { Table, Button, Modal, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class Permission extends Component {
  render() {
    return (
      <div>
        <Title><div className="borderLeft"></div><h2>用户管理</h2></Title>
        <FloatWrapper>
          <Form layout="inline" style={{ float: 'left' }}>
            <Form.Item style={{ verticalAlign: '-webkit-baseline-middle' }}>
              <Input 
                addonBefore={<UserOutlined />}
                placeholder="请输入uid或用户姓名"
              />
            </Form.Item>
            <Form.Item>
              <Button className="f-r" type="primary">
                搜索
              </Button>
            </Form.Item>
          </Form>
          <Button className="f-r" type="primary">
            添加用户
          </Button>
        </FloatWrapper>
      </div>
    )
  }
}

export default Permission;