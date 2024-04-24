import { Knex } from "knex";

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('warehouses', (table) => {
    table.increments('id').primary();
    table.string('warehouse_name').notNullable();
    table.string('address').notNullable();
    table.string('city').notNullable();
    table.string('country').notNullable();
    table.string('contact_name').notNullable();
    table.string('contact_position').notNullable();
    table.string('contact_phone').notNullable();
    table.string('contact_email').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('warehouses');
};
