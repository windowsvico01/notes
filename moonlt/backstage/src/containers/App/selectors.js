import { createSelector } from 'reselect';

const selectRouterDomain =  (state) => {
  return state.get('router');
}
const selectConfigDomain = (state) => {
  return state.get('config');
}
const selectLocation = createSelector(
  selectRouterDomain,
  (subState) => subState && subState.location,
)
const selectMenus = createSelector(
  selectConfigDomain,
  (subState) => subState && subState.userData && subState.userData.menus,
);
const selectUserInfo = createSelector(
  selectConfigDomain,
  (subState) => subState && subState.userData && subState.userData.userInfo,
);
const selectShowLogin = createSelector(
  selectConfigDomain,
  (subState) => {
    return subState && subState.showLogin
  }
)
const selectLoading = createSelector(
  selectConfigDomain,
  (globalState) => globalState.get('loading').toJS()
);
const selectDialog = createSelector(
  selectConfigDomain,
  (globalState) => globalState.get('dialog')
);


export {
  selectLocation,
  selectShowLogin,
  selectUserInfo,
  selectLoading,
  selectDialog,
  selectMenus,
}