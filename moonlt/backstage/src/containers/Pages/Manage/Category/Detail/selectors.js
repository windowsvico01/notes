import { createSelector } from 'reselect';
// state.get 是异步的
const selectDetailDomain = state => state.get('Manage/Category/Detail');
const selectInfo = createSelector(
  selectDetailDomain,
  (subState) => subState && subState.info,
)
const selectForumList = createSelector(
  selectDetailDomain,
  (subState) => subState && subState.forumList,
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
  selectForumList,
  selectFields,
  selectModalVisible,
}