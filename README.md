

# WiremitClient

WiremitClient is a frontend application built with [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.  
It provides a user interface for the Wiremit platform, including secure authentication, user registration, and transaction management.

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/asheckn/wiremit-client.git
   cd wiremit-client


2. **Install dependencies**

   ```bash
   npm install
   ```

---

## 🚀 Development Server

To start a local development server:

```bash
ng serve
```

Then open your browser and navigate to:

```
http://localhost:4200/
```

The application will automatically reload when you change any source files.

---

## 🏗 Production Build & Run

1. **Build for production**

   ```bash
   npm run build
   ```

   This will generate an optimized build in the `dist/wiremit-client` directory.


## 🔑 Registration & Login

1. **Sign Up**

  * Navigate to `/sign-up` in your browser.
  * Fill in the registration form to create a new account.

2. **Login with Admin Credentials**

  * **Email:** `admin@mail.com`
  * **Password:** `admin`

---

## App Component Structure and Flow
- The App is Built with Angular as its a modern , well structured maintainable framework that comes with everything out of the box, it battled tested in large 
organisations such as Google and other enterprises and defined software best practices for modern web applications 
- The Structure implemented is similar to MVC as it attempts to separate concerns in the design, There are Features, Services , types and components  
- Features are your pages or group of related pages for a particular feature eg dashboard or landing page , auth etc , services is where most of the Business logic takes places , 
- Using a service allows for the results of any calculation and its data to be easily accessible from other views or components through Angulars dependency injection and RXJS
- As this uses a component based structure everything starts in the app component which defines the main layout ie Header , main Body and Footer 
- Body is where Angular's router outlet system takes over allowing persistent  header and footer 
- Authentication is Maintained using the Auth service which is mocking a real server instead of a JWT the system checks for an active user in local storage which would have been created on registration
- Local storage was used as its fast and persists between reloads though it is not secure at all
- Guards are the system used to prevent un authenticated access to the dashboard , requiring users to first sign in , in a real application this would validate any JWT tokens or sessions 
- The system only allows for a single email address to be used per user and does not allow multiple accounts per user

## Rates
- When the site loads initially it will attempt to get rates from the mock API provided and save them in a format easier to work with for the rate calculation service , 
- The Rate calculator takes into account the currency , a dynamic fee and also a fee based on payment method used as different payment methods have their own fees and charges 
- The system is scalable as adding new currencies is only a matter of increasing the number of approved currencies which is mocking a real API that would provide real currencies 

## Trade Offs
- Having all the data on the client is never secure and safe and allows any malicious actors the ability to get user data 
- In an real world application sensitive Data in local storage would be encrypted or stored in memory to increase security and reduce the risk of exploitation
- More emphasis was put in providing an MVP due to the limited amount of time as a result unit testing and proper component separation is not in place ,many Tailwind elements could have been combined and reused for 
a consistent look 
- Proper image optimization and SEO was also affected as a result of time


