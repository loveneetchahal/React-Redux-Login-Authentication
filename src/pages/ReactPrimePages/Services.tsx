export class Services {
    getCountries() {
        return fetch('data/countries.json').then(res => res.json())
            .then(d => d.data);
    }
}