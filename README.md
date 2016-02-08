# Connect Four

**Connect Four** is a two-player connection game in which the players first choose a color and then take turns dropping colored discs from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. The objective of the game is to connect four of one's own discs of the same color next to each other vertically, horizontally, or diagonally before your opponent.

## goals

* Playable locally on a single screen by two players.
* Libraries and frameworks like jQuery, AngularJS, React etc can be used.
* CSS3 can also be used.
* Game should have animations.
* Cross browser compliance is nice to have.


## requirements

The game should run in every modern browser out of the box. All needed
requirements are included.

## testing

To run the tests, open `test.html`.

## external libraries

Because *requirejs and co* seem way to much I decided to use [include.js from Jérémy
Barbe](https://github.com/CapMousse/include.js).

I use [kludjs](https://bitbucket.org/zserge/klud.js/) for testing.

## known bugs / issues

* Browser resize is not handled (tokens positioned absolute).
* No responsive layout.
* Slots are not rendered seamless in all browsers.
* Hovered columns are behind tokens.

## about

This software is distributed under the MIT license.
