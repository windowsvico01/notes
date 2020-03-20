import React from 'react';

class Permission extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default Permission;