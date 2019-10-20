import * as webpack from 'webpack';
import * as webpackDev from 'webpack-dev-middleware';
import * as config from '../../../webpack.config';

const compiler = webpack(config);

export default options => {
  const middleware = webpackDev(compiler, options);
  return async (ctx, next) => {
    await middleware(ctx.req, {
      end: (content) => {
        ctx.body = content;
      },
      setHeader: (name, value) => {
        ctx.set(name, value);
      }
    }, next);
  };
};
