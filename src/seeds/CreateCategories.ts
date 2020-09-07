import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Category } from '../categories/category.entity'

export default class CreateCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values([
        { name: 'Web dev', description: 'Web developement' },
        { name: 'Web design', description: 'Web UI/UX design' },
      ])
      .execute()
  }
}
