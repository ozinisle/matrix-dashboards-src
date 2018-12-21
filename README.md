# MatrixDashboards

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server

**************************************************************************************************
PLEASE NOTE - CAUTION - `ng serve`  --  does not work for this project, so use `ng serve --aot`
**************************************************************************************************
Run `ng serve --aot` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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

## Application Creation Notes

The project was created and structured through the following sequence of commands. In the exact same order of their position in the list

  # creates the app and installs all the dependencies
    ng new matrix-dashboards --routing --style=scss 
  # install angular material  
    npm install --save @angular/material @angular/cdk @angular/animations
  # install materialize-css, crypto-js, font-awesome and roboto-fontface
    npm i materialize-css crypto-js font-awesome roboto-fontface --save 
    npm install --save-dev @fortawesome/fontawesome-free
  # install infinite scroll
    npm i ngx-infinite-scroll

# cli commands used to create parts of the app
  ng generate module entry-gate-way --routing
  ng g c landing-page 
  ng g m proof-of-concepts --routing
  ng g c poc-landing-page
  ng g m shared-module