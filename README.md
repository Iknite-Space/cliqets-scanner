# cliqets-scanner


## iOS Build

Some packages may be using some deprecated props so when running the app on ios, it crashes. 
A patch is to go to the file `node_modules/react-native/index.js` and comment out lines 443 to 450 of the `ViewPropTypes` method. 

Should look like this
```
get ViewPropTypes(): $FlowFixMe {
    // console.error(
    //   'ViewPropTypes will be removed from React Native, along with all ' +
    //     'other PropTypes. We recommend that you migrate away from PropTypes ' +
    //     'and switch to a type system like TypeScript. If you need to ' +
    //     'continue using ViewPropTypes, migrate to the ' +
    //     "'deprecated-react-native-prop-types' package.",
    // );
    return require('deprecated-react-native-prop-types').ViewPropTypes;
  },
```