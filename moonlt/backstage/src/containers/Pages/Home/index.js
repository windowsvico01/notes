import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { createStructuredSelector } from 'reselect';
import { selectHi, selectCount } from './reselector';
import { Helmet } from "react-helmet";
import Toy from '@/components/Toys';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileArr: [],
    }
  }
  handleAdd = (num) => {
    this.props.addCount(num);
  }
  handleSelectFile = () => {
    // console.log(document.getElementById('fileItem').files[0]);
    const cFile = document.getElementById('fileItem').files[0];
    this.sliceFile(cFile);
  }
  sliceFile = (file) => {
    const fileSize = file.size;
    const step = 1024 * 100; // 100Kb;
    let index = 0;
    let start = 0;
    const fileArr = [];
    while (start < fileSize) {
      const end = (fileSize - start) > step ? start + step : fileSize;
      console.log(start + '-----' + end + '-----' + fileSize);
      const currentPice = file.slice(start, end);
      this.readFragment(currentPice, (res) => {
        fileArr.push({ file: res, t: index });
        this.setState({
          ...this.state,
          fileArr,
        }, () => {
          console.log(this.state.fileArr);
        });
      })
      index ++;
      start = end;
    };
  }
  readFragment = (blob, cb) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(blob);
    fileReader.onload = () => {
      const res = fileReader.result;
      cb(res)
    };
  }
  render() {
    const { hi, count } = this.props;
    return (
      <div>
        <Helmet>
          <title>首页</title>
        </Helmet>
        这是首页
        <Toy />
        <div>
          <input type="file" id="fileItem" onChange={this.handleSelectFile} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    hi: selectHi(state),
    count: selectCount(state),
  };
}
const mapActionsToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);
// const mapStateToProps = createStructuredSelector({
//   hi: selectHi(),
// })
export default connect(mapStateToProps, mapActionsToProps)(Home);
// export default Hi;