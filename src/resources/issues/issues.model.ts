import { tableHelper } from '@utils/db-helpers';
import { RestIssueData } from 'typings';

const issueTable = tableHelper('issues', [
    'issues.id',
    'issues.name',
    'issues.description',
    'issues.severity',
    'issues.created_at',
    'issues.updated_at',
    'issues.url',
    'issues.swim_lane_id',
    'issues.reporter_id',
    'issues.assignee_id',
]);

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

const addOneUserIssue = async (projectData: RestIssueData) => {
    const [added] = await issueTable.addOne(projectData);
    return added;
};

export { getAllUserIssues, getOneUserIssue, addOneUserIssue };
