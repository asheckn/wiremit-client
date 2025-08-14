import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';

@Component({
  selector: 'app-landing',
  imports: [
    NgForOf,
    Header,
    Footer
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit {
  isVisible = false

  features: Feature[] = [
    {
      icon: "🔒",
      title: "Bank-Level Security",
      description: "Your money and data are protected with military-grade encryption",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Send money in minutes, not days. Your family gets it instantly",
    },
    {
      icon: "💰",
      title: "Best Exchange Rates",
      description: "Get more value for your money with our competitive rates",
    },
    {
      icon: "📱",
      title: "Easy to Use",
      description: "Simple interface designed for everyone, no tech skills needed",
    },
  ]

  supportedCities: City[] = [
    { name: "London", country: "United Kingdom", flag: "🇬🇧" },
    { name: "Rome", country: "Italy", flag: "🇮🇹" },
    { name: "Berlin", country: "Germany", flag: "🇩🇪" },
    { name: "Warsaw", country: "Poland", flag: "🇵🇱" },
    { name: "Sydney", country: "Australia", flag: "🇦🇺" },
    { name: "Toronto", country: "Canada", flag: "🇨🇦" },
    { name: "Melbourne", country: "Australia", flag: "🇦🇺" },
    { name: "Vancouver", country: "Canada", flag: "🇨🇦" },
  ]

  howItWorksSteps: HowItWorksStep[] = [
    {
      step: 1,
      title: "Create Account",
      description: "Sign up in minutes with just your email and phone number",
      icon: "👤",
    },
    {
      step: 2,
      title: "Enter Amount",
      description: "Choose how much you want to send and see real-time exchange rates",
      icon: "💵",
    },
    {
      step: 3,
      title: "Add Recipient",
      description: "Enter your family member's details abroad",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      step: 4,
      title: "Send Money",
      description: "Confirm and send - they receive it within minutes",
      icon: "🚀",
    },
  ]

  securityFeatures: SecurityFeature[] = [
    {
      icon: "🛡️",
      title: "256-bit SSL Encryption",
      description: "All transactions are protected with bank-grade encryption technology",
    },
    {
      icon: "🔐",
      title: "Two-Factor Authentication",
      description: "Extra layer of security with SMS and email verification",
    },
    {
      icon: "🏦",
      title: "Licensed & Regulated",
      description: "Fully licensed money service business in all operating countries",
    },
    {
      icon: "👁️",
      title: "24/7 Monitoring",
      description: "Advanced fraud detection systems monitor all transactions",
    },
  ]

  testimonials: Testimonial[] = [
    {
      name: "Sarah Mukamuri",
      location: "London, UK",
      message:
        "WireTrans has made supporting my daughter at university so much easier. The app is simple and the money arrives quickly!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "James Chikwanha",
      location: "Toronto, Canada",
      message:
        "Finally, a service that understands our needs. Great rates and my family in Harare gets the money the same day.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Grace Moyo",
      location: "Sydney, Australia",
      message: "I trust WireTrans with my hard-earned money. They are reliable and the customer service is excellent.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  constructor() {}

  ngOnInit(): void {
    // Trigger animation after component loads
    setTimeout(() => {
      this.isVisible = true
    }, 100)
  }

  onGetStarted(): void {
    // Navigate to signup or handle get started action
    console.log("Get Started clicked")
  }

  onLearnMore(): void {
    // Navigate to learn more section or page
    console.log("Learn More clicked")
  }



  onStartSending(): void {
    // Navigate to send money page
    console.log("Start Sending Money clicked")
  }

  onDownloadApp(): void {
    // Handle app download
    console.log("Download App clicked")
  }

  onSignIn(): void {
    // Navigate to sign in page
    console.log("Sign In clicked")
  }


}
