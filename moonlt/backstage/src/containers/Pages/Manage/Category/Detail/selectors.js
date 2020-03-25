import { createSelector } from 'reselect';
// state.get 是异步的
const selectDetailDomain = state => state.get('Manage/Category/Detail');
const selectInfo = createSelector(
  selectDetailDomain,
  (subState) => subState && subState.info,
)
const selectPlateList = createSelector(
  selectDetailDomain,
  (subState) => subState && subState.plateList,
)
const selectFields = createSelector(
  selectDetailDomain,
  (subState) => subState && subState.fields,
)
const selectModalVisible = createSelector(
  selectDetailDomain,
  (subState) => subState && subState.modalVisible,
)
export {
  selectInfo,
  selectPlateList,
  selectFields,
  selectModalVisible,
}