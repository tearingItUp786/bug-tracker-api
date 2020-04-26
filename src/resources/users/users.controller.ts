import { Request, Response } from 'express';
import { tableHelper } from '../../utils/db-helpers';

const userTable = tableHelper('users', ['id', 'email', 'first_name', 'last_name', 'created_at', 'updated_at']);

export const me = (req: Request, res: Response) => res.status(200).json({ data: req.user });

export const updateMe = async (req: Request, res: Response) => {
    try {
        const [update] = await userTable.update(req.user.id, req.body);
        res.status(200).send(update);
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
};
