import {Injectable, OnInit} from '@angular/core';
import {SendMoneyData, Transaction} from '../../types/transaction.model';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {List} from 'postcss/lib/list';

@Injectable({
  providedIn: 'root'
})
export class TransactionService  {
  private exchangeRates:any = {}

  private feeRates = {
    GBP: 0.1, // 10%
    ZAR: 0.2, // 20%
  }

  private paymentMethodRates = {
    card: 0.1, // 10%
    paypal: 0.2, // 20%
    ecocash: 0.15 // 15%
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

  constructor(private http: HttpClient) {

    this.getRates().subscribe({
      next: (response) => {
        console.log("Exchange rates initialized:", this.exchangeRates);
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

      },
      error: (error) => {
        console.error("Failed to fetch exchange rates:", error);
      }
    });

  }

  calculateTransaction(data: SendMoneyData): { fee: number; finalAmount: number; exchangeRate: number; paymentMethodFee: number } {
    const fee = Math.ceil(data.amount * this.feeRates[data.currency])
    const paymentMethodFee = Math.ceil(data.amount * this.paymentMethodRates[data.paymentMethod])
    const amountAfterFee = data.amount - fee - paymentMethodFee
    const exchangeRate = this.exchangeRates[data.currency]
    const finalAmount = Math.ceil(amountAfterFee * exchangeRate)

    return { fee, finalAmount, exchangeRate, paymentMethodFee }
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

  getRates() {
    console.log("Fetching exchange rates from API...");
    return this.http.get("https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS")
      .pipe(
        tap((response: any) => {
          console.log("Fetched Values", response);
          response
            .filter((rateObj:any) => ['GBP', 'ZAR'].some(curr => curr in rateObj))
            .forEach((rateObj:any) => {
              const [key, value] = Object.entries(rateObj)[0];
              this.exchangeRates[key as keyof typeof this.exchangeRates] = value;
            });

          console.log("Updated exchange rates:", this.exchangeRates);
        }),
        catchError((error) => {
          console.error("Error fetching rates:", error);
          return of([]);
        })
      );
  }
}
