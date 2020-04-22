import { kx } from '../../knex';
import { tableHelper } from '../utils/db-helpers';
import { ProjectData, UserProjectData } from '../../types';

const projectTable = tableHelper('projects', ['*']);
const userProjectsTable = tableHelper('user_projects', ['*']);

const query = () =>
    kx
        .select('*')
        .from('user_projects AS up')
        .leftJoin('projects AS p', 'up.project_id', 'p.id')
        .leftJoin('users AS u', 'up.user_id', 'u.id');

export const getProjectsForUser = (id: number) => query().where('u.id', '=', id);

export const getOneProject = (projectId: number, userId: number) =>
    getProjectsForUser(userId).andWhere('p.id', '=', projectId);

export const addOneProject = async (projectData: ProjectData, userId: number) => {
    const [added] = await projectTable.addOne(projectData);
    await userProjectsTable.addOne({ user_id: userId, project_id: added.id });
};
