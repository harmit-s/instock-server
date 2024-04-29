import knex from 'knex';
/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('inventories', (table) => {
    table.increments('id').primary();
    table.integer('warehouse_id').unsigned()
        .references('id').inTable('warehouses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    table.string('item_name').notNullable();
    table.string('description').notNullable();
    table.string('category').notNullable();
    table.string('status').notNullable();
    table.integer('quantity').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('inventories');
};
