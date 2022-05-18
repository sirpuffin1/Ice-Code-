export const apiService = ({
    baseUrl: 'http://localhost:3001/',
    //create the option to use the apiservice to get information from routes
    get(url) {
        //fetching information from the baseroute + whatever url route we give it
        return fetch(this.baseUrl + url).then(res => res.json())
    }
})