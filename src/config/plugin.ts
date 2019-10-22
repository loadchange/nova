import { EggPlugin } from 'midway';

export default {
  static: true,
  view: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  }
} as EggPlugin;
