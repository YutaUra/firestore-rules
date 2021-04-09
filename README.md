# This is a supreme tool to manage firestore rules in a reasonable way!

This includes these packages.

```
- packages
 ├── core      --- This is the minimum API required to manage firestore rules in the code base.
 ├── model     --- A library that wraps the core library to manage firestore rules in an object-oriented way.
 ├── formatter --- A library for formatting firestore rules
 └── cli       --- CLI library for generating firestore rules
```

## Feature

- Completery TypeScript

  When writing raw Firestore Rules, there is no Editor assistance, but this is a TypeScript, so there is Editor assistance!

- Code Splitting

  Raw Firestore Rules don't have a feature for code splitting, but if you write in TypeScript (JavaScript), you can split and reuse code!

## Install And Usage

See the README for each package.

- For purely CLI use, see [@firestore-rules/cli](https://github.com/YutaUra/firestore-rules/tree/main/packages/cli).
- If you are a developer and want to extend it.
  - [@firestore-rules/core](https://github.com/YutaUra/firestore-rules/tree/main/packages/core)
  - [@firestore-rules/model](https://github.com/YutaUra/firestore-rules/tree/main/packages/model)
  - [@firestore-rules/formatter](https://github.com/YutaUra/firestore-rules/tree/main/packages/formatter)

## Future Prospects

- Generate firestore rules from the validation rules used on the client side using a schema-validator such as [zod](https://github.com/colinhacks/zod)

## Others

If you have any questions, please feel free to create an Issue.
And if you come up with any other features you think would be more useful, I'd love to know!

And if you find any problems with the document, please send me a PR and I'll be very happy!
