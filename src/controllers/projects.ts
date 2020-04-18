import { Request, Response } from 'express';
import { kx } from '../../knex';
import { tableHelper } from '../utils/db-helpers';

const projectTable = tableHelper('projects', ['*']);
const userProjectsTable = tableHelper('user_projects', ['*']);

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

export const addOne = async (req: Request, res: Response) => {
    try {
        const [added] = await projectTable.addOne(req.body);
        await userProjectsTable.addOne({ user_id: req.user.id, project_id: added.id });
        res.status(200).json({ data: added });
    } catch (e) {
        console.error(e);
        if (e.code === '23505') {
            res.status(422).send(e.detail);
        }
        res.status(500).send(e.detail);
    }
};
