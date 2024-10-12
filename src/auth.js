export default {
    login: () => {
        if (!localStorage.getItem('token')) {
            let token = prompt('Quel est ton nom ? (il sera utilisé pour te reconnaître et retrouver tes recettes)');
            token = token.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ /g, '_').replace(/\.\./g, '').trim();
            if (token) {
                localStorage.setItem('token', token);
            } else {
                alert('Tu dois renseigner un nom pour créer ton espace de recettes');
                window.location.reload();
            }
        }
    },
    getToken: () => {
        return localStorage.getItem('token');
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('reciepeToken');
        window.location.reload();
    },
    askReciepeToken: () => {
        if (!localStorage.getItem('reciepeToken')) {
            let token = prompt('Quel est le mot de passe pour accéder aux recettes ?');
            if (token) {
                localStorage.setItem('reciepeToken', token);
            } else {
                alert('Tu dois renseigner un mot de passe pour accéder aux recettes');
                window.location.reload();
            }
        }
    },
    getReciepeUrl(reciepeNumber) {
        const token = localStorage.getItem('reciepeToken');
        return `https://hellowesh-file-proxy.utop.workers.dev?apikey=${token}&item=${reciepeNumber}`
    }
}