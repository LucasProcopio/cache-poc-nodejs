const AWS = require('aws-sdk');

/**
 * @param {Object} container - Dependency Injection.
 * @param {import('src/infra/logging/logger')} container.logger
 * @param {import('config')} container.config
 */
module.exports = ({ logger, config }) => {
    const Sqs = new AWS.SQS({
        apiVersion: config.integration.queues.aws_client.api_version,
        region: config.integration.queues.aws_client.region,
    });

    return {
        async receive(extraParams = {}) {
            try {
                const response = await Sqs.receiveMessage({
                    MaxNumberOfMessages: 10, // max 10
                    WaitTimeSeconds: 1, // max 20
                    ...extraParams,
                }).promise();

                if (!('Messages' in response)) {
                    return [];
                }

                return response.Messages.map(
                    ({ MessageId, ReceiptHandle, Body }) => ({
                        id: MessageId,
                        body: Body,
                        json: JSON.parse(Body),
                        receiptHandle: ReceiptHandle,
                    })
                );
            } catch (err) {
                logger.error(err);
                return err;
            }
        },

        async send(message, extraParams = {}) {
            try {
                const { MessageId } = await Sqs
                    .sendMessage({
                        ...extraParams,
                        MessageBody: JSON.stringify(message),
                    })
                    .promise();

                return MessageId;
            } catch (err) {
                logger.error(err);
                throw err;
            }
        },

        remove(QueueUrl, receiptsHandleArray) {
            return this.removeBatch(QueueUrl, [receiptsHandleArray]);
        },

        async removeBatch(QueueUrl, receiptsHandleArray) {
            if (!receiptsHandleArray || !receiptsHandleArray.length) {
                return false;
            }

            const processed = [];
            const failed = [];

            for (let i = 0; i < receiptsHandleArray.length; i++) {
                const ReceiptHandle = receiptsHandleArray[i];

                const request = Sqs.deleteMessage({
                    QueueUrl,
                    ReceiptHandle,
                });

                try {
                    await request.send();

                    processed.push(ReceiptHandle);
                } catch (err) {
                    failed.push({ message: ReceiptHandle, err });
                    logger.error(err);
                }
            }

            return {
                processed,
                failed,
            };
        },
    };
};
