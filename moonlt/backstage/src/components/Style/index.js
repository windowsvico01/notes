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
  height: 32px;
  margin-bottom: 15px;
  .borderLeft {
    width: 3px;
    height: 32px;
    background: #91d5ff;
    float: left;
  }
  h2 {
    font-size: 18px;
    float: left;
    margin: 0 0 0 10px;
    height: 32px;
    line-height: 32px;
  }
  .anticon{
    vertical-align: inherit!important;
  }
`;
const FormOperate = styled.div`
  overflow: hidden;
  a {
    margin-right: 10px;
  }
`;
const SpinCon = styled.div`
  text-align: center;
  width: 100px;
  height: 100px;
  position: absolute;
  padding: 20px;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
`;
const LeftSide = styled.div`
  margin-right: ${props => props.width || 300 }px;
  overflow: hidden;
`;
const RightSide = styled.div`
  float: right;
  width: ${props => props.width || 270 }px;
  .ant-row {
    margin:0 10px 24px 0;
  }
`;
export { Wrapper, FloatWrapper, Title, FormOperate, SpinCon, LeftSide, RightSide }