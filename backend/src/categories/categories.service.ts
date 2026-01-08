import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto, userId: string) {
    const category = await this.categoryModel.create({
      ...createCategoryDto,
      userId,
    });
    return category;
  }

  async findAll(userId: string) {
    return this.categoryModel.find({ userId }).sort({ name: 1 }).exec();
  }

  async findOne(id: string, userId: string) {
    const category = await this.categoryModel.findOne({ _id: id, userId }).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, userId: string) {
    const category = await this.categoryModel
      .findOneAndUpdate(
        { _id: id, userId },
        updateCategoryDto,
        { new: true }
      )
      .exec();

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async remove(id: string, userId: string) {
    const category = await this.categoryModel.findOneAndDelete({ _id: id, userId }).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return { message: 'Category deleted successfully' };
  }
}
