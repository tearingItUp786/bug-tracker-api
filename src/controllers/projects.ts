import { Request, Response } from 'express';
import { kx } from '../../knex';

const query = () =>
    kx
        .select('*')
        .from('user_projects AS up')
        .leftJoin('projects AS p', 'up.project_id', 'p.id')
        .leftJoin('users AS u', 'up.user_id', 'u.id')
        .options({ nestTables: true });

export const getAll = async (req: Request, res: Response) => {
    try {
        const projects = await query().where('u.id', '=', req.user.id);
        res.status(200).json({ data: projects });
    } catch (e) {
        console.error(e);
        res.status(500).send('Issue fetching project data');
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) res.send(400).send('Missing id parameter');
        const project = await query().where('u.id', '=', req.user.id).andWhere('p.id', '=', id);
        res.status(200).json({ data: project });
    } catch (e) {
        console.error(e);
        res.status(500).send('Issue fetching project ' + req.params.id);
    }
};
