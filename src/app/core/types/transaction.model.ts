export interface Transaction {
  id: string
  amount: number
  currency: "GBP" | "ZAR"
  fee: number
  finalAmount: number
  recipient: string
  status: "completed" | "pending" | "failed"
  date: Date
  exchangeRate: number
}

export interface SendMoneyData {
  amount: number
  currency: "GBP" | "ZAR"
  recipient: string
  paymentMethod: "card" | "ecocash" | "paypal"
}
