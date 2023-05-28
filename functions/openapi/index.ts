import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '../common/logger';
import { getSpecExport } from '../common/getSpecExport';

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    logger.addContext(context);
    logger.info('event', { event });
    const { requestContext: { apiId, stage, identity: { sourceIp } }, headers} = event;

    const source = headers['X-Forwarded-For'] || sourceIp;
    const header = headers['content-type'] || headers['Content-Type'];
    const type = (header || '').split('/')[1] || 'json';
    const spec = await getSpecExport(apiId, stage, type, source);

    return {
        statusCode: 200,
        headers: { 'Content-Type': `application/${type}` },
        body: JSON.stringify(spec)
    }
};

export { handler };
