import React, { Fragment, Component } from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'

import { Input, ActionButton } from '../../components'
import { Auth } from 'aws-amplify'
import { validate } from 'gerador-validador-cpf'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    cpf: '',
    cei_pwd: '',
    phone_number: '',
    authCode: '',
    stage: 0
  }
  onChangeText = (key, value) => {
      this.setState({ [key]: value })
      if(key.toString() === 'cei_pwd') this.setState({ ['password']: value })
  }
  signUp = async () => {
    const {
      username, password, cpf, cei_pwd
    } = this.state
    console.log(this.state)
    try {
      if(String(cpf.replace(/\.|-|\s/g, '')).length===11){
        if(validate(cpf)) {
          await Auth.signUp({ username, password, 'custom:cpf': cpf, 'custom:cei_pwd': cei_pwd})
          console.log('successful sign up..')
          this.setState({ stage: 1 })
        } else{
           console.log('CPF invalido') 
        }
      } else {
          console.log('Tamanho do CPF invalido')
      }
    } catch (err) {
      if(err.code == "UsernameExistsException") {
        try {
          await Auth.resendSignUp({ username })
          this.setState({ stage: 1 })
        }
        catch (err) {
          console.log('error resendingSignUp...', err)
        }
      } 
      else console.log('error signing up...', err)
    }
  }
  confirmSignUp = async () => {
    const { username, authCode, password } = this.state
    try {
      await Auth.confirmSignUp(username, authCode)
    } catch (err) {
      console.log('error signing up...', err)
    }
    try {
      await Auth.signIn(username, password)
      this.props.updateAuth('MainNav')
    }
    catch (err) {
      console.log('error signing in...', err)
    }
  }
  /*setUserAtributes = async () => {
    const { cpf, cei_pwd } = this.state
    try {
      let user = await Auth.currentAuthenticatedUser()
      if(String(cpf.replace(/\.|-|\s/g, '')).length===11){
        if(validate(cpf)) {
          await Auth.updateUserAttributes(user, {'custom:cpf': cpf, 'custom:cei_pwd': cei_pwd})
          this.props.updateAuth('MainNav')
        }
        else {
          console.log('CPF invalido') 
        }
      } 
      else {
          console.log('tamanho do CPF invalido')
      }
    } catch (err) {
      console.log('error updating atributes...', err)
    }
  }*/
  resendCode = async () => {
    const { username } = this.state
    try {
      await Auth.resendSignUp(username)
    } catch (err) {
      console.log('error resending the password')
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.stage === Number(0) && (
            <Fragment>
              <Input
                placeholder='Email'
                type='username'
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder='CPF'
                type='cpf'
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder='Senha no CEI'
                type='cei_pwd'
                onChangeText={this.onChangeText}
              />
              {/* 
              If you would like to enable phone number as an attribute, uncomment this field
              <Input
                placeholder='Phone Number'
                type='phone_number'
                onChangeText={this.onChangeText}
              /> */}
              <ActionButton
                title='Cadastrar'
                onPress={this.signUp}
              />
              <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={this.showForgotPassword}>
                  <Text style={styles.bottomMessageHighlight}>Obter senha do CEI</Text>
                </TouchableHighlight>
              </View>
            </Fragment>
          )
        }
        {
          this.state.stage === Number(1) && (
            <Fragment>
              <Input
                placeholder='Código de Confirmação'
                type='authCode'
                onChangeText={this.onChangeText}
              />
              <ActionButton
                title='Confirmar Cadastro'
                onPress={this.confirmSignUp}
              />
              <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={this.resendCode}>
                  <Text>Reenviar Código de Confirmação</Text>
                </TouchableHighlight>
              </View>
            </Fragment>
          )
        }        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  input: {
    backgroundColor: '#fcf3db',
    borderRadius: 30,
    height: 45,
    textAlign: 'center'
  },
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    fontFamily: 'SourceSansPro-SemiBold',
  }
})

export default SignIn