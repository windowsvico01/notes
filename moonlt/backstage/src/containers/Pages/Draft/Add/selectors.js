import { createSelector } from 'reselect';
// state.get 是异步的
const selectAddDomain = state => state.get('Draft/Add');

const selectPlateList = createSelector(
  selectAddDomain,
  (subState) => subState && subState.plateList,
)
const selectFields = createSelector(
  selectAddDomain,
  (subState) => subState && subState.fields,
)
const selectCategoryList = createSelector(
  selectAddDomain,
  (subState) => subState && subState.categoryList,
)
export {
  selectCategoryList,
  selectPlateList,
  selectFields,
}