import { createSelector } from 'reselect';
// state.get 是异步的
const selectOverViewDomain = state => state.get('Permission/Menu');
const selectMenus = createSelector(
  selectOverViewDomain,
  (subState) => subState && subState.menus,
)
const selectFields = createSelector(
  selectOverViewDomain,
  (subState) => subState && subState.fields,
)
const selectModalVisible = createSelector(
  selectOverViewDomain,
  (subState) => subState && subState.modalVisible,
)
const selectEditId = createSelector(
  selectOverViewDomain,
  (subState) => subState && subState.editId,
)
export {
  selectMenus,
  selectFields,
  selectModalVisible,
  selectEditId,
}