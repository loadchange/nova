import 'ignore-styles';
import babelRegister from '@babel/register';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import App from '../../../web/App';

import { Context, inject, controller, get, provide } from 'midway';

babelRegister({
  ignore: [ /(node_module)/ ],
  presets: [ '@babel/preset-env', '@babel/preset-react' ]
});

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @get('/')
  async index(ctx) {
    const html = await ctx.renderView('index.html');
    const rootHtml = ReactDomServer.renderToString(React.createElement(App));
    ctx.body = html.replace(
      '<div id="root"></div>',
      `<div id="root">${ rootHtml }</div>`
    );
  }
}
