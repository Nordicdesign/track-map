# Track Map

Track Map helps you capture track notes in a digital way, so you can improve your driving faster. For each turn you can say whether you had oversteer or understeer, and write some thoughts on best way to approach it, braking points, etc. The project is at early beta so expect bare minimum functionality and things to not work at all! Use at your own risk.

## Getting started

If you have trouble with `createRequire is not a function`, try upgrading your node version. E.g. 14.17.3 should work.

## Scripts

`npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

There're two parts needed to grow this project, one is adding new tracks, the other is making the tool more user friendly.

To add new tracks you'll need to:

* Add the track map in svg or png format on the `/public/images` folder
* Add track information on the `constants/tracks.json`. Each id is used by Firebase to create the relevant database structure so don't use spaces or special characters that may brake it
* Create a new entry on `constants/routes.js`
* Link it on the `HomepageSignedIn.js`

At some point all this should be refactored so there's no need to create individual pages and the information is stored in the database instead. That would make much easier to be able to add new tracks.

Some guides or videos on how to use it would be helpful too. If you'd like to contribute just get in touch!

## License

This repository is licensed under a [Creative Commons Attribution License](https://creativecommons.org/licenses/by/3.0/us/)
