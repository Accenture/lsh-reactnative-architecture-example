import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Icon } from 'react-native-elements';
import styles from './CameraScreen.style';

@inject('homeStore')
@observer
export default class App extends Component {
  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.props.homeStore.setPhotos(data);
    }
  }

  render() {
    return (
      <View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={this.takePicture}
            style={styles.capture}
          >
            <Icon name="camera" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
