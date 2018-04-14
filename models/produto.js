module.exports = function(sequelize, DataTypes) {
	const produto = sequelize.define('produto', {
		'descricao': DataTypes.STRING,
		'preco': DataTypes.DECIMAL
	},
	{
		timestamps: false,
		underscored: true
	});

	produto.associate = function (models) {
    	models.produto.belongsToMany(models.venda, { through: 'produtos_venda', timestamps: false });
    }

    return produto;
}