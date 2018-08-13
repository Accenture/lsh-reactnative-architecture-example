import React, { Component } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import Layout from 'Frontend/src/layout';
import Card from 'Frontend/src/components/Card';
import translate from 'Frontend/src/commons/Language';
import styles from './HomeScreen.style';

@inject('homeStore')
@observer
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    const { uri } = item;
    const { viewStyle, imageStyle } = styles;
    return (
      <View>
        <TouchableOpacity style={viewStyle}>
          <Image style={imageStyle} source={{ uri }} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    this.props.homeStore.getPhotos();
    const data = [
      { key: 'a' },
      { key: 'b' },
      { key: 'c' },
      { key: 'd' },
      { key: 'e' },
      { key: 'f' },
      { key: 'g' },
      { key: 'h' },
      { key: 'i' },
      { key: 'j' },
    ];
    return (
      <Layout
        headerText={translate('HOME_title')}
        onPress={this.props.navigation.toggleDrawer}
        featureName="Home"
      >
        <ScrollView>
          <Card>
            <FlatList
              contentContainerStyle={styles.listStyle}
              data={data}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </Card>
        </ScrollView>
      </Layout>
    );
  }
}
