module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'dev',
  password: '',
  database: 'we_learn_dev',
  entities: ['./src/**/**.entity.ts'],
  synchronize: true,
  seeds: ['src/seeds/**/*{.ts,.js}'],
  factories: ['src/factories/**/*{.ts,.js}'],
}
