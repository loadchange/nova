import * as path from 'path';
import { Context } from 'midway';
import { ApolloServer, ServerRegistration } from 'apollo-server-koa';
import { buildSchemaSync } from 'type-graphql';

export default (options: ServerRegistration, ctx: Context) => {
  const server = new ApolloServer({
    schema: buildSchemaSync({
      resolvers: [ path.resolve(ctx.baseDir, '**/**/*.ts') ],
      container: ctx.applicationContext
    })
  });
  return server.getMiddleware(options);
};
