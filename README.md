<p align="center">
<img src="https://raw.githubusercontent.com/gaganyadav80/rp-consumer/main/assets/logo-full.png" height="100" alt="Riverpod" />
</p>

---

## Overview

This extension is heavily inspired from [Bloc VSCode Extension](https://marketplace.visualstudio.com/items?itemName=FelixAngelov.bloc).

[VSCode](https://code.visualstudio.com/) support for the [Riverpod Consumer](https://riverpod.dev) and provides tools for effectively wrapping widgets under Consumer builder for [Flutter](https://flutter.dev/) apps.

## Installation

Riverpod Consumer can be installed from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=GaganYadav.rp-consumer) or by [searching within VSCode](https://code.visualstudio.com/docs/editor/extension-gallery#_search-for-an-extension).

## Commands

| Command                              | Description                                                            |
| ------------------------------------ | ---------------------------------------------------------------------- |
| RP Consumer: New Notifier            | Generate a new Notifier                                                |
| RP Consumer: New Stateless File      | Generate a new Stateless widget file                                   |

You can activate the commands by launching the command palette (View -> Command Palette) and running entering the command name or you can right click on the directory in which you'd like to create the bloc/cubit and select the command from the context menu.

## Code Actions

| Action                               | Description                                                            |
| ------------------------------------ | ---------------------------------------------------------------------- |
| `Wrap with Consumer`                 | Wraps current widget in a `Consumer`                                   |
| `Remove Consumer`                    | Removes the selected `Consumer`. Caution: Can cause problems with `Consumer` that returns multiple widgets from the builder. It is a WIP. |
