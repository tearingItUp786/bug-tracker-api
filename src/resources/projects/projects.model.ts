import { kx } from '../../../knex';
import { tableHelper } from '../../utils/db-helpers';
import { ProjectData, UserProjectData } from '../../../types';
import { AppError } from '../../utils/AppError';
import { UNPROCESSABLE_ENTITY } from 'http-status-codes';

const projectTable = tableHelper('projects', ['*']);
const userProjectsTable = tableHelper('user_projects', ['*']);

const query = () =>
    kx
        .select('p.id', 'p.created_at', 'p.updated_at', 'p.name', 'p.url', 'u.id as user_id')
        .from('projects AS p')
        .leftJoin('user_projects AS up', 'up.project_id', 'p.id')
        .leftJoin('users AS u', 'up.user_id', 'u.id');

const getProjectsForUser = (id: number) => query().where('u.id', '=', id);

const getOneProject = (projectId: number, userId: number) =>
    getProjectsForUser(userId).andWhere('p.id', '=', projectId);

const findProjectByName = (name: string) => query().where('p.name', '=', name);

const addOneProject = async (projectData: ProjectData, userId: number) => {
    const [added] = await projectTable.addOne(projectData);
    await userProjectsTable.addOne({ user_id: userId, project_id: added.id });
    return added;
};

const updateOneProject = async (projectId: number, projectData: ProjectData) => {
    const [updated] = await projectTable.update(projectId, projectData);
    return updated;
};

export { getProjectsForUser, getOneProject, addOneProject, updateOneProject, findProjectByName };
