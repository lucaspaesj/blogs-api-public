module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
  });

  UserModel.associate = (models) => {
    UserModel.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'blog_posts',
    });
  };

  return UserModel;
};