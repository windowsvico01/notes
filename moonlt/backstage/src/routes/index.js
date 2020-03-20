import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route, Redirect, Switch } from 'react-router-dom';
import { getAsyncInjectors } from '@/utils/asyncInjectors';
import cancelSagaOnLocationChange from '@/utils/cancelSagaOnLocationChange';
import queryString from 'query-string';

import hello from './Hello';
import hi from './Hi';
import home from './Home';
import charts from './Charts';
import plugins from './Plugins';
import permission from './Permission';
const modules = {
  menus: [
    home,
    hi,
    charts,
    hello,
    plugins,
    permission,
  ],
  others: []
};

// 为了根据模块名称找到文件
const convFirstChartUpper = (str) => str.substr(0, 1).toUpperCase() + str.substr(1);
const CRouter = (store) => {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  const requireAuth = (component, route) => {
      const { userData = {} } = store.getState().toJS().config;
      const { menus } = userData;
      const hasPermission = menus && menus.length && menus.filter((item) => item.route === route);
      // const { auth } = store.getState().httpData;
      // 权限验证，没有权限的跳转404
      if (!hasPermission || !hasPermission.length) return <Redirect to={'/404'} />;
      return component;
  };
  const requireLogin = (component, route) => {
      const { userData } = store.getState().toJS().config;
      const { userInfo } = userData;
      if (process.env.NODE_ENV === 'production' && !userInfo) { // 线上环境判断是否登录
          return <Redirect to={'/login'} />;
      }
      return userInfo ? requireAuth(component, route) : component;
  };
  const checkChild = (node) => {
    let hasChild = false;
    if (node.child && node.child.length) { // 有子节点
      node.child.forEach((elem) => {
        if (elem.child && elem.child.length) hasChild = true;
      })
    }
    return hasChild;
  }
  return (
    <Switch>
      {
        modules.menus.map(ele => {
          const route = (ele, parentPath) => {
            const elePath = ele.path ? convFirstChartUpper(ele.path) : '';
            const eleRoute = ele.route ? convFirstChartUpper(ele.route) : '';
            const routePath = `${parentPath || ''}${'/'+eleRoute}`;
            const finalPath = `${parentPath || ''}${'/'+elePath}`;
            const importModules = Promise.all([
              ele.hasReducer && import(`../containers/Pages${finalPath}/reducer`),
              ele.hasSagas && import(`../containers/Pages${finalPath}/sagas`)
            ])
            importModules.then(([reducer, sagas]) => {
              const reducerName = finalPath.substr(1)
              reducer && injectReducer(reducerName, reducer.default);
              sagas && injectSagas(cancelSagaOnLocationChange(sagas.default));
            })
            const Component = Loadable({
              loader: () => import(`../containers/Pages${finalPath}`),
              loading() {
                return <div>加载中噢......</div>
              },
            }); 
            return (
              <Route
                key={ele.path}
                // exact={!(ele.child && ele.child.length > 0)}
                // exact
                path={routePath}
                render={(props) => {
                  const reg = /\?\S*/g;
                  // 匹配?及其以后字符串
                  const queryParams = window.location.hash.match(reg);
                  // 去除?的参数
                  const { params } = props.match;
                  Object.keys(params).forEach(key => {
                      params[key] = params[key] && params[key].replace(reg, '');
                  });
                  props.params = { ...params };
                  const merge = { ...props, query: queryParams ? queryString.parse(queryParams[0]) : {} };
                  const finalNode = (
                    <Component {...merge}>
                      <Switch>
                        { ele.child && ele.child.length > 0 && ele.child.map((r) => route(r, props.match.path)) }
                        { checkChild(ele) && <Route render={() => <Redirect to="/404" />} /> }
                      </Switch>
                    </Component>
                  )
                  return requireLogin(finalNode, routePath.substring(1))

                }}
              />
            )
          }
          return route(ele);
        })
      } 
      {/* <Route render={() => <Redirect to="/404" />} />  */}
      <Redirect to="/404" />
    </Switch>
  );
}

export { CRouter, modules };