
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
        username:{
            type: DataTypes.STRING(200),
            unique: true
        },
        password:{
            type: DataTypes.STRING(200)
        },
        name:{
            type: DataTypes.STRING(200)
        }
    },
    {
        tableName: "Users",
        timestamps: false,
    })

    User.associate = models => {
        User.hasMany(models.Todolist,{foreignKey:"user_id"})
    }

    return User;
}