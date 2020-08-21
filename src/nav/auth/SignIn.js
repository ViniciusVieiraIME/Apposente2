import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { Auth } from 'aws-amplify'
import * as Animatable from 'react-native-animatable'
import { Input, ActionButton } from '../../components'



class SignIn extends Component {
  state = {
    username: '',
    password: '',
    is_valid_email: true,
    is_valid_cei_pwd: true
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  handleValidEmail = (value) => {
    if(value.length<8){
      this.setState({ ['is_valid_email']: false})
    } else {
      this.setState({ ['is_valid_email']: true})
    }
  }
  handleValidpwd = (value) => {
    if(value.length < 6){
      this.setState({ ['is_valid_cei_pwd']: false})
    } else {
      this.setState({ ['is_valid_cei_pwd']: true}) 
    }
  }
  signIn = async () => {
    const { username, password } = this.state
    try {
      if(password.length>=6){
        if(username.length>=8){
          await Auth.signIn(username, password)
          console.log('successfully signed in')
          this.props.updateAuth('MainNav')
        } else{
          console.log('Tamanho do e-mail inválido')
          this.setState({ 'is_valid_email': false})
        }
      } else{
        console.log('Senha menor que 6 dígitos')
        this.setState({ 'is_valid_cei_pwd': false})
      }
    }
    catch (err) {
      if(err.code==='UserNotFoundException'){
        console.log('Usuário não encontrado')
        this.setState({ 'is_valid_email': false})
      } else {
        console.log('error signing in...', err)
        console.log('Usuário e/ou senha incorretos')
        this.setState({ 'is_valid_cei_pwd': false})
      }
    }
  }
  showForgotPassword = () => {
    this.props.toggleAuthType('showForgotPassword')
  }
  render() {
    return (
      <View>
        <Input
          onChangeText={this.onChangeText}
          onEndEditing={this.handleValidEmail}
          type='username'
          placeholder='Email'
        />
        { this.state.is_valid_email ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errMsg}>e-mail inválido</Text>
          </Animatable.View>
        }
        <Input
          onChangeText={this.onChangeText}
          onEndEditing={this.handleValidpwd}
          type='password'
          placeholder='Senha'
          secureTextEntry
        />
        { this.state.is_valid_cei_pwd ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errMsg}>Senha inválida</Text>
          </Animatable.View>
        }
        <ActionButton
          title='Entrar'
          onPress={this.signIn}
        />
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this.showForgotPassword}>
            <Text style={styles.bottomMessageHighlight}>Esqueci a senha</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  errMsg: {
    textAlign: 'center',
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold'
  }
})
  

export default SignIn