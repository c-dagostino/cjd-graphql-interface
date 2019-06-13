const fs = require('fs');

const resolvePaths = (parentPath, items) => {
  return items.reduce((paths, path) => {
    const fullPath = `${parentPath}/${path}`;
    if (fs.lstatSync(fullPath).isDirectory()) {
      const childPaths = resolvePaths(fullPath, fs.readdirSync(fullPath));
      return paths.concat(childPaths);
    } else {
      return paths.concat(fullPath);
    }
  }, []);
};

exports.buildSchema = buildSchema = (schemaFile = '/schema.graphql') => {
  const graphqlDir = __dirname + '/graphqlFD576CB9';
  let files = [];
  const base = graphqlDir + '/base.gql';
  const originalDir = graphqlDir + '/original';
  const newDir = graphqlDir + '/new';
  const d = fs.readdirSync(newDir);
  const o = fs.readdirSync(originalDir);
  files = files.concat(resolvePaths(newDir, d));
  files = files.concat(resolvePaths(originalDir, o));
  schemaFile = graphqlDir + schemaFile;
  let newSchema = fs.readFileSync(base);
  for (var i = 0; i < files.length; i++) {
    const item = files[i];
    if (item[0] === '.') {
      continue;
    }

    const schema = fs.readFileSync(item);
    if (i === 0) {
      newSchema += '\n\n';
    }
    newSchema += schema.toString() + '\n\n';
  }

  fs.writeFileSync(schemaFile, newSchema);
  return schemaFile;
};

buildSchema();
