import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model<InferAttributes<MatchModel>, InferCreationAttributes<MatchModel>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare homeTeam?: TeamModel;
  declare awayTeam?: TeamModel;
}

MatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default MatchModel;
