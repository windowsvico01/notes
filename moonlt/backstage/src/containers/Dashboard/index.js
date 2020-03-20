import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectShowLogin, selectLocation, selectMenus } from '@/containers/App/selectors';
import * as actions from '@/containers/App/actions';

import Header from '@/components/Header';
import MSider from '@/components/Sider';
import Bread from '@/components/Bread';
const { Content } = Layout;
class Dashboard extends Component {
  
  render() {
    const { location, menus, showLogin } = this.props;
    return (
      <Layout style={{ background: '#fff' }}>
        <Header />
        <Layout style={{ background: '#fff' }}>
          <MSider menus={menus} />
          <Layout style={{ background: '#fff' }}>
            <Content
              style={{
                padding: '0 0 24px 24px',
                margin: 0,
                minHeight: 280,
              }}
            >  
              <Bread location={location} />   
               { menus && menus.length && this.props.children }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    showLogin: selectShowLogin(state),
    location: selectLocation(state),
    menus: selectMenus(state)
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
// const mapStateToProps = createStructuredSelector({
//   hi: selectHi(),
// })
export default connect(mapStateToProps, mapActionsToProps)(Dashboard);

// export default withRouter(Dashboard);