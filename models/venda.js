module.exports = function(sequelize, DataTypes) {
	const venda = sequelize.define('venda', {
		'data': DataTypes.DATE,
		'vendedor': DataTypes.STRING
	},
	{
		timestamps: false,
		underscored: true
	});

	venda.associate = function (models) {
    	models.venda.belongsToMany(models.produto, { through: 'produtos_venda', timestamps: false });
    }

	return venda;
}