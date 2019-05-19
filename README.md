# ClockWebClient

This is the HTML client (referred to as _the frontend_ below) for [clock-api](https://github.com/dapengli2005/clock-web-client) (referred to as _the backend_ below), built with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

View live demo on [heroku](https://clock-client.herokuapp.com/), it runs on free dynos so delay is expected.

# Features

- login with username
  - no password is required, new user will be created upon first login
- clock in/out with optional note
  - system will try to suggest an 'clock in' or 'clock out' action based on last action of the user
- view clock in/out history
  - pagination is supported
- edit single clock in/out entry
- delete single clock in/out entry
- manually create clock in/out entry

## Validations

- sensible defaults are provided, but minimal validation is performed in the frontend, for example
  - in Chrome-based browsers an HTML-native date picker will be displayed for date time field
  - in Safari and Firefox, the date time field is displayed as text
- the backend performs more extensive validations and the frontend will display errors if there are any, for example:
  - if user removes the date time field value before submitting (when creating or editing), a validation error from backend will be displayed
  - if user selects a date time in the future (5 minutes later than current), a validation error from backend will be displayed

## More about date time format

- date times are displayed using timezone and locale determined from user's browser
- the backend persists date time in UTC
- the backend sends date time fields in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601) in JSON response

# Development

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
