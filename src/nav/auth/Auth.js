import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'

import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import amplifyLogo from "../../../assets/images/amplify.png"

const { width } = Dimensions.get('window')

class Auth extends React.Component {
  state = {
    showSignUp: false,
    formType: 'showSignUp'
  }
  toggleAuthType = formType => {
    this.setState({ formType })
  }
  render() {
    const showSignUp = this.state.formType === 'showSignUp'
    const showSignIn = this.state.formType === 'showSignIn'
    const showForgotPassword = this.state.formType === 'showForgotPassword'
    return (
      <KeyboardAvoidingView
      style={styles.container}
        behavior={Platform.Os == "ios" ? "padding" : "height"}
      >
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={amplifyLogo}
          />
          <Text style={styles.title}>AWS Amplify</Text>
          <Text style={styles.subtitle}>React Native Auth Starter</Text>
          { showSignUp && (
            <SignUp 
              toggleAuthType={this.toggleAuthType}
              updateAuth={() => this.props.updateAuth('mainNav')}
            /> 
            ) }
          { showSignIn && (
            <SignIn
              toggleAuthType={this.toggleAuthType}
              updateAuth={() => this.props.updateAuth('mainNav')}
            />
          ) }
          { showForgotPassword && ( 
            <ForgotPassword 
              toggleAuthType={this.toggleAuthType} 
              updateAuth={() => this.props.updateAuth('mainNav')} 
            /> 
            ) }
          <View style={{ position: 'absolute', bottom: 40 }}>
            {
              showSignUp || showForgotPassword ? (
                <Text style={styles.bottomMessage}>Já possui conta? <Text
                style={styles.bottomMessageHighlight}
                onPress={() => this.toggleAuthType('showSignIn')}>&nbsp;&nbsp;Entrar</Text></Text>
              ) : (
                <Text style={styles.bottomMessage}>Ainda não de cadastrou?
                  <Text
                    onPress={() => this.toggleAuthType('showSignUp')}
                    style={styles.bottomMessageHighlight}>&nbsp;&nbsp;Cadastrar</Text>
                </Text>
              )
            }
          </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },  
  logo: {
    height: width / 4,
    width:  width / 2.5
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#e19f51'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'SourceSansPro-Regular',
  },
  bottomMessage: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10
  }
})

export default Auth