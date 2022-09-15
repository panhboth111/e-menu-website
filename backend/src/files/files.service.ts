import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { extname } from 'path/posix';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  async create(file: Express.Multer.File) {
    try {
      const filename = this.generateFilename(file.originalname);
      const ws = fs.createWriteStream(`./uploads/${filename}`);
      ws.write(file.buffer);
      const done = await ws.on('close', (s) => true);
      return {
        statusCode: 201,
        msg: 'File uploaded',
        data: filename,
      };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(filename: string) {
    try {
      return fs.unlink(`./uploads/${filename}`, (err) => {
        if (err) throw err;
        return {
          statusCode: 201,
          msg: 'Deleted successfully',
          data: null,
        };
      });
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
  private generateFilename(originalName: string) {
    // Generating a 32 random chars long string
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${randomName}${extname(originalName)}`;
  }
}
