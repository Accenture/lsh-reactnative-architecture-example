import React from 'react';
import { Text } from 'react-native';
import Layout from 'Frontend/src/layout';

class Search extends React.Component {
  render() {
    return (
      <Layout
        headerText="Search"
        onPress={this.props.navigation.toggleDrawer}
        featureName="Search"
      >
        <Text>Search</Text>
      </Layout>
    );
  }
}
export default Search;
