import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'dev',
  password: '',
  database: 'we_learn_dev',
  entities: [__dirname + '/../**/**.entity{.ts,.js}'],
  synchronize: true,
}
