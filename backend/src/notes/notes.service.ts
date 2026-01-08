import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from '../schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto, userId: string) {
    const note = await this.noteModel.create({
      ...createNoteDto,
      userId,
    });
    return note;
  }

  async findAll(userId: string, categoryId?: string) {
    const query: any = { userId };
    if (categoryId) {
      query.categoryId = categoryId;
    }
    return this.noteModel
      .find(query)
      .populate('categoryId', 'name color')
      .sort({ updatedAt: -1 })
      .exec();
  }

  async findOne(id: string, userId: string) {
    const note = await this.noteModel
      .findOne({ _id: id, userId })
      .populate('categoryId', 'name color')
      .exec();

    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userId: string) {
    const note = await this.noteModel
      .findOneAndUpdate(
        { _id: id, userId },
        updateNoteDto,
        { new: true }
      )
      .populate('categoryId', 'name color')
      .exec();

    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async remove(id: string, userId: string) {
    const note = await this.noteModel.findOneAndDelete({ _id: id, userId }).exec();
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return { message: 'Note deleted successfully' };
  }
}
