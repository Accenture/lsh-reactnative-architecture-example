# mobile-arch-ref-app
Liquid Studio Helsinki Mobile Architecture reference application

[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status: ](https://build.appcenter.ms/v0.1/apps/899121a4-f405-4734-9e1f-ddc8a6e158f5/branches/master/badge
)]


### Salient Features

* React native navigation (v2) - bottom tab, stack and side menu (drawer) navigation included
* Continuous Integration with App Center (Build, Deploy)
* CodePush integration
* Unit test cases with Enzyme and Jest
* Unit test code coverage
* Eslint and prettier
* State and JWT token management with Mobx
* Pre commit hooks (prettier + eslint, unit test + flow) using husky
* Static type checking using Flow
* Customized flexible components
* Localization with I18n (default locale set to 'fi')
* CocoaPods for ios
* AppCenter crashlytics and error reporting
* Feature Toggling

### Project Structure

The source folder is divided into three folders - commons, components and screens (self explanatory names), and the main App.js and Navigation router.

* `commons`folder includes utils and files common to the project
* `components`folder has the smaller components that make up a mobile screen
* `screens` folder contains all the screens visible on the mobile/simulator.

Each subfolder in the `components` and `screens` includes the styles and unit test cases corresponding to that specific component/screen.

### Getting Started

```
git clone <project>
cd mobile-arch-ref-app/Frontend
yarn
yarn start-ios
OR
yarn start-android
```

P.S. Eslint on `package.json` has an older version because airbnb-eslint config isn't up to date yet.

#### Running iOS version in XCode

If you just open xcodeproj file in XCode the compile will fail because of missing libraries. To get project running open xcworkspace file in XCode instead of xcodeproj.

#### Code push (Continuous Integration)

"Code push helps get product improvements in front of your end users instantly, by keeping your JavaScript and images synchronized with updates you release to the CodePush server. This way, your app gets the benefits of an offline mobile experience, as well as the "web-like" agility of side-loading updates as soon as they are available. It's a win-win!"
[Microsoft code push](https://github.com/Microsoft/react-native-code-push)

##### IOS - App: 

```
code-push release-react mobile-ref-app-ios ios
code-push release-react mobile-ref-app-android android
```

| Name        | Deployment Key             |
| ------------- |:-------------:|
| Production     | ryWBh0dshw53yGwZXBm3V4bpubMk1e9448ef-1e20-4d38-ac97-32777d12a606 |
| Staging     | mb6Wi2MjL6ZSdTFVJuYmaYoWfJfb1e9448ef-1e20-4d38-ac97-32777d12a606      |

##### Android-App:

| Name        | Deployment Key             |
| ------------- |:-------------:|
| Production     | xYxnZLMILwX1x2AoeAyA0sGJBthe1e9448ef-1e20-4d38-ac97-32777d12a606 |
| Staging     | T-_OH8yyGDFY-eLW63pCmmFMDrUZ1e9448ef-1e20-4d38-ac97-32777d12a606     |

### Troubleshooting

* ``` The target 'Frontend-tvOSTests' is declared twice. ```

Check ios folder `Podfile`and remove the duplicates

* ``` Print: Entry, ':CFBundleIdentifier', Does Not Exist ```

Check for

````
<key>CFBundleIdentifier</key>
<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
````

OR

````
rm -rf node_modules yarn.lock package-lock.json
rm -rf ios/build/
rm -rf ~/.rncache
yarn && yarn start-ios
````
OR

````
Run yarn react-native upgrade and answer the questions as Y
````

* Bundling failing at decorators:
Run yarn add  babel-plugin-transform-decorators-legacy babel-plugin-transform-class-properties
and update .babelrc as plugins
`````
"plugins": [
    "transform-decorators-legacy"
  ],
`````

* undefined is not an object (evaluating 'CameraManager.Aspect')
Run yarn add react-native-camera && yarn react-native link react-native-camera
and follow the steps as provided in https://github.com/react-native-community/react-native-camera#ios

* Build Failed on Appcenter

Check unit tests with `yarn test-unit` and update snapshots if needed with

`yarn test-unit -- -u`

* Build Failed on android emulator

Make sure the Android emulator is running.

* Android: 'Cannot add a child that doesn't have a YogaNode to a parent without a measure function!'

This is a very common error and occurs due to malformatted JSX, or missing <Text> tag for example inside a <Button> tag.
For more information: [[Facebook issues](https://github.com/facebook/react-native/issues/13243)]
