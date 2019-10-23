import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580204721503_7108';

  // add your config here
  config.middleware = [ 'graphql' ];

  config.graphql = {
    path: '/graphql',
    cors: false,
    bodyParserConfig: true,
    disableHealthCheck: true
  };

  config.security = {
    csrf: {
      ignore: '/graphql',
    }
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  return config;
};
