import { Context, inject, provide } from 'midway';
import { IUserService } from '../../interface';
import { User } from '../../entity';
import { Resolver, Query, Arg } from 'type-graphql';

@Resolver(User)
@provide()
export class UserController {

  @inject()
  ctx: Context;

  @inject('userService')
  service: IUserService;

  @Query(returns => User)
  async getUser(@Arg('id')id: number) {
    return this.service.getUser({ id });
    // return {
    //   id,
    //   username: 'mockedName',
    //   phone: '12345678901',
    //   email: 'xxx.xxx@xxx.com',
    // };
  }
}
