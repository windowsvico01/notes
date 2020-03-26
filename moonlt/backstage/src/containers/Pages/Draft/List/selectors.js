import { createSelector } from 'reselect';
// state.get 是异步的
const selectAddDomain = state => state.get('Draft/List');

const selectPlateList = createSelector(
  selectAddDomain,
  (subState) => subState && subState.plateList,
)
const selectCategoryList = createSelector(
  selectAddDomain,
  (subState) => subState && subState.categoryList,
)
const selectDraftList = createSelector(
  selectAddDomain,
  (subState) => subState && subState.draftList,
)
const selectTotal = createSelector(
  selectAddDomain,
  (subState) => subState && subState.total,
)
const selectPage = createSelector(
  selectAddDomain,
  (subState) => subState && subState.page,
)
export {
  selectCategoryList,
  selectPlateList,
  selectDraftList,
  selectTotal,
  selectPage,
}