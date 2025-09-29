import { Injectable } from '@nestjs/common';

@Injectable()
export class AiSearchService {
  create() {
    return 'This action adds a new aiSearch';
  }

  findAll() {
    return `This action returns all aiSearch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiSearch`;
  }
}
