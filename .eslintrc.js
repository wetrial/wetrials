module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'no-plusplus': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    'no-return-await': 0,
    'no-template-curly-in-string': 0,
    'no-console': ['error'],
  },
};
