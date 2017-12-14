import CONFIG from '../../config';

// ====

class RecifeApi {
    constructor() {
        this.api_url = CONFIG.API_URL;
        this.resource_id = CONFIG.RESOURCE_ID;
    }

    getAllData() {
        const url = `${this.api_url}?resource_id=${this.resource_id}`;

        const config = {
            method: 'GET'
        };

        return new Promise((resolve, reject) => {
            fetch(url, config)
                .then((result) => result.json())
                .then((data) => resolve(data.result))
                .catch((err) => reject(err))
        });
    }

    getByResourceId(id) {
        const url = `${this.api_url}?resource_id=${id}`;

        const config = {
            method: 'GET'
        };

        return new Promise((resolve, reject) => {
            fetch(url, config)
                .then((result) => result.json())
                .then((data) => resolve(data.result))
                .catch((err) => reject(err))
        });
    }
};

// ====

export default RecifeApi;