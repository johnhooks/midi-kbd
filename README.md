<p align="center" style="max-width: 720px;">
  <a href="https://johnhooks.io/midi-kbd">
    <img
      alt="Preview of computer keyboard overlaid with musical notes"
      src="https://raw.githubusercontent.com/johnhooks/midi-kbd/main/.github/keyboard.svg"
    >
  </a>
</p>

<h1 align="center">
  <a href="https://johnhooks.io/midi-kbd">
    midi-kbd
  </a>
</h1>

> Web MIDI input keyboard controller

## 📦 Install

```sh
npm install midi-kbd

# or

yarn add midi-kbd
```

## ⚡️ Quick start

Example of using the `keyEvents` observable piped though to MIDI note values.

```js
import {
  filterKeyboardEvents,
  keyEvents,
  mapToMidiEvent
} from "midi-kbd";

keyEvents
  .pipe(filterKeyboardEvents())
  .pipe(mapToMidiEvent(4))
  .subscribe((event) => {
    // The MIDI note value is a property o the event, `event.note`
    if (event.type === "on") {
      // trigger a note
    } else if (event.type === "off") {
      // release a note
    }
  });
```

## 📚 Documentation

This is still a work in progress.

Though if you want to checkout an example of what it is/or could be, you can see it in action here, [johnhooks/midi-kbd](https://johnhooks.io/midi-kbd).

The source code for the example above is found in the `website` directory of this repo.

## Inspiration

[AudioKeys](https://github.com/kylestetz/AudioKeys)

## License

[MIT](LICENSE) @ John Hooks
