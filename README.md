# uniwind-pro-demo

A demo project showcasing [Uniwind Pro](https://uniwind.dev) with Expo SDK 54 and React Native 0.81.

## Quick start

```bash
bun install
cd ios && pod install && cd ..
bun run ios
```

## Using the demo tgz in your own project

You can copy `uniwind-pro-demo-ios-only-rn.0.81.5.tgz` to your project and install it:

```json
"dependencies": {
  "uniwind": "file:./uniwind-pro-demo-ios-only-rn.0.81.5.tgz"
}
```

Then run `bun install && cd ios && pod install`.

### Limitations

- **iOS Simulator only** -- no device builds, no Android
- **Expo SDK 54** and **React Native 0.81.0** only
- XCFramework is prebuilt for simulator arm64

Using a different React Native version will result in a build failure or runtime crash.

## Copyright

Copyright Uniwind 2026. All rights reserved.
