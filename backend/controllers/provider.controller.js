const { Provider, User,Category} = require('../models');
const { Sequelize } = require('sequelize');



// Create a provider (Service Listing)
exports.createProvider = async (req, res) => {
    try {
        const newProvider = await Provider.create(req.body);
        res.status(201).json(newProvider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all providers (Viewing Services)
exports.getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.findAll({
            include:[ 
                {
                model: User,
                attributes: ['username'] // only fetch the name
                },
                {
                    model: Category,
                    attributes: ['name'] // pull category name manually
                }
            ],
             attributes: {
    include: [[Sequelize.col('User.username'), 'username'],
              [Sequelize.col('Category.name'), 'category']

]
  }
        });
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get providers by category ID (Filter by Category)
exports.getProvidersByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const providers = await Provider.findAll({
            where: { categoryId }
        });
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update provider (Service Update)
exports.updateProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Provider.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedProvider = await Provider.findByPk(id);
            return res.status(200).json(updatedProvider);
        }
        throw new Error('Provider not found');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete provider (Service Deletion)
exports.deleteProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Provider.destroy({
            where: { id }
        });
        if (deleted) {
            return res.status(200).json({ message: 'Provider deleted successfully' });
        }
        throw new Error('Provider not found');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search providers by name (extra logic)
exports.searchProvidersByName = async (req, res) => {
    try {
        const { name } = req.query;
        const providers = await Provider.findAll({
            where: {
                serviceDescription: { [Op.like]: `%${name}%` }
            }
        });
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
