import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(
    backend: MockBackend,
    options: BaseRequestOptions) {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoib2N0YWNhdCIsImFkbWluIjp0cnVlfQ.Z5sqL5ErJdaBR9KVwaXOc9Q5Aao6Ae8buMIBy4TsrYw';

    backend.connections.subscribe((connection: MockConnection) => {
        // We are using the setTimeout() function to simulate an 
        // asynchronous call to the server that takes 1 second.
        setTimeout(() => {
            // Fake implementation of /api/authenticate
            if (connection.request.url.endsWith('/api/authenticate') &&
                connection.request.method === RequestMethod.Post) {
                let body = JSON.parse(connection.request.getBody());
                if (body.username === 'octacat' && body.password === 'octacat') {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            status: 200,
                            body: { token: token }
                        })));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }
            // 
            // Fake implementation of /api/orders
            //
            if (connection.request.url.endsWith('/api/orders') &&
                connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: [1, 2, 3] })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }
        }, 1000);
    });
    return new Http(backend, options);
}

export let FakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};