# Country Explorer App

A React Native application that allows users to explore countries worldwide with beautiful animations and filtering capabilities.

## Features

- 🌍 Browse countries with their flags and details
- 🔍 Search functionality
- 🏷️ Filter countries by continent and timezone
- 🎨 Dark/Light theme support
- ⚡ Smooth animations using Reanimated
- ↻ Pull-to-refresh functionality

## Tech Stack

- React Native
- TypeScript
- React Navigation
- React Native Reanimated
- React Native Raw Bottom Sheet

## Prerequisites

- Node.js >= 14
- yarn or npm
- React Native development environment setup
- iOS: XCode (for Mac users)
- Android: Android Studio & SDK

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd country-explorer
```

2. Install dependencies:
```bash
npm install
```

### Android
```bash
yarn android
# or
npm run android
```

## Project Structure

```
src/
├── assets/
│   ├── colors/
│   └── images/
├── components/
│   ├── FilterBottomSheet.tsx
│   └── LanguageBottomSheet.tsx
├── context/
│   └── AuthContext.tsx
├── navigation/
│   └── routes/
├── screens/
│   ├── Search.tsx
│   ├── SearchDetails.tsx
│   └── SplashScreen.tsx
└── types/
```

## Key Dependencies

```json
{
  "react-native": "0.72.x",
  "react-native-reanimated": "^3.x",
  "react-native-raw-bottom-sheet": "^2.x",
  "@react-navigation/native": "^6.x",
  "react-native-safe-area-context": "^4.x"
}
```

## API Reference

The app uses the [REST Countries API](https://restcountries.com/) for country data.

Endpoint used:
```
GET https://restcountries.com/v3.1/all?fields=name,flags,capital,continents,timezones
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. Reanimated Installation
If you encounter issues with Reanimated, ensure:
- Babel plugin is properly configured
- Clean build folders and reinstall dependencies
```bash
cd android && ./gradlew clean
cd ios && pod install
```

2. Metro Bundler
If metro bundler shows errors:
```bash
yarn start --reset-cache
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [REST Countries API](https://restcountries.com/)
- [React Native Community](https://reactnative.dev/community/overview)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/country-explorer](https://github.com/yourusername/country-explorer)
