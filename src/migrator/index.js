const { Migrator, helpers } = require('@sightbox-engineering/orm');
const { logger } = require('@sightbox-engineering/utils');

exports.handler = async message => {
  let mirgator;
  const dialect = message.dialect || 'mysql';
  if (dialect === 'mssql') {
    const config = helpers.getMssqlConfig(process.env);
    migrator = new Migrator(dialect, config);
  } else {
    migrator = new Migrator(dialect);
  }

  try {
    if (message.rebuild) {
      await migrator.dbRefresh();
    } else {
      await migrator.migrate();
    }
    return 'success';
  } catch (err) {
    logger.log(err, 'error', 'migrations', 'graphql-interface');
    return err;
  }
};
