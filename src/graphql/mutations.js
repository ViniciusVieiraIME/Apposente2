/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteIrpft = /* GraphQL */ `
  mutation DeleteIrpft($IRPFID: Int!) {
    deleteIRPFT(IRPFID: $IRPFID) {
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
export const createIrpft = /* GraphQL */ `
  mutation CreateIrpft($createIRPFTInput: CreateIRPFTInput!) {
    createIRPFT(createIRPFTInput: $createIRPFTInput) {
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
export const updateIrpft = /* GraphQL */ `
  mutation UpdateIrpft($updateIRPFTInput: UpdateIRPFTInput!) {
    updateIRPFT(updateIRPFTInput: $updateIRPFTInput) {
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
export const deleteAvgPriceT = /* GraphQL */ `
  mutation DeleteAvgPriceT($avgPriceID: Int!) {
    deleteAvgPriceT(avgPriceID: $avgPriceID) {
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
export const createAvgPriceT = /* GraphQL */ `
  mutation CreateAvgPriceT($createAvgPriceTInput: CreateAvgPriceTInput!) {
    createAvgPriceT(createAvgPriceTInput: $createAvgPriceTInput) {
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
export const updateAvgPriceT = /* GraphQL */ `
  mutation UpdateAvgPriceT($updateAvgPriceTInput: UpdateAvgPriceTInput!) {
    updateAvgPriceT(updateAvgPriceTInput: $updateAvgPriceTInput) {
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
export const deleteCosts = /* GraphQL */ `
  mutation DeleteCosts($costID: Int!) {
    deleteCosts(costID: $costID) {
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
export const createCosts = /* GraphQL */ `
  mutation CreateCosts($createCostsInput: CreateCostsInput!) {
    createCosts(createCostsInput: $createCostsInput) {
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
export const updateCosts = /* GraphQL */ `
  mutation UpdateCosts($updateCostsInput: UpdateCostsInput!) {
    updateCosts(updateCostsInput: $updateCostsInput) {
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
export const deleteCurrentposition = /* GraphQL */ `
  mutation DeleteCurrentposition($currentpositionid: Int!) {
    deleteCurrentposition(currentpositionid: $currentpositionid) {
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
export const createCurrentposition = /* GraphQL */ `
  mutation CreateCurrentposition(
    $createCurrentpositionInput: CreateCurrentpositionInput!
  ) {
    createCurrentposition(
      createCurrentpositionInput: $createCurrentpositionInput
    ) {
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
export const updateCurrentposition = /* GraphQL */ `
  mutation UpdateCurrentposition(
    $updateCurrentpositionInput: UpdateCurrentpositionInput!
  ) {
    updateCurrentposition(
      updateCurrentpositionInput: $updateCurrentpositionInput
    ) {
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
export const deletePortfolioPerformanceT = /* GraphQL */ `
  mutation DeletePortfolioPerformanceT($porfolioPerformanceID: Int!) {
    deletePortfolioPerformanceT(porfolioPerformanceID: $porfolioPerformanceID) {
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
export const createPortfolioPerformanceT = /* GraphQL */ `
  mutation CreatePortfolioPerformanceT(
    $createPortfolioPerformanceTInput: CreatePortfolioPerformanceTInput!
  ) {
    createPortfolioPerformanceT(
      createPortfolioPerformanceTInput: $createPortfolioPerformanceTInput
    ) {
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
export const updatePortfolioPerformanceT = /* GraphQL */ `
  mutation UpdatePortfolioPerformanceT(
    $updatePortfolioPerformanceTInput: UpdatePortfolioPerformanceTInput!
  ) {
    updatePortfolioPerformanceT(
      updatePortfolioPerformanceTInput: $updatePortfolioPerformanceTInput
    ) {
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
export const deleteStockQuotes = /* GraphQL */ `
  mutation DeleteStockQuotes($stockquoteid: Int!) {
    deleteStockQuotes(stockquoteid: $stockquoteid) {
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
export const createStockQuotes = /* GraphQL */ `
  mutation CreateStockQuotes($createStockQuotesInput: CreateStockQuotesInput!) {
    createStockQuotes(createStockQuotesInput: $createStockQuotesInput) {
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
export const updateStockQuotes = /* GraphQL */ `
  mutation UpdateStockQuotes($updateStockQuotesInput: UpdateStockQuotesInput!) {
    updateStockQuotes(updateStockQuotesInput: $updateStockQuotesInput) {
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
export const deleteTransactionAutoupdateLog = /* GraphQL */ `
  mutation DeleteTransactionAutoupdateLog($trasactionAutoupdateLogID: Int!) {
    deleteTransactionAutoupdateLog(
      trasactionAutoupdateLogID: $trasactionAutoupdateLogID
    ) {
      trasactionAutoupdateLogID
      transactionid
      description
    }
  }
`;
export const createTransactionAutoupdateLog = /* GraphQL */ `
  mutation CreateTransactionAutoupdateLog(
    $createTransactionAutoupdateLogInput: CreateTransactionAutoupdateLogInput!
  ) {
    createTransactionAutoupdateLog(
      createTransactionAutoupdateLogInput: $createTransactionAutoupdateLogInput
    ) {
      trasactionAutoupdateLogID
      transactionid
      description
    }
  }
`;
export const updateTransactionAutoupdateLog = /* GraphQL */ `
  mutation UpdateTransactionAutoupdateLog(
    $updateTransactionAutoupdateLogInput: UpdateTransactionAutoupdateLogInput!
  ) {
    updateTransactionAutoupdateLog(
      updateTransactionAutoupdateLogInput: $updateTransactionAutoupdateLogInput
    ) {
      trasactionAutoupdateLogID
      transactionid
      description
    }
  }
`;
export const deleteTransactionUpdates = /* GraphQL */ `
  mutation DeleteTransactionUpdates($transactionupdateid: Int!) {
    deleteTransactionUpdates(transactionupdateid: $transactionupdateid) {
      transactionupdateid
      transactionid
      field
      oldvalue
      newvalue
      modifieddate
    }
  }
`;
export const createTransactionUpdates = /* GraphQL */ `
  mutation CreateTransactionUpdates(
    $createTransactionUpdatesInput: CreateTransactionUpdatesInput!
  ) {
    createTransactionUpdates(
      createTransactionUpdatesInput: $createTransactionUpdatesInput
    ) {
      transactionupdateid
      transactionid
      field
      oldvalue
      newvalue
      modifieddate
    }
  }
`;
export const updateTransactionUpdates = /* GraphQL */ `
  mutation UpdateTransactionUpdates(
    $updateTransactionUpdatesInput: UpdateTransactionUpdatesInput!
  ) {
    updateTransactionUpdates(
      updateTransactionUpdatesInput: $updateTransactionUpdatesInput
    ) {
      transactionupdateid
      transactionid
      field
      oldvalue
      newvalue
      modifieddate
    }
  }
`;
export const deleteTransactions = /* GraphQL */ `
  mutation DeleteTransactions($transactionid: Int!) {
    deleteTransactions(transactionid: $transactionid) {
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
export const createTransactions = /* GraphQL */ `
  mutation CreateTransactions(
    $createTransactionsInput: CreateTransactionsInput!
  ) {
    createTransactions(createTransactionsInput: $createTransactionsInput) {
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
export const updateTransactions = /* GraphQL */ `
  mutation UpdateTransactions(
    $updateTransactionsInput: UpdateTransactionsInput!
  ) {
    updateTransactions(updateTransactionsInput: $updateTransactionsInput) {
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
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers($userid: Int!) {
    deleteUsers(userid: $userid) {
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
export const createUsers = /* GraphQL */ `
  mutation CreateUsers($createUsersInput: CreateUsersInput!) {
    createUsers(createUsersInput: $createUsersInput) {
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
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers($updateUsersInput: UpdateUsersInput!) {
    updateUsers(updateUsersInput: $updateUsersInput) {
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
