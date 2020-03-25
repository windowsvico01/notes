import { createSelector } from 'reselect';
// state.get 是异步的
const selectCategoryDomain = state => state.get('Manage/Category/List');
const selectCategory = createSelector(
  selectCategoryDomain,
  (subState) => subState && subState.category,
)
const selectFields = createSelector(
  selectCategoryDomain,
  (subState) => subState && subState.fields,
)
const selectModalVisible = createSelector(
  selectCategoryDomain,
  (subState) => subState && subState.modalVisible,
)
const selectEditCid = createSelector(
  selectCategoryDomain,
  (subState) => subState && subState.editCid,
)
export {
  selectCategory,
  selectFields,
  selectModalVisible,
  selectEditCid,
}