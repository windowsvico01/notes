import React, { Component, createElement } from 'react';


export const withChildren = (WrappedComponent) => {
  class WrapperComponent extends Component { //eslint-disable-line 
  
    render() {
      const renderedElement = createElement(WrappedComponent, this.props);
      console.log(React.Children.toArray(this.props.children));
      return (
        <div>
          {this.props.children ? React.Children.toArray(this.props.children) : renderedElement}
        </div>
      );
    }
  }

  // WrapperComponent.propTypes = {
  //   children: React.PropTypes.node,
  // };

  return WrapperComponent;
};
