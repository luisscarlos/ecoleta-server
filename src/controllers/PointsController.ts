import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point not found.'});
    }

    // Retorna todos itens relacionados a esse ponto do parâmetro.

    // 01:45

    return response.json(point);
  }

  async create(request: Request, response:Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;
  
    /* Variável transaction do knex para impedir que um insert que depende do outro
       execute, no caso 'point_items' depende de 'insertedIds', e caso algum dos
       inserts deem erro, o outro é desfeito(rollback) para não causar inconsistência no sistema.*/
    const trx = await knex.transaction();

    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };
  
    const insertedIds = await trx('points').insert(point);
  
    // Coleta o ID que foi inserido no DB
    const point_id = insertedIds[0];
  
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      }
    });
  
    // Inserção na tabela de relacionamento NxN 'point_items'
    await trx('point_items').insert(pointItems);
  
    return response.json({ 
      id:point_id,
      ...point,
    });
  }
}

export default PointsController;