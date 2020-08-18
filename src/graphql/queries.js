/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIrpft = /* GraphQL */ `
  query GetIrpft($IRPFID: Int!) {
    getIRPFT(IRPFID: $IRPFID) {
      IRPFID
      userid
      month
      market
      monthProfit
      monthSale
      closedLoanProfit
      tributableProfit
      nonTributableProfit
      dayTradeProfit
    }
  }
`;
export const listIrpfTs = /* GraphQL */ `
  query ListIrpfTs {
    listIRPFTs {
      IRPFID
      userid
      month
      market
      monthProfit
      monthSale
      closedLoanProfit
      tributableProfit
      nonTributableProfit
      dayTradeProfit
    }
  }
`;
export const getAvgPriceT = /* GraphQL */ `
  query GetAvgPriceT($avgPriceID: Int!) {
    getAvgPriceT(avgPriceID: $avgPriceID) {
      avgPriceID
      userid
      market
      stockcode
      tradedate
      quantity
      price
      totalvalue
      daytrade
      avgprice
      profitloss
      quantitydaytrade
      profitlossdaytrade
      costvalue
      prevstock
      stock
    }
  }
`;
export const listAvgPriceTs = /* GraphQL */ `
  query ListAvgPriceTs {
    listAvgPriceTs {
      avgPriceID
      userid
      market
      stockcode
      tradedate
      quantity
      price
      totalvalue
      daytrade
      avgprice
      profitloss
      quantitydaytrade
      profitlossdaytrade
      costvalue
      prevstock
      stock
    }
  }
`;
export const getCosts = /* GraphQL */ `
  query GetCosts($costID: Int!) {
    getCosts(costID: $costID) {
      costID
      userid
      transactionid
      stockcode
      title
      description
      value
      costdate
      creationdate
      editeddate
    }
  }
`;
export const listCostss = /* GraphQL */ `
  query ListCostss {
    listCostss {
      costID
      userid
      transactionid
      stockcode
      title
      description
      value
      costdate
      creationdate
      editeddate
    }
  }
`;
export const getCurrentposition = /* GraphQL */ `
  query GetCurrentposition($currentpositionid: Int!) {
    getCurrentposition(currentpositionid: $currentpositionid) {
      currentpositionid
      userid
      brokername
      brokeraccount
      description
      type
      stockcode
      currentprice
      quantity
      quotefactor
      currentvalue
      creationtime
      editedtime
      rate
    }
  }
`;
export const listCurrentpositions = /* GraphQL */ `
  query ListCurrentpositions {
    listCurrentpositions {
      currentpositionid
      userid
      brokername
      brokeraccount
      description
      type
      stockcode
      currentprice
      quantity
      quotefactor
      currentvalue
      creationtime
      editedtime
      rate
    }
  }
`;
export const getPortfolioPerformanceT = /* GraphQL */ `
  query GetPortfolioPerformanceT($porfolioPerformanceID: Int!) {
    getPortfolioPerformanceT(porfolioPerformanceID: $porfolioPerformanceID) {
      porfolioPerformanceID
      date
      userid
      stockCode
      position
      purvalue
      closingPrice
      curValue
      prevPosition
      positionChange
      cashflow
      prevClosingPrice
      profitability
      result
    }
  }
`;
export const listPortfolioPerformanceTs = /* GraphQL */ `
  query ListPortfolioPerformanceTs {
    listPortfolioPerformanceTs {
      porfolioPerformanceID
      date
      userid
      stockCode
      position
      purvalue
      closingPrice
      curValue
      prevPosition
      positionChange
      cashflow
      prevClosingPrice
      profitability
      result
    }
  }
`;
export const getStockQuotes = /* GraphQL */ `
  query GetStockQuotes($stockquoteid: Int!) {
    getStockQuotes(stockquoteid: $stockquoteid) {
      stockquoteid
      date
      market
      stockcode
      stockname
      stocktype
      opening
      max
      min
      avg
      last
      bpurch
      bsale
      negotiations
      quantity
      volume
    }
  }
`;
export const listStockQuotess = /* GraphQL */ `
  query ListStockQuotess {
    listStockQuotess {
      stockquoteid
      date
      market
      stockcode
      stockname
      stocktype
      opening
      max
      min
      avg
      last
      bpurch
      bsale
      negotiations
      quantity
      volume
    }
  }
`;
export const getTransactionAutoupdateLog = /* GraphQL */ `
  query GetTransactionAutoupdateLog($trasactionAutoupdateLogID: Int!) {
    getTransactionAutoupdateLog(
      trasactionAutoupdateLogID: $trasactionAutoupdateLogID
    ) {
      trasactionAutoupdateLogID
      transactionid
      description
    }
  }
`;
export const listTransactionAutoupdateLogs = /* GraphQL */ `
  query ListTransactionAutoupdateLogs {
    listTransactionAutoupdateLogs {
      trasactionAutoupdateLogID
      transactionid
      description
    }
  }
`;
export const getTransactionUpdates = /* GraphQL */ `
  query GetTransactionUpdates($transactionupdateid: Int!) {
    getTransactionUpdates(transactionupdateid: $transactionupdateid) {
      transactionupdateid
      transactionid
      field
      oldvalue
      newvalue
      modifieddate
    }
  }
`;
export const listTransactionUpdatess = /* GraphQL */ `
  query ListTransactionUpdatess {
    listTransactionUpdatess {
      transactionupdateid
      transactionid
      field
      oldvalue
      newvalue
      modifieddate
    }
  }
`;
export const getTransactions = /* GraphQL */ `
  query GetTransactions($transactionid: Int!) {
    getTransactions(transactionid: $transactionid) {
      transactionid
      userid
      username
      brokername
      brokercode
      brokeraccount
      tradedate
      market
      stockcode
      description
      quantity
      price
      totalvalue
      reportdate
      creationtime
      editedtime
    }
  }
`;
export const listTransactionss = /* GraphQL */ `
  query ListTransactionss {
    listTransactionss {
      transactionid
      userid
      username
      brokername
      brokercode
      brokeraccount
      tradedate
      market
      stockcode
      description
      quantity
      price
      totalvalue
      reportdate
      creationtime
      editedtime
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($userid: Int!) {
    getUsers(userid: $userid) {
      userid
      cpf
      email
      password
      creationtime
      name
      lastcrawltime
    }
  }
`;
export const listUserss = /* GraphQL */ `
  query ListUserss {
    listUserss {
      userid
      cpf
      email
      password
      creationtime
      name
      lastcrawltime
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
