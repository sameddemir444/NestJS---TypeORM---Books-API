import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.booksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBooks(@Body() booksDto: CreateBookDto): Promise<Book> {
    return await this.booksService.create(booksDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return await this.booksService.deleteBook(id);
  }

  @Get(':id')
  async getOneBook(@Param('id') id: string): Promise<Book> {
    return await this.booksService.getOneBook(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBook: UpdateBookDto,
  ): Promise<Book> {
    return await this.booksService.updateBook(id, updateBook);
  }
}
