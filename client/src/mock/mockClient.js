import {categoriesResponse, getSelfResponse, loginResponse, productsResponse} from "./mockResponses";

const timeoutMs = 1000;
const respond = (data, timeout = timeoutMs) => new Promise(resolve => {
    if (timeout && timeout <= 0) {
        resolve(data);
    } else {
        setTimeout(() => resolve(data), timeout);
    }
});

const productsPattern = new URLPattern("/api/v1/categories/:id/products", "http://test");
export async function client(endpoint, {body, ...customConfig} = {}) {
    console.log(`Calling '${endpoint}'`, body);
    if (endpoint === '/api/v1/users/self' && customConfig.method === 'GET') {
        return respond(getSelfResponse, 0);
    } else if (endpoint === '/api/v1/auth/login') {
        return respond(loginResponse);
    } else if (endpoint === '/api/v1/categories' && customConfig.method === 'GET') {
        return respond(categoriesResponse);
    } else if (endpoint === '/api/v1/orders') {
        return respond({});
    } else if (productsPattern.test(`http://test${endpoint}`) && customConfig.method === 'GET') {
        return respond(productsResponse);
    }
    return new Promise(resolve => resolve({}));
}
