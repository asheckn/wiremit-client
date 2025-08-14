import { Injectable } from '@angular/core';
import {SendMoneyData, Transaction} from '../../types/transaction.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private exchangeRates = {
    GBP: 0.78, // 1 USD = 0.78 GBP
    ZAR: 18.5, // 1 USD = 18.50 ZAR
  }

  private feeRates = {
    GBP: 0.1, // 10%
    ZAR: 0.2, // 20%
  }

  private mockTransactions: Transaction[] = [
    {
      id: "1",
      amount: 500,
      currency: "GBP",
      fee: 50,
      finalAmount: 351,
      recipient: "John Doe",
      status: "completed",
      date: new Date("2024-01-15"),
      exchangeRate: 0.78,
    },
    {
      id: "2",
      amount: 300,
      currency: "ZAR",
      fee: 60,
      finalAmount: 4440,
      recipient: "Jane Smith",
      status: "completed",
      date: new Date("2024-01-10"),
      exchangeRate: 18.5,
    },
    // Add more mock transactions...
    ...Array.from({ length: 13 }, (_, i) => ({
      id: (i + 3).toString(),
      amount: Math.floor(Math.random() * 1000) + 100,
      currency: Math.random() > 0.5 ? ("GBP" as const) : ("ZAR" as const),
      fee: 0,
      finalAmount: 0,
      recipient: `Recipient ${i + 3}`,
      status: ["completed", "pending", "failed"][Math.floor(Math.random() * 3)] as any,
      date: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
      exchangeRate: Math.random() > 0.5 ? 0.78 : 18.5,
    })),
  ]

  constructor() {
    // Calculate fees and final amounts for mock data
    this.mockTransactions = this.mockTransactions.map((transaction) => {
      const fee = Math.ceil(transaction.amount * this.feeRates[transaction.currency])
      const amountAfterFee = transaction.amount - fee
      const finalAmount = Math.ceil(amountAfterFee * this.exchangeRates[transaction.currency])

      return {
        ...transaction,
        fee,
        finalAmount,
      }
    })
  }

  calculateTransaction(data: SendMoneyData): { fee: number; finalAmount: number; exchangeRate: number } {
    const fee = Math.ceil(data.amount * this.feeRates[data.currency])
    const amountAfterFee = data.amount - fee
    const exchangeRate = this.exchangeRates[data.currency]
    const finalAmount = Math.ceil(amountAfterFee * exchangeRate)

    return { fee, finalAmount, exchangeRate }
  }

  sendMoney(data: SendMoneyData): Observable<{ success: boolean; transaction?: Transaction }> {
    return new Observable((observer) => {
      const calculation = this.calculateTransaction(data)

      const transaction: Transaction = {
        id: Date.now().toString(),
        amount: data.amount,
        currency: data.currency,
        fee: calculation.fee,
        finalAmount: calculation.finalAmount,
        recipient: data.recipient,
        status: "pending",
        date: new Date(),
        exchangeRate: calculation.exchangeRate,
      }

      // Simulate API call delay
      setTimeout(() => {
        this.mockTransactions.unshift(transaction)
        observer.next({ success: true, transaction })
        observer.complete()
      }, 1000)
    })
  }

  getTransactions(page = 1, pageSize = 5): Observable<{ transactions: Transaction[]; total: number }> {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedTransactions = this.mockTransactions.slice(startIndex, endIndex)

    return of({
      transactions: paginatedTransactions,
      total: this.mockTransactions.length,
    })
  }

  getMinMaxLimits(): { min: number; max: number } {
    return { min: 10, max: 5000 }
  }
}
