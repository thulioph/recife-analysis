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

    getByResourceId(year) {
        let resource_id;

        if (year === '2013') {
            resource_id = '52e7ed1f-440b-48a2-8583-819e3283dc62';
        } else if (year === '2014') {
            resource_id = '0a77e23d-6e6d-436f-a627-6f5869530cc1';
        } else if (year === '2015') {
            resource_id = '350aebb7-9d3c-4171-b732-b3f62877cb85';
        } else if (year === '2016') {
            resource_id = '6b6db995-135a-4b33-b5ca-6215311f0cff';
        }

        const url = `${this.api_url}?resource_id=${resource_id}`;

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