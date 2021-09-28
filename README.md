
# react-native-blur [![npm version](https://img.shields.io/npm/v/react-native-blur.svg)](https://www.npmjs.com/package/react-native-blur) [![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/shangwangzhang/react-native-blur/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/shangwangzhang/react-native-blur/test_coverage)


<img src="https://raw.githubusercontent.com/shangwangzhang/react-native-blur/master/giphy.gif" width="250">   <img src="https://raw.githubusercontent.com/shangwangzhang/react-native-blur/master/Untitled.jpg" width="250">  <img src="https://raw.githubusercontent.com/shangwangzhang/react-native-blur/master/Untitled2.jpg" width="250">


## Getting started

`$ npm install react-native-blur --save`

### Mostly automatic installation

`$ react-native link react-native-blur`

### Manual installation


#### iOS

1. `react-native link`
2. cd to ios folder and run `pod install`


#### Android

**Blur Only works on Android >= 17 !!! Brightness and should work everywhere though**

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.bluroverly.BlurOverlayPackage;` to the imports at the top of the file
  - Add `new BlurOverlayPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
      include ':react-native-blur'
      project(':react-native-blur').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-blur/android')

  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-blur')
  	```


## Usage
```javascript
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BlurOverlay,{closeOverlay,openOverlay} from 'react-native-blur';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
    }

    renderBlurChilds() {
        return (
          <View style={styles.image}>
              <Text style={styles.instructions2}>{instructions}</Text>

              <Text style={styles.instructions2}>{instructions}</Text>
          </View>
        );
    }

    render() {
        return (

            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        openOverlay();
                    }}
                    style={{width: '90%', height: 36, backgroundColor: "#03A9F4", borderRadius: 4, margin: 16}}/>

                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                

                <BlurOverlay
                    radius={14}
                    downsampling={2}
                    brightness={-200}
                    onPress={() => {
                        closeOverlay();
                    }}
                    customStyles={{alignItems: 'center', justifyContent: 'center'}}
                    blurStyle="dark"
                    children={this.renderBlurChilds()}
                />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    instructions2: {
        textAlign: 'center',
        color: 'white',
        marginBottom: 5,
    },
});

```
  
  
  
## Props
```
android only:
  radius : Int (Between  0 to 25*downsampling)
  downsampling : float (>= 1)
  brightness : float (Between -255 to 255 , 0 = nochange)
  
ios only : 
  blurStyle: string ("light" , "extraLight" , "dark")
	
both platforms :
  onPress : func
  customStyles: style	  
```
