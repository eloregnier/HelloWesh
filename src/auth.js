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
        window.location.reload();
    }
}