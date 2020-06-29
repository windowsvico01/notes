import { createSelector } from 'reselect';
// state.get 是异步的
const selectDetailDomain = state => state.get('Manage/Forum/Add');
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
const selectCategoryList = createSelector(
  selectDetailDomain,
  (subState) => subState && subState.categoryList,
)
export {
  selectInfo,
  selectPlateList,
  selectFields,
  selectModalVisible,
  selectCategoryList,
}