const token = import.meta.env.VITE_APP_API_TOKEN
import auth from '../auth';

export function getItem(callback) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'api_key': token
        },
    };

    return fetch('https://d1-kv.utop.workers.dev/' + auth.getToken(), options)
        .then(response => {
            return response.json();
        })
}

export function setItem(content, callback) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'api_key': token
        },
        body: JSON.stringify(content)
    };

    return fetch('https://d1-kv.utop.workers.dev/' + namespace, options)
        .then(response => {
            return response.json();
        })

}
