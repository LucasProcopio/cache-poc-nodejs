module.exports = ({ exampleOperation }) => ({
  index: async (req, res) => {
    const { i } = req.query;

    return res.json(await exampleOperation.execute(i));
  }
});
