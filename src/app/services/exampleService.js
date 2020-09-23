module.exports = ({ exampleClient, exampleFactory }) => ({
  execute: async data => {
    const result = exampleClient.get(data);

    const rightData = exampleFactory.buildPayload(result);

    return rightData;
  }
});
