import { Request, Response } from 'express';
import { getProjectsForUser, getOneProject, addOneProject } from '../models/projects';

export const getAll = async (req: Request, res: Response) => {
    try {
        const projects = await getProjectsForUser(req.user.id);
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
        const project = await getOneProject(Number(id), req.user.id);
        res.status(200).json({ data: project });
    } catch (e) {
        console.error(e);
        res.status(500).send('Issue fetching project ' + req.params.id);
    }
};

export const addOne = async (req: Request, res: Response) => {
    try {
        const added = await addOneProject(req.body, req.user.id);
        res.status(200).json({ data: added });
    } catch (e) {
        console.error(e);
        if (e.code === '23505') {
            res.status(422).send(e.detail);
        }
        res.status(500).send(e.detail);
    }
};
