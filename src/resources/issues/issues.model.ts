import { tableHelper } from '@utils/db-helpers';

const issueTable = tableHelper('issues', ['*']);

const query = (userId: number) =>
    issueTable
        .findAll()
        .innerJoin('swim_lanes as sl', 'issues.swim_lane_id', 'sl.id')
        .innerJoin('user_projects as up', 'up.id', 'sl.project_id')
        .andWhere('up.user_id', '=', userId);

const getAllUserIssues = async (projectId: number, userId: number) => {
    const issues = await query(userId).andWhere('sl.project_id', '=', projectId);
    return issues;
};

const getOneUserIssue = async (projectId: number, userId: number, issueId: number) => {
    const [issue] = await query(userId).andWhere('sl.project_id', '=', projectId).andWhere('issues.id', '=', issueId);
    return issue;
};

export { getAllUserIssues, getOneUserIssue };
