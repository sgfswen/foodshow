import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';


const styles = StyleSheet.create({
  gallery: {
    padding: '100px',
  },
});

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    };
  }

  componentDidMount() {
    // TODO: API call here.

  }

  renderPhotos() {
    return this.state.photos.map(photo => (
      <img
        src={photo}
        alt="Hamburger from Unsplash"
        style={{ width: '50%' }}
      />
    ));
  }

  render() {
    return (
      <div className={css(styles.gallery)}>
        {this.renderPhotos()}
      </div>
    );
  }
}

Gallery.propTypes = {};

export default Gallery;
