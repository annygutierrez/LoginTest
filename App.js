import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';

export default class App extends Component {

  fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile'], function(result) {
      debugger;
      if(result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        console.log('Login was a success', result.grantedPermissions.toString());
      }
    }, function(error) {
        console.log('An error has ocurred: ' + error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ backgroundColor: '#3b6bae', padding: 12, borderRadius: 15 }} onPress={() => this.fbAuth()}>
          <Text style={{ color: 'white' }}>Login wit facebook</Text>
        </TouchableOpacity>
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
  }
});
