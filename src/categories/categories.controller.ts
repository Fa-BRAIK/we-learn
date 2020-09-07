import { Controller, Get } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { Category } from './category.entity'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  public async findAll(): Promise<Category[]> {
    return await this.service.findAll()
  }
}
