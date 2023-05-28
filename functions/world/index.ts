import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '../common/logger';

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    logger.addContext(context);
    logger.info('event', { event });
    const { requestContext, pathParameters, body } = event;

    if (!pathParameters || !pathParameters['id']) {
        logger.error('path parameters not provided');
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: 'unsuccessful'
        };
    }

    const response = JSON.stringify({
        message: 'success',
        id: requestContext.requestId,
        timestamp: Date.now(),
        data: {
            id: pathParameters['id'],
            data: body
        }
    });

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: response
    };
};

export { handler };
