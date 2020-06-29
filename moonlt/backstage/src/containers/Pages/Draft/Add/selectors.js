import { createSelector } from 'reselect';
// state.get 是异步的
const selectAddDomain = state => state.get('Draft/Add');

const selectForumList = createSelector(
  selectAddDomain,
  (subState) => subState && subState.forumList,
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
  selectForumList,
  selectFields,
}