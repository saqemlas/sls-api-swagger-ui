import { 
    APIGatewayClient, 
    GetExportCommand, 
    GetExportCommandInput, 
    GetExportCommandOutput
} from '@aws-sdk/client-api-gateway';
import { Spec } from 'swagger-ui-dist';
import { logger } from './logger';

const api = new APIGatewayClient({ region: process.env['AWS_REGION'] || '' });

async function getSpecExport(restApiId: string, stageName: string, type: string, source: string): Promise<Spec> {
    const input: GetExportCommandInput = {
        restApiId,
        stageName,
        exportType: 'oas30',
        accepts: `application/${type}`,
    };

    const response: GetExportCommandOutput = await api.send(new GetExportCommand(input));

    if (!response.body) {
        throw new Error('No documentation body received from api export');
    }

    const spec = decodeUint8Array(response.body);

    // Remove variable basePath and fix url
    spec['servers'].forEach((server: { url: string, variables?: { basePath: { default: string } } }) => {
        server.url = server.url.replace('{basePath}', server.variables!.basePath.default);
        delete server.variables;
    });

    // remove documentation paths from documentation
    delete spec['paths']['/swagger'];
    delete spec['paths']['/openapi'];

    // add description
    spec['info']['description'] = `${source} accessing Swagger documentation`;

    logger.info('spec', spec);

    return spec;
};

const decodeUint8Array = (uint8Array: Uint8Array): Spec => {
    return JSON.parse(Buffer.from(uint8Array).toString('utf-8'));
};

export { getSpecExport };
