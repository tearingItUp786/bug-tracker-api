import { tableHelper } from '@utils/db-helpers';

const swim = tableHelper('swim_lanes', [
    'swim_lanes.id',
    'swim_lanes.name',
    'swim_lanes.project_id',
    'swim_lanes.description',
    'swim_lanes.created_at',
    'swim_lanes.updated_at',
]);

const getAllSwimLanes = (project_id: number, userId: number) =>
    swim
        .findAll()
        .where('swim_lanes.project_id', '=', `${project_id}`)
        .innerJoin('user_projects AS up', 'up.id', 'swim_lanes.project_id')
        .andWhere('up.id', '=', userId);

export { getAllSwimLanes };
