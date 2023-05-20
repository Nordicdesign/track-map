# TrackMap

Whether you are a track-day weekend warrior or commited simracer, TrackMap helps you capture track notes digitally, so you can improve your driving faster. Select your track and add notes to each turn. Braking points? Notes on the line?

## Features

- Multiple tracks - Collection of famous tracks from around the world. We cover most of ACC tracks for the simracers out there. If you want a new track added see the notes below or get in touch
- Sessions - You can separate your notes by session. Maybe it's a different setup that you are trying, a different day, or even a different car on the same track!
- Corner notes - Add observations corner by corner
- Setup notes - General feeling of the car, to help you find the best setup

## Contributing

There're two parts needed to grow this project, one is adding new tracks, the other is making the tool more user friendly.

To add new tracks you'll need to:

- Add the track map in svg or png format on the `/public/images` folder
- Add track information on the `constants/tracks.json`. Each id is used by Firebase to create the relevant database structure so don't use spaces or special characters that may brake it
- Create a new entry on `constants/routes.js`
- Link it on the `HomepageSignedIn.tsx`

At some point all this should be refactored so there's no need to create individual pages and the information is stored in the database instead. That would make much easier to be able to add new tracks.

Some guides or videos on how to use it would be helpful too. If you'd like to contribute just get in touch!

## License

This repository is licensed under a [Creative Commons Attribution License](https://creativecommons.org/licenses/by/3.0/us/)
