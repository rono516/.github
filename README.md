# 🚀 Maverick Start Program — Engineering Pre-Assessment

**Payd Sacco** is a project whose target audience is users in a sacco setting, they can transact, deposit, transfer funds from one user to another using a wallet with a unique username, allowing users to own a wallet and use it in their day to day transactions.

---
**Target Audience**

Community groups / Sacco

---

## 📌 Submission Details

- **Name: Collins Rono**
- **Track: Fullstack**
- **Target audience: Community groups / Sacco**
- **Tech stack used:** `React & Laravel`

---

# Feature List

# User Registration

![User Registration Logo](project/Registration.png)

# User Login

![User Login](project/Login.png)

# Dashboard , Wallet overview, Transactions & Savings Balances, Transactions history

![Dashboard overview](project/Dashboard.png)

# Transaction Page for Deposit , Wallet to Wallet transfer

![Transact](project/Transact.png)

# Savings Overview , Balance , Target & Progress

![Savings Overview](project/Savings.png)

# Create New Savings, Target, Description

![New Savings](project/NewSavings.png)

# Wallet to Savings Transfer

![Wallet to Savings Transfer](project/SavingsDeposit.png)

# Notifications on deposits, transfers, received transactions , new savings account

![Notifications](project/Notifications.png)

# Profile Update, Password Management, Light/Dark Theme toggle

![Profile Update](project/ProfileUpdate.png)

![Password Management](project/PasswordManagement.png)

![Light, Dark Theme Toggle](project/Theme.png)

# Project Setup Guide

This guide outlines the steps to set up the project after cloning it from Github.

## Requirements

- PHP >= 8.2
- Composer
- Node.js and npm
- PostgreSQL
- Laravel CLI (`php artisan`)
- Git

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-laravel-project.git payd
cd payd

```


# Linux Setup

```bash

cp .env.example .env
composer install
npm install

php artisan key:generate
```
- Setup database and run project

```bash
sudo -u postgres psql
CREATE DATABASE your_database_name;
\q

php artisan migrate --seed

php artisan serve

npm run dev

```

# Windows Setup

# Install dependencies

```bash
copy .env.example .env
composer install
npm install

```

# Generate app key
```bash
php artisan key:generate

```
# Create PostgreSQL database
- Use pgAdmin or psql:

```bash
CREATE DATABASE your_database_name;

```

- Update your .env file with your PostgreSQL username and password.

- Run migrations and seeders

```bash
php artisan migrate --seed

```
# Serve application

```bash
php artisan serve
```

# Build frontend assets
```bash
npm run dev
```

# Open in browser
[Visit Localhost On Browser](http://127.0.0.1:8000/)


# Product Thinking

Most clients of saccos for example Kenya Bankers Sacco are headed the direction of easening transactions for members, allowing them to monitor and transact from sacco operating account which is like a wallet, from this wallet they can deposit to other savings accounts, they can receive loans and withdraw from it.

Payd Sacco is aiming to align to such easier banking solutions for sacco members, allowing them to transact with fellow members using wallet to wallet transfer, allowing them to deposit to the sacco, save in various saving accounts, check progress of their saving goals over time.

The members can receive real time app notifications of funds received in their wallet and they get a distinct wallet that they can use as their property for a long time without interference.

# Saving Features

- Create more than one saving goal
- Clear snapshot of all their savings at a go in the dashboard
- Saving Progress against target
- Deposit to savings from wallet









