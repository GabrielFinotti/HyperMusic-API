import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database/postgre_config";
import { LikedMusicsAttributes } from "../types";

class LikedMusics
  extends Model<LikedMusicsAttributes>
  implements LikedMusicsAttributes
{
  declare userId: number;
  declare musicId: number;
}

LikedMusics.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    musicId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "musics",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "liked_musics",
    timestamps: false,
    indexes: [{ fields: ["userId"] }, { fields: ["musicId"] }],
  }
);

export default LikedMusics;
