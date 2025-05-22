import { client as mockClient } from '../mock/mockClient';

// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
export async function client(endpoint, { body, ...customConfig } = {}) {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return mockClient(endpoint, {body, ...customConfig});
    }

    const headers = { 'Content-Type': 'application/json' }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body && body instanceof FormData) {
        config.body = body;
        delete config.headers['Content-Type'];
    } else if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(endpoint, config)
        const text = await response.text()
        return {
            status: response.status,
            data : text.length ? JSON.parse(text) : null,
            headers: response.headers,
            url: response.url,
        };
    } catch (err) {
        return Promise.reject(err?.message)
    }
}

client.get = function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, body })
}

client.put = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'PUT', body });
};

client.delete = function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'DELETE' });
};
