import { Request, Response} from 'express';
import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) { 
    // Seleciona tudo na tabela items do banco de dados
    const items = await  knex('items').select('*'); 
  
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });
    return response.json(serializedItems);
  }
}

export default ItemsController;

// Service Pattern
// Repository Pattern (Data Mapper)