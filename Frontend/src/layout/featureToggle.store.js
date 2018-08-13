// @flow

import { observable, action } from 'mobx';
import { features } from 'Frontend/src/commons/constants';

export default class FeatureToggleStore {
  @observable
  featureData = {};

  @action
  isFeatureEnabled(featureName: string) {
    this.featureData = features;
    return this.featureData[featureName];
  }
}
