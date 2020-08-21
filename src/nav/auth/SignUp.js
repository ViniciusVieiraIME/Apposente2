import React, { Fragment, Component } from 'react'
import { View, StyleSheet, TouchableHighlight, Text, Linking } from 'react-native'

import { Input, ActionButton } from '../../components'
import { Auth } from 'aws-amplify'
import { validate } from 'gerador-validador-cpf'
import * as Animatable from 'react-native-animatable'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    cpf: '',
    cei_pwd: '',
    phone_number: '',
    authCode: '',
    stage: 0,
    is_valid_cpf: true,
    is_valid_email: true,
    is_valid_cei_pwd: true,
    non_existing_user: true,
    is_correct_code: true
  }
  onChangeText = (key, value) => {
      this.setState({ [key]: value })
      if(key.toString() === 'cei_pwd') this.setState({ ['password']: value })
  }
  handleValidCPF = (value) => {
    if( String(value).replace(/\.|-|\s/g, '').length !== 11 ){
      this.setState({ ['is_valid_cpf']: false})
    }
    else {
      if(!validate(value)){
        this.setState({ ['is_valid_cpf']: false}) 
      }
      else {
        this.setState({ ['is_valid_cpf']: true})
        this.state.text = String(value).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
        console.log(this.state.text)
      }
    }

  }
  handleValidEmail = (value) => {
    if(value.length<8){
      this.setState({ ['is_valid_email']: false})
    } else {
      this.setState({ ['is_valid_email']: true})
    }
  }
  handleValidCEI_pwd = (value) => {
    if(value.length < 6){
      this.setState({ ['is_valid_cei_pwd']: false})
    } else {
      this.setState({ ['is_valid_cei_pwd']: true}) 
    }
  handleValidCode = (value) => {
    if(value.length<6){
      this.setState({ ['is_correct_code']: false})
    } else {
      this.setState({ ['is_correct_code']: true}) 
    }
  }

  }
  showBrowser = () => {
    Linking.openURL('https://cei.b3.com.br')
  }
  signUp = async () => {
    const {
      username, password, cpf, cei_pwd, is_valid_cpf
    } = this.state
    try {
      if(cei_pwd.length>=6){
        if(username.length>=8){
          if(String(cpf).replace(/\.|-|\s/g, '').length===11){
            if(validate(cpf)) {
              await Auth.signUp({ username, password, 'custom:cpf': cpf, 'custom:cei_pwd': cei_pwd})
              console.log('successful sign up..')
              this.setState({ stage: 1 })
            } else{
               console.log('CPF inválido')
               this.setState({ is_valid_cpf: false})
            }
          } else {
              console.log('Tamanho do CPF inválido')
              this.setState({ is_valid_cpf: false})
          }
        } else {
          console.log('Tamanho do e-mail inválido')
          this.setState({ is_valid_email: false})
        }
      } else {
        console.log('Senha menor que 6 dígitos')
        this.setState({ is_valid_cei_pwd: false})
      }
    } catch (err) {
      if(err.code == "UsernameExistsException") {
        console.log('Usuário existente')
        this.setState({ non_existing_user: false})
      } else if(err.message === "Username should be an email."){
        console.log('Email em formato inválido')
        this.setState({ is_valid_email: false})
      } 
      else console.log('error signing up...', err)
    }
  }
  confirmSignUp = async () => {
    const { username, authCode, password } = this.state
    try {
      if (authCode.length == 6){
        await Auth.confirmSignUp(username, authCode)
        await Auth.signIn(username, password)
        this.props.updateAuth('MainNav')
      } else {
        console.log('Código incorreto')
        this.setState({ is_correct_code: false})
      }
    }
    catch (err) {
      console.log('error signing in...', err)
      this.setState({ is_correct_code: false})
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
                placeholder='CPF'
                type='cpf'
                onChangeText={this.onChangeText}
                onEndEditing={this.handleValidCPF}
              />
              { this.state.is_valid_cpf ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errMsg}>CPF inválido</Text>
                </Animatable.View>
              }
              <Input
                placeholder='e-mail'
                type='username'
                onChangeText={this.onChangeText}
                onEndEditing={this.handleValidEmail}
              />
              { this.state.is_valid_email ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errMsg}>e-mail inválido</Text>
                </Animatable.View>
              }
              { this.state.non_existing_user ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errMsg}>e-mail já cadastrado</Text>
                </Animatable.View>
              }
              <Input
                placeholder='Senha no CEI'
                type='cei_pwd'
                onChangeText={this.onChangeText}
                onEndEditing={this.handleValidCEI_pwd}
              />
              { this.state.is_valid_cei_pwd ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errMsg}>Senha inválida</Text>
                </Animatable.View>
              }
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
                <TouchableHighlight onPress={this.showBrowser}>
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
                onEndEditing={this.handleValidCode}
              />
              { this.state.is_correct_code ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errMsg}>Código incorreto</Text>
                </Animatable.View>
              }
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
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
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