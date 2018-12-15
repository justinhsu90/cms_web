export default chunkPath => {
  return () =>
    import(/* webpackChunkName: '[request]' */ `@/components/${chunkPath}`);
};
