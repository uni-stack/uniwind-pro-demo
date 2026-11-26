# Uniwind Pro Demo (1.9.2) Released 26 November 2026

A prebuilt demo app showcasing [Uniwind Pro](https://uniwind.dev/pricing) features: the C++ engine, ShadowTree updates, Reanimated animations, native theme transitions, and scoped CSS variables. Vibecoded with [Uniwind skill](https://skills.sh/uni-stack/uniwind/uniwind).

> **This demo includes a prebuilt XCFramework for iOS Simulator (arm64) only.** No Uniwind Pro license is required. No Android support.

https://github.com/user-attachments/assets/d1492c32-e544-450b-8214-cb661f95b2e4

## Requirements

- macOS on Apple Silicon with Xcode installed
- iOS Simulator
- Expo SDK 58
- React Native 0.88.x (0.88.1 or newer)


## Quick start

```bash
bun install
bun expo prebuild
bun run ios
```

## Try it in your own project

Want to test Uniwind Pro in your existing app? Copy `uniwind-pro-demo-ios-rn.0.88.1.tgz` into your project root and add it as a dependency:

```json
"dependencies": {
  "uniwind": "file:./uniwind-pro-demo-ios-rn.0.88.1.tgz"
}
```

Your app must be on React Native 0.88.x and also needs `react-native-nitro-modules` (0.37.2 or newer), `react-native-reanimated` and `react-native-worklets`.

Then run `bun install && cd ios && pod install` (or `expo prebuild`), start the app in Debug (`bun run ios`) and start using Uniwind Pro classes in your components.

If you are migrating an existing Uniwind (OSS) app, follow the [Migrate to Pro guide](https://docs.uniwind.dev/migrate-to-pro) for the full list of steps.

## Limitations

- **iOS Simulator only** - the XCFramework is prebuilt for simulator arm64. No device builds, no Android
- **Expo SDK 58 and React Native 0.88.x only** - the XCFramework is compiled against React Native 0.88 and won't work with other versions (on 0.89 the app crashes at launch). Package managers will still install it, so check your React Native version first
- **Debug builds only** - the XCFramework is compiled against the debug React Native core (`bun run ios`). Release builds are not supported
- **No license required** - this is a free demo, no account or purchase needed

## Learn more

- [Uniwind Pro features](https://docs.uniwind.dev/pro-version)
- [Pricing](https://uniwind.dev/pricing)
- [Documentation](https://docs.uniwind.dev)

## Copyright

Copyright Uniwind 2026. All rights reserved.
