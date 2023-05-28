# Serverless Swagger UI for API Gateway

This stack deploys an automatically built and deployed Swagger UI website with interactive documentation for the API Gateway. 

The API has an endpoint `/openapi` which fetches and renders the Api Gateway's OpenApi spec in json. The API has an endpoint `/swagger` which fetches the Api Gateway's OpenApi spec and interpolates it with html to render Swagger with html.

### Learnings

- Serverless Framework and other deployment tools are not comprehensive enough to create openapi spec automatically.
    - Responses not possble to implement with integrated lambdas.
- No clean way of defining different aspects of the spec and merging into single spec
    - Requests defined in `serverless.yml`
    - Response defined within each function's handler
- Spec json object can be altered before rendering, but there's no way to convert typescript interfaces into OpenApi spec component to merge in object.

### RECOMMENDATION

- develop in a documentation-first fashion with a defined OpenApi spec file that is imported into the Api Gateway on deployment.

## Usage 

### Credentials:
```bash
export AWS_PROFILE=<profile_name>
```

### Install Dependencies:

```bash
yarn run install
```

### Deploy:

```bash
yarn run deploy
```

### Remove:

```bash
yarn run remove
```
