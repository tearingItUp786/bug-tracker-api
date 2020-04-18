import { kx } from '../../knex';

function tableHelper(tableName: string, selectableProps: string[]) {
    const findAll = (props = selectableProps) => kx.select(props).from(tableName);

    const findWhere = (where: any, props = selectableProps) => findAll(props).where(where);

    const update = (id: number, props: any) =>
        kx.update(props).from(tableName).where({ id }).returning(selectableProps);

    const destroy = (id: number) => kx.del().from(tableName).where({ id });

    const addOne = (props: any) => kx.insert(props).into(tableName).returning(selectableProps);

    return {
        findAll,
        findWhere,
        update,
        destroy,
        addOne,
    };
}

export { tableHelper };
