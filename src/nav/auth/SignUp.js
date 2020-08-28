import React, { Fragment, Component, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableHighlight, Text, Linking } from 'react-native'
import { Auth, API } from 'aws-amplify'
import { validate } from 'gerador-validador-cpf'
import * as Animatable from 'react-native-animatable'

import { Input, ActionButton } from '../../components'

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
    is_correct_code: true,
    is_loading_position: true,
    is_loading_transactions: true,
    res: []
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
        this.setState({ ['cpf']: String(value).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")})
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
  }
  handleValidCode = (value) => {
    if(value.length<6){
      this.setState({ ['is_correct_code']: false})
    } else {
      this.setState({ ['is_correct_code']: true}) 
    }
  }
  showBrowser = () => {
    Linking.openURL('https://cei.b3.com.br')
  }


  signUp = async () => {
    const {
      username, password, cpf, cei_pwd, is_valid_cpf, is_loading, res
    } = this.state
    const apipath = 'https://nv91wgawqd.execute-api.us-east-1.amazonaws.com/default/'
    
    try {
      if(cei_pwd.length>=6){
        if(username.length>=8){
          if(String(cpf).replace(/\.|-|\s/g, '').length===11){
            if(validate(cpf)) {
              await Auth.signUp({ username, password, 'custom:cpf': String(cpf).replace(/\.|-|\s/g, ''), 'custom:cei_pwd': cei_pwd})
              console.log('successful sign up..')
              fetch(apipath + 'CEI_CurrentPosition?userid=0&cpf=' + cpf + '&pwd=' + cei_pwd + '&email=' + username)
                  .then((response) => response.json())
                  .then ((responseJson) => this.setState({ ['res']: responseJson }))
                  .catch((error) => console.error(error))
                  .finally(() => this.setState({ ['is_loading_position']: false }))
              fetch(apipath + 'SLayer?userid=0&cpf=' + cpf + '&pwd=' + cei_pwd + '&email=' + username)
                  .then((response) => response.json())
                  .then ((responseJson) => this.setState({ ['res']: responseJson }))
                  .catch((error) => console.error(error))
                  .finally(() => this.setState({ ['is_loading_transactions']: false }))
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
    const { username, authCode, password, is_loading } = this.state
    try {
      if (authCode.length == 6){
        await Auth.confirmSignUp(username, authCode)
        await Auth.signIn(username, password)
        this.setState({ stage: 2 })
      } else {
        console.log('Código incorreto')
        this.setState({ is_correct_code: false})
      }
    }
    catch (err) {
      if(err.message === "User cannot be confirmed. Current status is CONFIRMED"){
        await Auth.signIn(username, password)
        this.props.updateAuth('MainNav')
      } else{
      console.log('error signing in...', err)
      this.setState({ is_correct_code: false})
      }
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
  getCurrentPosition = async () => {
    // consultar posição atual na carteira
  }

  getTransactions = async () =>{

  }

  comparePositionToTransactions = async () =>{

  }

  getPerformance = async () =>{

  }

  render() {
    return (
      <View style={styles.container}>
        { // Tela de Cadastro
          this.state.stage === Number(0) && (
            <Fragment>
              <Input
                placeholder='CPF'
                type='cpf'
                onChangeText={this.onChangeText}
                onEndEditing={this.handleValidCPF}
                value={this.state.cpf}
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
        { // Tela de confirmação de e-mail
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
        { // Tela de espera para carga de carteira
          this.state.stage === Number(2) && (
            <Fragment>
              <Text>Aguarde enquanto terminamos de carregar sua carteira do CEI.</Text>
              <Text></Text>
              <Text>Assim que terminarmos verificaremos juntos se está correta e faremos o mesmo para suas transações.</Text>
              <Text></Text>
              <Text>Fique tranquilo que isso apenas será necessário no primeiro acesso, uma vez configurado terá acesso a todas as informações automaticamente</Text>
              {!this.state.is_loading_position && this.setState({ stage: 3 })}   
            </Fragment>
          )
        }
        { // Tela de confirmação de carteira
          this.state.stage === Number(3) && (
            <Fragment>
              <Text>Verifique se a carteira que carregamos do CEI está correta.</Text>
              <Text></Text>
              <Text>Note que o CEI não disponibiliza sua posição em derivativos e termo, caso tenha opções, subscrições ou termos em carteira precisará inserir manualmente.</Text>
              <Text>-----Exibir carteira carregada com a quantidade agrupada por ativo e corretora </Text>
              <TouchableHighlight onPress={this.setState({ stage: 4 })}>
                  <Text>Editar carteira</Text>
              </TouchableHighlight>
               <ActionButton
                title='Carteira Correta'
                onPress={this.setState({ stage: 5 })}
              />
            </Fragment>
          )
        }
        { // Tela de edição de carteira
          this.state.stage === Number(4) && (
            <Fragment>
              <ActionButton
                title='Edição concluída'
                onPress={this.setState({ stage: 4 })}
              />
            </Fragment>
          )
        }
        { // Tela de espera para validação de transações
          this.state.stage === Number(5) && (
            <Fragment>
              <Text>Agora falta apenas checarmos suas transações e estaremos prontos.</Text>
              <Text>A carga terminará em instantes.</Text>
              {!this.state.is_loading_position && this.setState({ stage: 6 })}  
            </Fragment>
          )
        }
        { // Tela de confirmação de transações
          this.state.stage === Number(6) && (
            <Fragment>
              <Text>Comparando a carteira que confirmou com as transações que carregamos percebemos as diferenças abaixo.</Text>
              <Text>Para o cálculo de impostos correto basta inserir os preços médios de cada ação exibida abaixo e sua rentabilidade será exibida apenas a partir de 18 meses atrás.</Text>
              <Text>----- Exibir transações divergentes -------</Text>
              <Text>Se sua intenção é monitorar sua rentabilidade de forma mais detalhada precisaremos que insira cada transação anterior a 18 meses de forma manual. Pode fazer isso diretamente no aplicativo</Text>
              <Text>As transações que conseguimos carregar do CEI são:</Text>
              <Text>----- Exibir todas as transações agrupadas por data, ativo e corretora -------</Text>
              <TouchableHighlight onPress={this.setState({ stage: 7 })}>
                  <Text>Editar transações</Text>
              </TouchableHighlight>
              <ActionButton
                title='Transações Corretas'
                onPress={this.setState({ stage: 8 })}
              />
            </Fragment>
          )
        }
        { // Tela de edição de carteira
          this.state.stage === Number(7) && (
            <Fragment>
              <ActionButton
                title='Edição concluída'
                onPress={this.setState({ stage: 6 })}
              />
            </Fragment>
          )
        }
        { // Tela final de confirmação de carteira
          this.state.stage === Number(8) && (
            <Fragment>
              <Text>Pronto! Sua carteira com preços médios e rentabilidade atual está abaixo</Text>
              <Text>----- Exibir todos os ativos da carteira com (quantidade ou valor total?), preço médio, cotação atual e rentabilidade(cotação atual/preço médio) -------</Text>
              <TouchableHighlight onPress={this.setState({ stage: 7 })}>
                  <Text>Editar transações</Text>
              </TouchableHighlight>
              <ActionButton
                title='Tudo Certo!'
                onPress={this.props.updateAuth('MainNav')}
              />
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