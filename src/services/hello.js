exports.main = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello! i will read from the table " + process.env.TABLE_NAME }),
  };
};
