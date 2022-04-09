import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';
import { PostsModule } from './posts/posts.module';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
})
export default class V1Module {}
