# Improv Trainer

A simple web-based trainer for improvisation that randomly selects and displays emotions, roles, and sentences to inspire improv scenes.

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Data Sources and Licensing](#data-sources-and-licensing)
- [License](#license)

## Overview

**Improv Trainer** is a single-page web application that helps users practice improv by generating a random emotion, role, and sentence prompt. It provides buttons to shuffle these elements independently or all at once, and allows for scheduling automated changes at adjustable intervals.

This application is ideal for drama classes, theater groups, or anyone interested in doing fun improv exercises.

## How It Works

1. **Emotion**: A random emotion is chosen from a predefined list (see [`emotions.js`](./emotions.js)).
2. **Role**: A random role (e.g., occupations, archetypes) is chosen from a predefined list (see [`roles.js`](./roles.js)).
3. **Sentence**: A random sentence is chosen from a dataset (e.g., Tatoeba, or other open-licensed source) in either English or Estonian (see [`sentences.js`](./sentences.js)).

There are controls for:

- **Locking** any category to keep it from changing.
- **Language Toggle** to switch between English and Estonian datasets.
- **Shuffle** buttons to manually generate new items.
- **Automated Intervals** (set in the **Settings** panel) for timed changes.

## Usage

1. **Clone or download** this repository.
2. **Open** the `index.html` file in your preferred web browser.
3. **Click** the buttons to shuffle or lock different elements.
4. **Adjust** intervals in the **Settings** panel if you want them to change automatically after a chosen number of seconds.

## File Structure

```plaintext
/
+- index.html         # Main entry point for the Improv Trainer
+- emotions.js        # Array or object with emotion data
+- roles.js           # Array or object with role data
+- sentences.js       # Array or object with sentence data (English & Estonian)
+- main.js            # Main logic for the app
+- README.md          # This README file
```

## Data Sources and Licensing

### Emotions and Roles

The `emotions.js` and `roles.js` files contain lists or arrays of possible emotions and roles. These are custom-curated or crowdsourced lists. If you’ve sourced them from external open-licensed data, please acknowledge and include relevant license information here.

### Sentences (Tatoeba Project)

The sentences in [`sentences.js`](./sentences.js) are taken from the [Tatoeba Project](https://tatoeba.org/), which provides user-contributed example sentences in multiple languages.

Tatoeba's content is available under the [Creative Commons Attribution 2.0 France (CC BY 2.0 FR) License](https://creativecommons.org/licenses/by/2.0/fr/). This means you can:

- Copy and redistribute the material in any medium or format.
- Remix, transform, and build upon the material for any purpose, even commercially.

Under **these conditions**:

- You must give **appropriate credit**, provide a link to the license, and indicate if changes were made. 
- You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

**Attribution example**:  

> Sentences used in this app are sourced from the Tatoeba Project (https://tatoeba.org).  
> Licensed under CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/).

In your own distribution, make sure to maintain this attribution and licensing reference.

## License

This project’s **code** (excluding the Tatoeba-sourced sentence data) is released under the [MIT License](./LICENSE). That means you’re free to use, copy, modify, and distribute the code as long as the original MIT license text is included.

The **Tatoeba-derived sentence data** in [`sentences.js`](./sentences.js) remains under [CC BY 2.0 FR](https://creativecommons.org/licenses/by/2.0/fr/). If you redistribute or modify this data, you must retain the license and attribution information as described above.