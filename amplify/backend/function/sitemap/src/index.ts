import { APIGatewayProxyHandler, ScheduledHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(`Hello ${event.httpMethod} from a TS Lambda!`),
    };
};
