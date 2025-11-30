# 🛠️ Leviro Utils

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**A powerful collection of developer and daily utility tools built with performance and usability in mind.**

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Usage](#usage) • [Contributing](#contributing)

</div>

---

## ✨ Features

### 📅 Age Calculator
Calculate your exact age with precision down to days. Get detailed breakdowns including:
- Years, months, weeks, and days
- Total days lived
- Next birthday countdown
- Zodiac sign information

### 🔗 Demo
You can try it from here 👉 [🔗 Demo](https://utils.leviro.net)

### 💱 Currency Converter
Real-time currency conversion powered by the latest exchange rates:
- Support for 150+ world currencies
- Searchable dropdown with country flags
- Auto-updating exchange rates
- Bi-directional conversion
- Historical rate tracking

### 🔐 Secret Generator
Generate secure, cryptographically random secrets for your applications:
- Customizable length and complexity
- Built-in bcrypt hashing
- Rate limiting for security (5 requests per minute)
- Copy to clipboard functionality
- Secure password generation

### 🌍 World Info
Explore comprehensive geographical data:
- 195+ countries with detailed information
- States and provinces data
- Cities database with population info
- Advanced search and filtering
- ISO codes, currencies, and languages
- Capital cities and time zones

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js (≥16.0.0) |
| **Framework** | Express.js |
| **View Engine** | EJS (Embedded JavaScript) |
| **Styling** | TailwindCSS v4.1 |
| **Database** | SQLite (better-sqlite3) |
| **PWA** | Service Worker, Web Manifest |
| **Security** | bcrypt, express-rate-limit |
| **API** | RESTful architecture |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16.0.0 or higher)
- npm (usually comes with Node.js)
- Git

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Abdodiab2005/leviro-utils.git
cd leviro-utils
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build TailwindCSS

```bash
npm run build:css
```

### 4. Start the Server

```bash
npm start
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🎯 Usage

### Development Mode

For active development with auto-reloading CSS:

```bash
# Terminal 1: Watch CSS changes
npm run watch:css

# Terminal 2: Run the server (with nodemon for auto-restart)
npm run dev
```

### Production Mode

```bash
# Build optimized CSS
npm run build:css

# Start production server
npm start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start development server with nodemon |
| `npm run build:css` | Build TailwindCSS for production |
| `npm run watch:css` | Watch and rebuild CSS on changes |

## 📱 PWA Installation

Leviro Utils is a fully installable Progressive Web App:

1. Open the app in your browser
2. Look for the "Install" prompt or click the install icon in the address bar
3. Follow the installation prompts
4. Access the app from your home screen or applications menu

## 🔒 Security Features

- Rate limiting on sensitive endpoints
- bcrypt password hashing
- CORS protection
- Input validation and sanitization
- Secure headers configuration

## 🌐 API Endpoints

### Currency Converter
```
GET  /currency           - Currency converter page
POST /currency/convert   - Convert currencies
GET  /currency/rates     - Get latest exchange rates
```

### Secret Generator
```
GET  /secret            - Secret generator page
POST /secret/generate   - Generate new secret (rate limited)
```

### World Info
```
GET  /world             - World info homepage
GET  /world/countries   - List all countries
GET  /world/country/:id - Get country details
GET  /world/search      - Search locations
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Your environment details

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abdo Diab**

- GitHub: [@Abdodiab2005](https://github.com/Abdodiab2005)
- Project Link: [https://github.com/Abdodiab2005/leviro-utils](https://github.com/Abdodiab2005/leviro-utils)

## 🙏 Acknowledgments

- Currency exchange rates provided by [Exchange Rate API](https://exchangerate-api.com/)

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Abdodiab2005/leviro-utils?style=social)
![GitHub forks](https://img.shields.io/github/forks/Abdodiab2005/leviro-utils?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Abdodiab2005/leviro-utils?style=social)

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

Made with ❤️ by Abdo Diab

</div>
