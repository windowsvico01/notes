import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding-right: 24px;
  margin-bottom: 15px;
`;
const FloatWrapper = styled.div`
  width: 100%;
  height: auto;
  padding-right: 24px;
  overflow: hidden;
  margin-bottom: 15px;
  .f-l {
    float: left;
  }
  .f-r {
    float: right;
  }
  .ant-input-group-addon{
    vertical-align: -webkit-baseline-middle;
  }
`;
const Title = styled.div`
  width: 100%;
  overflow: hidden;
  height: 20px;
  margin-bottom: 15px;
  .borderLeft {
    width: 3px;
    height: 20px;
    background: #91d5ff;
    float: left;
  }
  h2 {
    font-size: 18px;
    float: left;
    margin: 0 0 0 10px;
    height: 20px;
    line-height: 20px;
  }
`;
const FormOperate = styled.div`
  overflow: hidden;
  a {
    margin-right: 10px;
  }
`;
export { Wrapper, FloatWrapper, Title, FormOperate }