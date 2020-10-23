// client.js
const axios = require('axios');
var baseUrl = 'http://localhost';

class Client{

    all(endpoint) {
        var url = `${baseUrl}/${endpoint}`;
        let res = axios.get(url);
        return res;
    }

    get(endpoint, id) {
        var url = `${baseUrl}/${endpoint}/${id}`;
        let res = axios.get(url);
        return res;
    }


    delete(endpoint, id) {
        var url = `${baseUrl}/${endpoint}/${id}`;
        let res = axios.delete(url);
        return res;
    }
     

    post(endpoint, data) {
        var url = `${baseUrl}/${endpoint}`;
       
        //let res = axios.post(url, data);
         let res = axios.post(url, data).then(response => {
               return response;
         }).catch(err => {
              return err;
         });
         return res;
    }

}

const client = new Client();

export default client;
