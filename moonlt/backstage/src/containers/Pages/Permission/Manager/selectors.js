import { createSelector } from 'reselect';
// state.get 是异步的
const selectManagerDomain = state => state.get('Permission/Manager');
const selectUsers = createSelector(
  selectManagerDomain,
  (subState) => subState && subState.userList,
)
const selectTotal = createSelector(
  selectManagerDomain,
  (subState) => subState && subState.total,
)
const selectCurrent = createSelector(
  selectManagerDomain,
  (subState) => subState && subState.current,
)
const selectMenus = createSelector(
  selectManagerDomain,
  (subState) => subState && subState.menus,
)

export {
  selectUsers,
  selectTotal,
  selectCurrent,
  selectMenus,
}