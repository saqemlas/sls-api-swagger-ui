import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '../common/logger';
import { getSpecExport } from '../common/getSpecExport';
import { returnHtml } from './returnHtml';

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    logger.addContext(context);
    logger.info('event', { event });
    const { requestContext: { apiId, stage, identity: { sourceIp } }, headers } = event;

    const source = headers['X-Forwarded-For'] || sourceIp;
    const spec = await getSpecExport(apiId, stage, 'json', source);

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: returnHtml(spec)
    }
};

export { handler };
