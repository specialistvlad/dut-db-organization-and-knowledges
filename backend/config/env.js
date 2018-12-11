const { env } = process;
const NODE_ENV = (env.NODE_ENV || 'development').toLowerCase();

module.exports = {
  node_env: NODE_ENV,
  prod: NODE_ENV === 'production',
  dev: NODE_ENV === 'development',
  test: NODE_ENV === 'test',
};
