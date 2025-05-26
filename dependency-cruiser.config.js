module.exports = {
    options: {
      outputType: "dot",
      outputTo: "dependency-graph.dot",
      exclude: {
        path: "node_modules|\\.test\\.jsx?$"
      },
      enhancedResolveOptions: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  };
