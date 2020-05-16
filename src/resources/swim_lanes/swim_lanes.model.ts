import { tableHelper } from '@utils/db-helpers';
import { RestSwimInterface } from 'typings';

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
        .andWhere('up.user_id', '=', userId);

const getOneSwimLane = (swimId: number, userId: number) =>
    swim
        .findAll()
        .innerJoin('user_projects AS up', 'up.id', 'swim_lanes.project_id')
        .where('up.user_id', '=', userId)
        .andWhere('swim_lanes.id', '=', swimId);

const addOneSwimLane = async (swimData: RestSwimInterface) => {
    const [added] = await swim.addOne(swimData);
    return added;
};

const updateSwimEntry = async (swimData: RestSwimInterface, swimId: number, userId: number) => {
    const [entry] = await getOneSwimLane(swimId, userId);
    if (entry) {
        const updated = await swim.update(entry.id, swimData);
        return updated;
    }
};

const removeSwimEntry = async (swimId: number, userId: number) => {
    const [entry] = await getOneSwimLane(swimId, userId);
    if (entry) {
        await swim.destroy(swimId);
        return true;
    }

    return false;
};

export { getAllSwimLanes, getOneSwimLane, addOneSwimLane, updateSwimEntry, removeSwimEntry };
