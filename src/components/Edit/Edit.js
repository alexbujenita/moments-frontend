import React, { Component } from 'react';


class Edit extends Component {

  state = {
    photographer: {}
  }

  componentDidMount() {
    const { photographer } = this.props
    this.setState({
      photographer
    })
  }


  render() {
    return (
      <div className="edit-profile">
        <form>
          <p>This is just a test</p>
        </form>
      </div>
    )
  }
}

export default Edit;