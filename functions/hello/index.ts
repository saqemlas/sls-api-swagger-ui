import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '../common/logger';

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    logger.addContext(context);
    logger.info('event', { event });
    const { requestContext } = event;

    const response = JSON.stringify({
        message: 'success',
        id: requestContext.requestId,
        timestamp: Date.now(),
        data: {
            1: 'hello',
            2: 'world'
        }
    });

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: response
    }
};

export { handler };
