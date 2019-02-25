import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { AzureInstance, AzureLoginView } from 'react-native-azure-ad-2'

GoogleSignin.configure();

const CREDENTIAILS = {
  client_id: '63ccca70-8d9a-4845-95d2-a75b1ab52fa5',
  client_secret: 'hcooKMR5427^drdGRGG1{]]',
  scope: 'User.ReadBasic.All Mail.Read offline_access'
};

const Instance = new AzureInstance(CREDENTIAILS);

export default class App extends Component {

  azureInstance = new AzureInstance(CREDENTIAILS);
  _onLoginSuccess = this._onLoginSuccess.bind(this);

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

  _onLoginSuccess() {
    this.azureInstance.getUserInfo().then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
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
        <AzureLoginView
          azureInstance={this.azureInstance}
          loadingMessage="Requesting access token"
          onSuccess={this._onLoginSuccess}
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
