# GIA, Give It Away

GIA is a [TypeScript](http://www.typescriptlang.org/) Twitch giveway bot

## Getting Started

### Prerequisites

- [TypeScript](https://www.rust-lang.org/)
- [Node.JS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/lang/en/)

### Installing

#### Get GIA

##### From source

Clone this repo and run

```sh
yarn
```

To download all the deps, then

```sh
yarn build
```

To build js files from ts files into `dist`

### Usage

```sh
yarn start --help
```

GIA uses config files in .yaml format, see `settings.yml` file inside
the `examples` directory for real life examples.

## User Help

Once the bot is connected, the only available command for now is `!giveaway`.
This command fetch all followers from specified channel ID from config file and
choose one of them randomly.

## Built With

- [tmi.js](https://github.com/tmijs/tmi.js) - A Twitch IRC client library
- [got](https://github.com/sindresorhus/got) - An HTTP client

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Wilfried OLLIVIER** - _Main author_ - [Papey](https://github.com/papey)

## License

[LICENSE](LICENSE) file for details

## Notes

This is obviously a reference to the [Red Hot Chili Peppers](https://fr.wikipedia.org/wiki/Red_Hot_Chili_Peppers) song : [Give it Away](https://www.youtube.com/watch?v=Mr_uHJPUlO8)
