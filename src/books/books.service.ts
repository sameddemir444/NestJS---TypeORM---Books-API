import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async create(booksDto: CreateBookDto): Promise<Book> {
    return await this.booksRepository.save(booksDto);
  }

  async deleteBook(id: string): Promise<void> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book not found`);
    }
    await this.booksRepository.delete(id);
  }

  async getOneBook(id: string): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book not found`);
    }
    return book;
  }

  async updateBook(id: string, updateBook: UpdateBookDto): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book not found`);
    }

    await this.booksRepository.update(id, updateBook);
    return this.booksRepository.findOneBy({ id });
  }
}
