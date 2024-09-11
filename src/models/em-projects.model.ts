import {Entity, model, property, belongsTo} from '@loopback/repository';


// settings: {
//   postgresql: {tableName: 'em_projects'},
//   foreignKeys: {
//     fkProjectUserId: {
//       name: 'fk_project_user_id',                      for adding foreign key run once then do it comment
//       entity: 'EmUser',
//       entityKey: 'user_id',
//       foreignKey: 'project_user_id',
//     },
//   },
// },

@model({
  settings: {
    postgresql: {tableName: 'em_projects'},
  },
})
export class EmProjects extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {columnName: 'project_id'},
  })
  projectId: number;

  @property({
    type: 'number',
    postgresql: {columnName: 'project_user_id'},
  })
  projectUserId: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_name'},
  })
  projectName?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_description'},
  })
  projectDescription?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_tech'},
  })
  projectTech?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_status'},
  })
  projectStatus?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'project_start_date'},
  })
  projectStartDate?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'project_deadline_date'},
  })
  projectDeadlineDate?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_lead'},
  })
  projectLead?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_manager'},
  })
  projectManager?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_client'},
  })
  projectClient?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'management_tool'},
  })
  managementTool?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'management_url'},
  })
  managementUrl?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'repo_tool'},
  })
  repoTool?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'repo_url'},
  })
  repoUrl?: string;

  constructor(data?: Partial<EmProjects>) {
    super(data);
  }
}

export interface EmProjectsRelations {
  // describe navigational properties here
}

export type EmProjectsWithRelations = EmProjects & EmProjectsRelations;
