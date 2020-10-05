import React from 'react'
import {
  View, Text, StyleSheet, Image, Dimensions, TouchableHighlight
} from 'react-native'
import { Input, ActionButton } from '../../components'
import * as Animatable from 'react-native-animatable'
import { Auth } from 'aws-amplify'

class ForgotPassword extends React.Component {
  state = {
    stage: 0,
    username: '',
    email: '',
    password: '',
    authCode: '',
    is_valid_email: true,
    is_valid_cei_pwd: true,
    non_existing_user: true,
    is_correct_code: true,
    could_resend_code: true,
    limit_exceeded_exception: false
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
  handleValidCode = (value) => {
    if(value.length<6){
      this.setState({ ['is_correct_code']: false})
    } else {
      this.setState({ ['is_correct_code']: true}) 
    }
  }
  handleValidCEI_pwd = (value) => {
    if(value.length < 6){
      this.setState({ ['is_valid_cei_pwd']: false})
    } else {
      this.setState({ ['is_valid_cei_pwd']: true}) 
    }
  }
  resetPassword = async () => {
    const { username } = this.state
    try {
      if( username.length >=8){
        await Auth.forgotPassword(this.state.username)
        this.setState({ 'is_valid_email': true})
        this.setState({ 'limit_exceeded_exception': false})
        this.setState({ stage: 1 })
      } else {
        console.log('Tamanho do e-mail inválido')
        this.setState({ 'is_valid_email': false})
      }
    } 
    catch(err){
      console.log('error: ', err)
      err.code == "LimitExceededException" ? this.setState({ 'limit_exceeded_exception': true }) : this.setState({ 'is_valid_email': false})
      console.log('E-mail incorreto')
    }
  }
  confirmResetPassword = async () => {
    const { username, password, authCode } = this.state
    try{
      if(authCode.length==6){
        if(password.length>=6){
          await Auth.forgotPasswordSubmit(username, authCode, password)
          console.log('successfully changed password!')
          await Auth.signIn(username, password)
          this.props.updateAuth('MainNav')
        } else {
          console.log('Tamanho do e-mail inválido')
          this.setState({ is_valid_cei_pwd: false})
        }
      } else {
        console.log('Código incorreto')
        console.log(authCode)
        this.setState({ is_correct_code: false})
      }
    }
    catch(err) {
      console.log('error: ', err)
      console.log('error resetting password:', err)
      this.setState({ is_valid_cei_pwd: false})
      this.setState({ is_correct_code: false})
    }
  }
  resendCode = async () => {
    const { username } = this.state
    try {
      await Auth.resendSignUp(username)
    } catch (err) {
      console.log('error: ', err)
      console.log('error resending the password')
      console.log(err)
      this.setState({ could_resend_code: false})
    }
  }
  render() {
    const { stage } = this.state
    return (
      <View>
        { stage === Number(0) && (
          <View>
            <Input
              onChangeText={this.onChangeText}
              onEndEditing={this.handleValidEmail}
              type='username'
              placeholder='e-mail'
            />
            { this.state.limit_exceeded_exception ?
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errMsg}>e-mail inválido</Text>
              </Animatable.View> : null 
            }
            { this.state.is_valid_email ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errMsg}>e-mail inválido</Text>
              </Animatable.View>
            }
            <ActionButton
              title='Obter nova senha'
              onPress={this.resetPassword}
            />
          </View>
        )}
        { stage === Number(1) && (
          <View>
            <Input
              onChangeText={this.onChangeText}
              onEndEditing={this.handleValidCode}
              type='authCode'
              placeholder='Código de Confirmação'
            />
            { this.state.is_correct_code ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errMsg}>Código incorreto</Text>
              </Animatable.View>
            }
            <Input
              onChangeText={this.onChangeText}
              onEndEditing={this.handleValidCEI_pwd}
              type='password'
              placeholder='Nova Senha'
              secureTextEntry
            />
            { this.state.is_valid_cei_pwd ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errMsg}>Senha inválida</Text>
              </Animatable.View>
            }
            <ActionButton
              title='Atualizar Senha'
              onPress={this.confirmResetPassword}
            />
            <View style={styles.buttonContainer}>
              <TouchableHighlight onPress={this.resendCode}>
                <Text>Reenviar Código de Confirmação</Text>
              </TouchableHighlight>
            </View>
            { this.state.could_resend_code ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errMsg}>Limite de reenvios atingido, tente novamente mais tarde.</Text>
              </Animatable.View>
            }
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  errMsg: {
    textAlign: 'center',
    fontSize: 10,
    color: 'red',
    fontWeight: 'bold'
  }
})

export default ForgotPassword