module.exports = ({ awsClient }) => ({
    send: async data => {
        return awsClient.sendToQueue(data);
    }
});
