import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { Match } from '../../Interfaces/Match';
import db from '.';

class TeamModel extends Model<InferAttributes<TeamModel>, InferCreationAttributes<TeamModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
  declare homeMatches?: Match[];
  declare awayMatches?: Match[];
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default TeamModel;
