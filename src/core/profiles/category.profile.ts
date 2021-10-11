import { Category } from './../entities/category';
import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { CategoryDto, SubCategoryDto } from '../Dtos/categoryDto/category.dto';
import { Profile } from 'nestjsx-automapper';

@Profile()
export class CategoryProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Category, CategoryDto).reverseMap();
    mapper.createMap(Category, SubCategoryDto).reverseMap();
  }
}
