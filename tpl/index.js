import React from 'react';

import { View, Text } from 'react-native';

import RNPlus, { PView } from 'rnplus';

import { Page } from 'BizComponent';

import styles from './style';

export default class {{pageName}} extends PView {
  constructor(props) {
    super(props);
    this.state = {
      
    }; 
  }

  bindEvents = {
    actived() {

    },
    ready() {

    },
  };

  render() {
    return (
      <Page
        navTitle="{{pageName}}"
      >
        <View style={styles.container}>
          <Text>{{pageName}}</Text>
        </View>
      </Page>
    );
  }
}
