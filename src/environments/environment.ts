// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    apiUrl: window['env']['apiUrl'] || 'http://localhost:8080/zprint',
    frontUrl: window['env']['frontUrl'] || 'http://localhost:4200',
  }
};
