import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { kx } from '../../knex';
import config from '../config';

interface JWTObject {
    id: number;
    iat: number;
    exp: number;
}

export const newToken = (user: any) => {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp,
    });
};

export const verifyToken: (str: string) => Promise<JWTObject> = (token: string) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err);
            const newPayload = payload as JWTObject;
            resolve(newPayload);
        });
    });

export const checkPassword = (user: any, password: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, same) => {
            if (err) reject(err);

            resolve(same);
        });
    });
};

/** Route stuff */
export const signUp = async (req: Request, res: Response) => {
    const { body } = req;
    if (!body.email || !body.password) {
        res.status(400).send({ message: 'Need email and password' });
    }

    try {
        const password = bcrypt.hashSync(body.password, 8);
        const user = await kx('users').insert({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password,
        });
        const token = newToken(user);
        return res.status(201).send({ token });
    } catch (e) {
        return res.status(500).send(e).end();
    }
};

export const signIn = async (req: Request, res: Response) => {
    const { body } = req;
    if (!body.email || !body.password) {
        res.status(400).send({ message: 'Need email and password' });
    }

    const invalid = { message: 'Invalid email and password combination' };

    try {
        const [user] = await kx.select().from('users').where({ email: body.email });
        if (!user) return res.status(401).send(invalid);

        const match = await checkPassword(user, body.password);
        if (!match) return res.status(401).send(invalid);

        const token = newToken(user);
        res.status(200).send({ token });
    } catch (e) {}
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end();
    }

    const token = bearer.split('Bearer ')[1].trim();
    let payload;
    try {
        payload = await verifyToken(token);
    } catch (e) {
        return res.status(401).end();
    }

    const [user] = await kx
        .select('id', 'email', 'first_name', 'last_name', 'created_at', 'updated_at')
        .from('users')
        .where({ id: payload.id });

    if (!user) {
        return res.status(401).end();
    }

    req.user = user;
    next();
};
