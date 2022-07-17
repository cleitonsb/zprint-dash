export const environment = {
  production: true,
  config: {},
  resolver: (prop: string) => () => (environment.config[prop] as string),
};
