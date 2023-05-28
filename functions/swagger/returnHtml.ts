import { Spec } from 'swagger-ui-dist';

const swaggerVersion = process.env['SWAGGER_VERSION'] || '4.19.0';

function returnHtml(spec: Spec): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title> Swagger UI </title>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@${swaggerVersion}/swagger-ui.css" >
            <link rel="icon" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@${swaggerVersion}/favicon-32x32.png" />
            ${createStyle()}
        </head>
        <body>
            <div id="swagger-ui"></div>
            ${createScript(spec)}
        </body>
    </html>
  `;
};

function createScript(spec: Spec): string {
    return `
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@${swaggerVersion}/swagger-ui-bundle.js" crossorigin> </script>
    <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@${swaggerVersion}/swagger-ui-standalone-preset.js" crossorigin> </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Load the Swagger UI using the exported API definition
            SwaggerUIBundle({
                spec: ${JSON.stringify(spec)},
                dom_id: '#swagger-ui',
                deepLinking: true,
                tryItOutEnabled: false,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: 'BaseLayout'
            });
        });
    </script>
    `;
};

function createStyle(): string {
    return `
    <style>
        @import url('https://cdn.jsdelivr.net/npm/swagger-ui-dist@${swaggerVersion}/swagger-ui.css');

        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }
            
        *, *:before, *:after {
            box-sizing: inherit;
        }

        body {
            margin: 0;
            background: #fafafa;
        }

        #topbar {
            background-color: #1b1b1b;
            padding: 15px 0;
            color: #fafafa;
            text-align: right;
        }
    </style>
    `
};

export { returnHtml };
