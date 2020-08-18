/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateIrpft = /* GraphQL */ `
  subscription OnCreateIrpft {
    onCreateIRPFT {
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
export const onCreateAvgPriceT = /* GraphQL */ `
  subscription OnCreateAvgPriceT {
    onCreateAvgPriceT {
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
export const onCreateCosts = /* GraphQL */ `
  subscription OnCreateCosts {
    onCreateCosts {
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
export const onCreateCurrentposition = /* GraphQL */ `
  subscription OnCreateCurrentposition {
    onCreateCurrentposition {
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
export const onCreatePortfolioPerformanceT = /* GraphQL */ `
  subscription OnCreatePortfolioPerformanceT {
    onCreatePortfolioPerformanceT {
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
export const onCreateStockQuotes = /* GraphQL */ `
  subscription OnCreateStockQuotes {
    onCreateStockQuotes {
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
export const onCreateTransactionAutoupdateLog = /* GraphQL */ `
  subscription OnCreateTransactionAutoupdateLog {
    onCreateTransactionAutoupdateLog {
      trasactionAutoupdateLogID
      transactionid
      description
    }
  }
`;
export const onCreateTransactionUpdates = /* GraphQL */ `
  subscription OnCreateTransactionUpdates {
    onCreateTransactionUpdates {
      transactionupdateid
      transactionid
      field
      oldvalue
      newvalue
      modifieddate
    }
  }
`;
export const onCreateTransactions = /* GraphQL */ `
  subscription OnCreateTransactions {
    onCreateTransactions {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers {
    onCreateUsers {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
