import axios from 'axios';
const leading = 'http://104.255.220.102:8000';
export function makeRequest({method, url, data} ) {
    return new Promise(function (resolve, reject) {
        try {
            axios({
                method : method,
                url: `${leading}${url}`, 
                data: data  
              }).then(function (res) {
                  resolve(res);
              }).catch(function(err){
                  reject(err);
              });
        } catch (error) {
            reject(error)
        }
    })
}
// module.exports = {
//     makeRequest : makeRequest
// }