# Uniwind Pro Demo

A prebuilt demo app showcasing [Uniwind Pro](https://uniwind.dev/pricing) features: the C++ engine, ShadowTree updates, Reanimated animations, and native theme transitions. Vibecoded with [Uniwind skill](https://skills.sh/uni-stack/uniwind/uniwind).

> **This demo includes a prebuilt XCFramework for iOS Simulator (arm64) only.** No Uniwind Pro license is required. No Android support.

https://github.com/user-attachments/assets/d1492c32-e544-450b-8214-cb661f95b2e4

## Requirements

- macOS with Xcode installed
- iOS Simulator
- Expo SDK 54
- React Native 0.81.5

Using a different React Native version will result in a build failure or runtime crash.

## Quick start

```bash
bun install
bun expo prebuild
bun run ios
```

## Try it in your own project

Want to test Uniwind Pro in your existing app? Copy `uniwind-pro-demo-ios-only-rn.0.81.5.tgz` into your project root and add it as a dependency:

```json
"dependencies": {
  "uniwind": "file:./uniwind-pro-demo-ios-only-rn.0.81.5.tgz"
}
```

Then run `bun install && cd ios && pod install` (or `expo prebuild`) and start using Uniwind Pro classes in your components.

## Limitations

- **iOS Simulator only** - the XCFramework is prebuilt for simulator arm64. No device builds, no Android
- **Expo SDK 54 and React Native 0.81.5 only** - pinned to these exact versions
- **No license required** - this is a free demo, no account or purchase needed

## Learn more

- [Uniwind Pro features](https://docs.uniwind.dev/pro-version)
- [Pricing](https://uniwind.dev/pricing)
- [Documentation](https://docs.uniwind.dev)

## Copyright

Copyright Uniwind 2026. All rights reserved.
