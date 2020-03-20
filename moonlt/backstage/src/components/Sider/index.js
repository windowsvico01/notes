import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Icon } from '@ant-design/compatible';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
const { SubMenu } = Menu;
const { Sider } = Layout;
const transMenuData = (data) => {
  const finalData = [];
  const findChild = (arr) => {
    const finalChild = arr;
    arr.forEach((pNode, index) => {
      const tChild = [];
      data.forEach((cNode) => {
        if (pNode.id === cNode.pid && cNode.show_side === '1') {
          tChild.push(cNode);
        }
      })
      if (tChild.length) {
        findChild(tChild);
        finalChild[index].child = tChild;
      } else {
        finalChild[index].child = [];
      }
    })
    return finalChild
  }
  data.forEach((item) => {
    if (item.pid === 0 && item.show_side === '1') {
      finalData.push(item);
    }
  })
  return findChild(finalData);
}
class MSider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inlineCollapsed: false,
    }
  }
  toggleCollapsed = () => {
    this.setState({
      ...this.state,
      inlineCollapsed: !this.state.inlineCollapsed,
    });
  }
  checkHasChild = (menu) => {
    if (menu.child && menu.child.length) {
      let hasShowChild = false;
      menu.child.forEach((item) => {
        if (item.show_side) hasShowChild = true;
      })
      return hasShowChild;
    }
    return false;
  }
  render() {
    const { inlineCollapsed } = this.state;
    const { menus } = this.props;
    const menuMap = transMenuData(menus);
    return (
      <Sider
        width={250}
        style={{ background: '#fff' }}
        // collapsible
        collapsed={inlineCollapsed}
      >
        <Menu
          mode="inline"
          // inlineCollapsed={true}
        >
          {menuMap && menuMap.length && menuMap.map(item => {
            const tMenu = (menu) => {
              if (this.checkHasChild(menu)) {
                return (
                  <SubMenu
                    key={menu.menu_key}
                    title={(
                      <span>
                        {menu.icon && (<Icon type={menu.icon} style={{ verticalAlign: '0.1em' }} />)}
                        <span>{menu.label}</span>
                      </span>
                    )}
                  >
                    {menu.child.map(cMenu => tMenu(cMenu))}
                  </SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={menu.menu_key} onClick={() => this.props.history.push(menu.path)}>
                    <span>
                      {menu.icon  && <Icon type={menu.icon} style={{ verticalAlign: '0.1em' }} />}
                      <span>{menu.label}</span>
                    </span>
                  </Menu.Item>
                )  
              }
            };
            return tMenu(item);
          })}
          <div style={{ width: '100%', height: '40px', lineHeight: '40px', textAlign: 'center' }}>
            <a onClick={()=>this.toggleCollapsed()}>{inlineCollapsed ? <Icon type="right-square" theme="twoTone" /> : <Icon type="left-square" theme="twoTone" />}</a>
          </div>
        </Menu>
      </Sider>
    );
  }
}
MSider.propTypes = {
  menus: PropTypes.array,
};
export default withRouter(MSider);

