import { createSelector } from 'reselect';
// state.get 是异步的
const selectForumDomain = state => state.get('Manage/Forum/List');
const selectForumList = createSelector(
  selectForumDomain,
  (subState) => subState && subState.forumList,
)
const selectPage = createSelector(
  selectForumDomain,
  (subState) => subState && subState.page,
)
const selectTotal = createSelector(
  selectForumDomain,
  (subState) => subState && subState.total,
)
export {
  selectForumList,
  selectPage,
  selectTotal,
}