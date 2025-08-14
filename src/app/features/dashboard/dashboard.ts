import {Component, OnInit} from '@angular/core';
import {User} from '../../core/types/user.model';
import {SendMoneyData, Transaction} from '../../core/types/transaction.model';
import {Ad} from '../../core/types/ad.model';
import {AuthService} from '../../core/services/auth-service';
import {Router} from '@angular/router';
import {AdsService} from '../../core/services/ads/ads-service';
import {TransactionService} from '../../core/services/transaction/transaction-service';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Sidebar} from '../../components/sidebar/sidebar';
import {Header} from '../../components/header/header';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgClass,
    NgForOf,
    TitleCasePipe,
    DatePipe,
    FormsModule,
    NgIf,
    Sidebar,
    CurrencyPipe,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  currentUser: User | null = null
  activeSection = "transfer"

  // Send Money Section
  sendMoneyData: SendMoneyData = {
    amount: 0,
    currency: "GBP",
    recipient: "",
    paymentMethod: "card",
  }
  calculatedFee = 0
  calculatedFinalAmount = 0
  exchangeRate = 0
  sendingMoney = false
  sendMoneyMessage = ""
  limits = { min: 10, max: 5000 }
  calculatedPaymentMethodFee = 0

  // Ads Section
  ads: Ad[] = []
  currentAdIndex = 0

  // Transaction History
  transactions: Transaction[] = []
  currentPage = 1
  pageSize = 5
  totalTransactions = 0
  totalPages = 0

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private adsService: AdsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user
      } else {
        this.router.navigate(["/login"])
      }
    })

    // Load ads
    this.adsService.getAds().subscribe((ads) => {
      this.ads = ads
    })

    // Load transaction history
    this.loadTransactions()

    // Get limits
    this.limits = this.transactionService.getMinMaxLimits()

    // Auto-rotate ads every 5 seconds
    setInterval(() => {
      this.nextAd()
    }, 10000)
  }

  onMenuItemClick(itemId: string): void {
    this.activeSection = itemId

    // Load data based on section
    if (itemId === "transactions") {
      this.loadTransactions()
    }
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === "admin" || false
  }

  // Send Money Methods
  onAmountChange(): void {
    if (this.sendMoneyData.amount > 0) {
      const calculation = this.transactionService.calculateTransaction(this.sendMoneyData)
      this.calculatedFee = calculation.fee
      this.calculatedFinalAmount = calculation.finalAmount
      this.exchangeRate = calculation.exchangeRate
      this.calculatedPaymentMethodFee = calculation.paymentMethodFee
    } else {
      this.calculatedFee = 0
      this.calculatedFinalAmount = 0
      this.exchangeRate = 0
      this.calculatedPaymentMethodFee = 0
    }
  }

  onSendMoney(): void {
    this.sendMoneyMessage = ""

    // Validation
    if (!this.sendMoneyData.recipient) {
      this.sendMoneyMessage = "Recipient name is required"
      return
    }

    if (this.sendMoneyData.amount < this.limits.min || this.sendMoneyData.amount > this.limits.max) {
      this.sendMoneyMessage = `Amount must be between $${this.limits.min} and $${this.limits.max}`
      return
    }

    this.sendingMoney = true

    this.transactionService.sendMoney(this.sendMoneyData).subscribe({
      next: (result) => {
        this.sendingMoney = false
        if (result.success) {
          this.sendMoneyMessage = "Money sent successfully!"
          // Reset form
          this.sendMoneyData = { amount: 0, currency: "GBP", recipient: "", paymentMethod: "card" }
          this.calculatedFee = 0
          this.calculatedFinalAmount = 0
          this.exchangeRate = 0
          // Reload transactions
          this.loadTransactions()
        }
      },
      error: () => {
        this.sendingMoney = false
        this.sendMoneyMessage = "Failed to send money. Please try again."
      },
    })
  }

  // Ads Methods
  nextAd(): void {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length
  }

  prevAd(): void {
    this.currentAdIndex = this.currentAdIndex === 0 ? this.ads.length - 1 : this.currentAdIndex - 1
  }

  // Transaction History Methods
  loadTransactions(): void {
    this.transactionService.getTransactions(this.currentPage, this.pageSize).subscribe((result:any) => {
      this.transactions = result.transactions
      console.log(this.transactions)
      this.totalTransactions = result.total
      this.totalPages = Math.ceil(this.totalTransactions / this.pageSize)
    })
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.loadTransactions()
    }
  }

  // Utility Methods
  logout(): void {
    this.authService.logout()
    this.router.navigate(["/"])
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  protected readonly Math = Math;
}
