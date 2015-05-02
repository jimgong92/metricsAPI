var Sequelize = require('sequelize');
var pgsql = require('../db');

var Metric = pgsql.define('metrics', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  metric_id: Sequelize.INTEGER,
  start_date: Sequelize.INTEGER,
  time_range_length: Sequelize.INTEGER,
  value: Sequelize.DECIMAL,
  last_calculated_at: Sequelize.INTEGER,
  end_date: Sequelize.INTEGER,
  createdAt: { type: Sequelize.INTEGER, defaultValue: 0},
  updatedAt: { type: Sequelize.INTEGER, defaultValue: 0}
});

/**
 * Create table if doesn't exist
 */
Metric.sync();

module.exports = Metric;