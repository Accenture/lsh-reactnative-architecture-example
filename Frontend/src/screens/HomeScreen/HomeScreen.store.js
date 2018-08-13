// @flow

import { observable, action } from 'mobx';
import { CameraRoll } from 'react-native';

export default class HomeScreenStore {
  @observable
  photos = [];

  @observable
  cameraData = [];

  @action
  getPhotos() {
    return CameraRoll.getPhotos({
      first: 10,
      assetType: 'All',
    })
      .then(r => {
        const photosOut = r.edges.map(e => e.node.image);
        this.photos = photosOut;
      })
      .catch();
  }

  @action
  setPhotos(data: {}) {
    this.cameraData = data;
  }
}
