module.exports = (sequelize,Datatypes) =>{
    const Todolist = sequelize.define('Todolist',{
        task:{
            type:Datatypes.STRING(),
            unique:true,
            allowNull:false
        } 
        },{
            tableName:"todolists",
            timestamps:false
    });

    Todolist.associate = models => {
        Todolist.belongsTo(models.User,{foreignKey:"user_id"})
    }

    return Todolist;
}