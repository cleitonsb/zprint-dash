export const environment = {
  production: true,
  config: {
    apiUrl: window['env']['apiUrl'] || 'http://localhost:8080/zprint',
    frontUrl: window['env']['frontUrl'] || 'http://localhost:4200',
  }
};
