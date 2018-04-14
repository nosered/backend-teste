module.exports = function(sequelize, DataTypes) {
	const cliente = sequelize.define('cliente', {
		'nome': DataTypes.STRING
	},
	{
		timestamps: false,
		underscored: true
	});

	cliente.associate = function (models) {
    	models.cliente.hasMany(models.venda, { onDelete: "CASCADE" });
    }

    return cliente;
}