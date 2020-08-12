const { table } = require("console");

exports.up = function(knex) {
    return knex.schema.createTable('articles', table => {
        table.increments('id')
        table.string('name').notNull()
        table.string('description', 255)
        table.string('imageUrl')
        table.binary('content').notNull()
        table.integer('userId').references('id').inTable('users')
        table.integer('categoryId').references('id').inTable('categories')
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('articles')
};
