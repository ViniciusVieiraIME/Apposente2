import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { LineChart } from "react-native-chart-kit"
import { Col, Row, Grid } from "react-native-easy-grid"

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }

  state = {
    username: '',
    monthly_profitability_chart: [],
    transactions: [],
    taxes: [],
    daily_profitability_chart: [],
    current_portfolio: [],
    detailed_profitability_chart: [],
    cashflow_chart: [],
    transactions_chart: [],
    detailed_taxes: [],
    loading: true
  }

  dt = {labels: ['teste', 'teste2', 'teste3'],
        datasets : [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ],
            color: (opacity = 1) => 'rgba(57, 106, 177, 1)'
          },
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ],
            color: (opacity = 1) => 'rgba(218, 124, 48, 1)'
          }
        ] }

  apipath = 'https://nv91wgawqd.execute-api.us-east-1.amazonaws.com/default/'

  getProfitabilityChart = async (userid) =>{
    const response = await fetch(this.apipath + 'getAPI?method=UserInfo&userid=' + userid);
    const json = await response.json();
    console.log(json);
    this.setState({ ['monthly_profitability_chart']: json })
    this.setState({ ['loading']: false })
  }

  //trabalhar o dado para obter apenas a rentabilidade dos 12 últimos meses
  //month vira label

  render() {
    console.log('props: ', this.props)
    console.log('loading: ', this.state.loading)
    this.state.loading ? this.getProfitabilityChart(1) : null
    console.log('monthly_profitability_chart: ', this.state.monthly_profitability_chart)
    return (
       <View style={styles.container}>
            <LineChart
              data={this.dt}
              width={Dimensions.get("window").width} // from react-native
              height={250}
              yAxisSuffix="%"
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(000, 000, 000, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "1",
                  strokeWidth: "1"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 20
              }}
            />
            <Text onPress={() => this.props.navigation.navigate('Carteira')} style={styles.link}>Carteira</Text>
            <Text onPress={() => this.setState({ ['loading']: true })} style={styles.link}>Atualizar</Text>
          </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  link: {
    color: 'blue',
    marginVertical: 5
  }
})

export default Home
