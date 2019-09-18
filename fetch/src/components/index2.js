/**
 *@Author: mll
 *Date: 2018/6/28 17:01
 *@Last Modified by: mll
 *@Last Modified time: 2018/6/28 17:01
 *Email: maliangliang@hiynn.com
 *File Path: message - fetch
 *@File Name: fetch
 *@Description:
 */

class Fetch {
    static defaultConfig = {
        baseUrl: '',
        headers: {
            Authorization: '',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    constructor() {

        this.default = Fetch.defaultConfig || {};
        this.interceptors = {
            request: function(config) {

                return config;

            },
            response: function(result) {

                return result;

            }
        };

    }

    isFormData(headers) {

        return !headers['Content-Type'] || !headers['Content-Type'].indexOf('multipart/form-data') < 0;

    }

    checkStatus(response) {

        if(response.status >= 200 && response.status < 300) {

            return response;

        }
        let error = new Error(response.statusText);
        error.response = response;
        throw error;

    }

    parseParams(url, {headers, data, params, ...config}) {

        const contentType = headers['content-type'] || headers['Content-Type'];
        delete headers['content-type'];
        const combinHeaders = Object.assign(
            {},
            {...this.default.headers},
            (headers || {}),
            (contentType ? {'Content-Type': contentType} : {})
        );

        let fullUrl = this.default.baseUrl + url;
        let fullConfig = {};
        // get, delete, .. etc.
        if(params) {

            const entries = Object.entries(params).map(([key, value]) => {

                return `${key}=${value}`;

            });

            fullUrl = `${fullUrl}?${entries.join('&')}`;

        }

        // post, put, ..etc;
        if(data) {

            if(!this.isFormData(combinHeaders)) {

                fullConfig = Object.assign(
                    fullConfig,
                    {
                        headers: combinHeaders,
                        body: JSON.stringify(data)
                    }
                );

            } else {

                fullConfig = new FormData();
                Object.entries(params).map(([key, value]) => {

                    fullConfig.append(key, value);

                });

            }

        }

        return {
            fullUrl,
            fullConfig: Object.assign(fullConfig, {...config})
        };

    }

    /**
     * config: {params: {}, ...}
     */
    request(url, config) {

        const {request, response} = this.interceptors;

        let {fullUrl, fullConfig} = this.parseParams(url, config);

        fullConfig = request(fullConfig);

        return fetch(fullUrl, fullConfig)
            .then(this.checkStatus)
            .then(res => res.json())
            .then(res => response(res))
            .catch(error => {

                console.log(`请求失败：${error}`);

            });

    }
}

export default new Fetch();
