import React, { Fragment, Component, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableHighlight, Text, Linking, FlatList } from 'react-native'
import { Auth } from 'aws-amplify'
import { validate } from 'gerador-validador-cpf'
import * as Animatable from 'react-native-animatable'

import { Col, Row, Grid } from "react-native-easy-grid";

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
    res: [],
    curPos: [],
    curPosID: '',
    brokerName: '',
    stockCode: '',
    qty: '',
    data: '',
    avgPrice: '',
    posToTrans: [],
    transactions: [],
    performance: []
  }
  apipath = 'https://nv91wgawqd.execute-api.us-east-1.amazonaws.com/default/'


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
    if(value.length<5){
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
    
    try {
      if(cei_pwd.length>=6){
        if(username.length>=8){
          if(String(cpf).replace(/\.|-|\s/g, '').length===11){
            if(validate(cpf)) {
              await Auth.signUp({ username, password, 'custom:cpf': String(cpf).replace(/\.|-|\s/g, ''), 'custom:cei_pwd': cei_pwd})
              console.log('successful sign up..')
              fetch(this.apipath + 'CEI_CurrentPosition?userid=0&cpf=' + cpf + '&pwd=' + cei_pwd + '&email=' + username)
                  .then((response) => response.json())
                  .then ((responseJson) => this.setState({ ['res']: responseJson }))
                  .catch((error) => console.error(error))
                  .finally(() => this.setState({ ['is_loading_position']: false }))
              fetch(this.apipath + 'SLayer?userid=0&cpf=' + cpf + '&pwd=' + cei_pwd + '&email=' + username)
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

  getCurrentPosition = async (userid) =>{
    const response = await fetch(this.apipath + 'getAPI?method=CurrentPosition&userid=' + userid);
    const json = await response.json();
    console.log(json);
    this.setState({ ['curPos']: json })
  }

  setCurrentPosition = async (userid, curPosID, brokerName, stockCode, qty) =>{
    const response = await fetch(this.apipath + 'getAPI?method=setCurrentPosition&userid=' + userid + '&curPosID=' + curPosID + '&brokerName=' + brokerName + '&stockCode=' + stockCode + '&qty=' + qty);
    const json = await response.json();
    console.log(json);
    this.setState({ ['curPos']: json })
  }

  comparePositionToTransactions = async () =>{
    try {
      const response = await fetch(this.apipath + 'CEI_getAPI?method=PositionToTransactions&userid=' + userid)
      const json = await response.json();
      console.log(json);
      this.setState({ posToTrans: json })
    }
    catch (err) {
      console.log('error signing in...', err)
    }
  }

  getTransactions = async () =>{
    try {
      this.setState({ res: await fetch(this.apipath + 'CEI_getAPI?method=Transactions&userid=' + userid)})
      const response = await fetch(this.apipath + 'CEI_getAPI?method=Transactions&userid=' + userid)
      const json = await response.json();
      console.log(json);
      this.setState({ transactions: json })
    }
    catch (err) {
      console.log('error signing in...', err)
    }
  }

  setTransaction = async (userid, brokerName, stockCode, qty, price) =>{
    const response = await fetch(this.apipath + 'getAPI?method=setTransaction&userid=' + userid + '&brokerName=' + brokerName + '&stockCode=' + stockCode + '&qty=' + qty + '&price=' + price );
    const json = await response.json();
    console.log(json);
    this.setState({ ['curPos']: json })
  }

  getPerformance = async () =>{
    try {
      const response = await fetch(this.apipath + 'CEI_getAPI?method=Performance&userid=' + userid);
      const json = await response.json();
      console.log(json);
      this.setState({ ['performance']: json })
    }
    catch (err) {
      console.log('error signing in...', err)
    }
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
              <Text>Esse processo levará alguns minutos, uma vez configurado a atualização é automática.</Text>
              {!this.state.is_loading_position && this.getCurrentPosition() && this.setState({ stage: 3 })}   
            </Fragment>
          )
        }
        { // Tela de confirmação de carteira
          this.state.stage === Number(3) && (
            <Fragment>
              <Text>Verifique se a carteira que carregamos do CEI está correta.</Text>
              <Text></Text>
              <Text>Note que o CEI não disponibiliza sua posição em derivativos e termo, caso tenha opções, subscrições ou termos em carteira precisará inserir manualmente.</Text>
              <Row size={2}>
                <Col size={2} style={{alignItems: 'center'}}>
                  <Text>Corretora</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Ativo</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Posição</Text>
                </Col>
              </Row> 
              <FlatList
                data={this.state.curPos}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) => 
                  <Row>
                    <Col size={2} style={{alignItems: 'center'}}>
                      <Text>{item.brokername}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.stockcode}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      {
                        (item.edited?(
                        <TouchableHighlight onPress={
                          this.setState({ curPosID: item.currentpositionid }),
                          this.setState({ brokerName: item.brokername }),
                          this.setState({ stockCode: item.stockcode }),
                          this.setState({ qty: item.qty }),
                          this.setState({ stage: 4 })
                        }>
                          <Text style={{fontWeight: 'bold'}}>{item.qtd}</Text>
                        </TouchableHighlight>)
                        :<Text>{item.qtd}</Text>)
                    }
                    </Col>
                  </Row>}
              />
              <TouchableHighlight onPress={
                  this.setState({ curPosID: '' }),
                  this.setState({ stockCode: '' }),
                  this.setState({ qty: '' }),
                  this.setState({ stage: 4 })}>
                <Text>Adicionar Posição na Carteira</Text>
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
              <Input
                placeholder='Corretora'
                type='broker'
                //onEndEditing={this.handleValidBroker}
                value={this.state.brokerName}
              />
              <Input
                placeholder='Código do Ativo'
                type='stockcode'
                //onEndEditing={this.handleValidStockCode}
                value={this.state.stockCode}
              />
              <Input
                placeholder='Quantidade'
                type='qty'
                //onEndEditing={this.handleValidQty}
                value={this.state.qty}
              />
              <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={this.setState({ stage: 4 })}>
                  <Text>Voltar</Text>
                </TouchableHighlight>
              </View>
              <ActionButton
                title='Salvar'
                onPress={this.setCurrentPosition(this.state.userid, this.state.curPosID, this.state.brokerName, this.state.stockCode, this.state.qty) && this.setState({ stage: 4 })}
              />
            </Fragment>
          )
        }
        { // Tela de espera para validação de transações
          this.state.stage === Number(5) && (
            <Fragment>
              <Text>Agora falta apenas checarmos suas transações e estaremos prontos.</Text>
              <Text>A carga terminará em instantes.</Text>
              <TouchableHighlight onPress={this.setState({ stage: 3 })}>
                  <Text>Voltar para edição da carteira</Text>
              </TouchableHighlight>
              {!this.state.is_loading_position && this.setState({ stage: 6 })}  
            </Fragment>
          )
        }
        { // Tela de confirmação de transações
          this.state.stage === Number(6) && (
            <Fragment>
              <Text>A carga de transações do CEI possui algumas limitações, para o cálculo de seu preço médio verifique os casos abaixo.</Text>
              <Row size={2}>
                <Col size={2} style={{alignItems: 'center'}}>
                  <Text>Corretora</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Ativo</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Posição</Text>
                </Col>
              </Row>              
              <FlatList
                data={this.state.posToTrans}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) => 
                  <Row size={1}>
                    <Col size={2} style={{alignItems: 'center'}}>
                      <Text>{item.brokername}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.stockcode}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <TouchableHighlight onPress={
                        this.setState({ brokerName: item.brokername }),
                        this.setState({ stockCode: item.stockcode }),
                        this.setState({ qty: item.qty }),
                        this.setState({ avgPrice: item.avgprice}),
                        this.setState({ stage: 7 })}>
                        <Text style={{fontWeight: 'bold'}}>{item.qtd}</Text>
                      </TouchableHighlight>
                    </Col>
                  </Row>}
              />
              <Text>Conseguimos carregar essas transações:</Text>
              <Row size={2}>
                <Col size={2} style={{alignItems: 'center'}}>
                  <Text>Corretora</Text>
                </Col>
                <Col size={2} style={{alignItems: 'center'}}>
                  <Text>Data</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Ativo</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Posição</Text>
                </Col>
              </Row>              
              <FlatList
                data={this.state.posToTrans}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) => 
                  <Row size={1}>
                    <Col size={2} style={{alignItems: 'center'}}>
                      <Text>{item.brokername}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.data}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.stockcode}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.qtd}</Text>
                    </Col>
                  </Row>}/>
              <TouchableHighlight onPress={this.setState({ stage: 3 })}>
                  <Text>Voltar para sua carteira</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={
                        this.setState({ stockCode: '' }),
                        this.setState({ qty: '' }),
                        this.setState({ avgPrice: ''}),
                        this.setState({ stage: 7 })}>
                  <Text>Nova transação</Text>
              </TouchableHighlight>
              <ActionButton
                title='Transações Corretas'
                onPress={this.setState({ stage: 8 })}
              />
            </Fragment>
          )
        }
        { // Tela de edição de transações
          this.state.stage === Number(7) && (
            <Fragment>
              <Input
                placeholder='Corretora'
                type='broker'
                //onEndEditing={this.handleValidBroker}
                value={this.state.brokerName}
              />
              <Input
                placeholder='Código do Ativo'
                type='stockcode'
                //onEndEditing={this.handleValidStockCode}
                value={this.state.stockCode}
              />
              <Input
                placeholder='Quantidade'
                type='qty'
                //onEndEditing={this.handleValidQty}
                value={this.state.qty}
              />
              <Input
                placeholder='Preço'
                type='price'
                //onEndEditing={this.handleValidQty}
                value={this.state.avgPrice}
              />
              <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={this.setState({ stage: 6 })}>
                  <Text>Voltar</Text>
                </TouchableHighlight>
              </View>
              <ActionButton
                title='Salvar'
                onPress={this.setTransaction(this.state.userid, this.state.brokerName, this.state.stockCode, this.state.qty, this.state.price) && this.setState({ stage: 8 })}
              />
            </Fragment>
          )
        }
        { // Tela final de confirmação de carteira
          this.state.stage === Number(8) && (
            <Fragment>
              <Text>Pronto! Se estiver tudo certo seja bem vindo.</Text>
              <Row size={2}>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Ativo</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Posição</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Pç. Médio</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Pç. Mercado</Text>
                </Col>
                <Col size={1} style={{alignItems: 'center'}}>
                  <Text>Rent.</Text>
                </Col>
              </Row>
              <FlatList
                data={this.state.performance}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) => 
                  <Row size={1}>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.stockcode}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.position}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.avgPrice}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.closingPrice}</Text>
                    </Col>
                    <Col size={1} style={{alignItems: 'center'}}>
                      <Text>{item.profitabily}</Text>
                    </Col>
                  </Row>}
              />
              <TouchableHighlight onPress={this.setState({ stage: 6 })}>
                  <Text>Voltar para transações</Text>
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