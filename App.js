import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

GoogleSignin.configure();

export default class App extends Component {

  fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile'], function (result) {
      debugger;
      if (result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        console.log('Login was a success', result.grantedPermissions.toString());
      }
    }, function (error) {
      console.log('An error has ocurred: ' + error);
    })
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.setState({ userInfo });
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ backgroundColor: '#3b6bae', padding: 12, borderRadius: 15 }} onPress={() => this.fbAuth()}>
          <Text style={{ color: 'white' }}>Login wit facebook</Text>
        </TouchableOpacity>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
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
  }
});
