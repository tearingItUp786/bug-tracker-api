import { tableHelper } from '@utils/db-helpers';
import { UserInterface } from 'typings';

const userTable = tableHelper('users', ['id', 'email', 'first_name', 'last_name', 'created_at', 'updated_at']);

const updateUser = async (id: number, body: UserInterface) => {
    const [update] = await userTable.update(id, body);
    return update;
};

export { updateUser };
