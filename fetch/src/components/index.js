/**
 *@Author: hy-zhangb
 *Date: 2018/8/24 13:05
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/8/24 13:05
 *Email: lovewinders@163.com
 *File Path: data - index
 *@File Name: index
 *@Description: Description
 */
import {_UUID} from '../utils/tools';

// fetch
class Fetch {
    static defaultConfig = {
        baseUrl: '',
        minorUrl: (url) => url,
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        isForceSuffixHash: false,
        validateStatus: (status) => {

            return status >= 200 && status < 500; // default

        }
    };
    use = (arr, baseUrl) => {

        for(let i = 0; i < arr.length; i++) {

            if(arr[i]()) {

                return arr[i]();

            }

        }
        return baseUrl;

    };
    proxy = url => (reg, {target}) => () => {

        if(new RegExp(reg, 'g').test(url)) {

            return target;

        }
        return false;

    };
    constructor() {

        this.default = Fetch.defaultConfig || {};
        this.interceptors = {
            request: (config) => {

                return config;

            },
            response: (result) => {

                return result;

            }
        };

    }
    // check is formData
    isFormData = (data, headers) => {

        // WorkbenchContainer-Type -> null || multipart/form-data -> formData文件格式
        // return !headers['Content-Type'] || !headers['Content-Type'].indexOf('multipart/form-data') < 0;
        return Object.prototype.toString.call(data) === '[object FormData]' ||
            (headers['Content-Type'] && headers['Content-Type'].indexOf('multipart/form-data') >= 0);

    };
    // single name || multi name file upload
    createFormData = (data) => {

        if(Object.prototype.toString.call(data) === '[object FormData]') return data;
        const formData = new FormData();
        Object.entries(data).forEach(([key, val]) => {

            formData.append(key, val);

        });
        return formData;

    };
    // 对象转换url拼接参数
    transformParsToUrl = (isCheckUrlPars = false, url, par) => {

        const parArr = Object.entries(par).map(([key, v]) => {

            return `${key}=${v}`;

        });
        return parArr.length ? `${url}${isCheckUrlPars ? '&' : '?'}${parArr.join('&')}` : url;

    };
    // 判断url是否传递过来参数
    checkUrlPars = (url) => {

        const reg = /\?/g;
        return reg.test(url);

    };
    // 拦截get请求，后缀加上请求hash，避免get缓存机制导致数据异常
    setUrlHash = (url) => (method) => { // url -> is new transform url

        return method.toUpperCase() === 'GET'
            ? `${url + (this.checkUrlPars(url) ? '&' : '?')}version=${_UUID()}`
            : url;

    };
    minorFnUrl = (url) => {

        const {minorUrl} = this.default;
        return minorUrl(url);

    };
    baseFnUrl = (url, config) => {

        // 是否强制设置hash
        const {baseUrl, isForceSuffixHash} = this.default;
        const {
            params = {},
            method = 'GET'
        } = config;
        // 追加基础url
        const baseUrlFn = Object.prototype.toString.call(baseUrl) === '[object Function]' ? baseUrl(url) : baseUrl;
        const isCheckUrlPars = this.checkUrlPars(url);
        const rUrl = this.transformParsToUrl(isCheckUrlPars, url, params);
        return baseUrlFn + (isForceSuffixHash ? this.setUrlHash(rUrl)(method) : rUrl);

    };
    baseFn = (config) => {

        const {
            data,
            method = 'GET',
            headers,
            baseUrl,
            isForceSuffixHash,
            minorUrl,
            validateStatus,
            ...otherProps
        } = config;
        // 处理content-type or Content-Type
        const {...HeaderProps} = headers;
        const isContentType = HeaderProps.hasOwnProperty('Content-Type') || HeaderProps.hasOwnProperty('content-type');
        if(isContentType) {

            HeaderProps['Content-Type'] = config.headers['content-type'] || config.headers['Content-Type'];
            delete HeaderProps['content-type'];

        }

        // body
        const body = data
            // ? (this.isFormData(data, config.headers) ? data : JSON.stringify(data))
            ? (this.isFormData(data, config.headers) ? this.createFormData(data) : JSON.stringify(data))
            : null;

        return Object.assign({},
            {
                ...otherProps
            },
            {
                method,
                headers: HeaderProps,
                body: method.toUpperCase() !== 'GET' ? body : null
            }
        );
        // return {
        //     method,
        //     headers: HeaderProps,
        //     body: method.toUpperCase() !== 'GET' ? body : null
        // };

    };
    // 请求
    request = (url, config = {}) => {

        const {request, response} = this.interceptors;
        const {headers, ...propsHeaders} = this.default;
        const mergeConfig = Object.assign(
            {},
            // {...propsHeaders},
            {...this.default},
            // {headers: Object.assign({}, {...headers}, {...config.headers})}
            {...config}
        );
        const minorFnUrl = this.minorFnUrl(url);
        const baseFn = this.baseFn(mergeConfig);
        const baseFnUrl = this.baseFnUrl(minorFnUrl, mergeConfig);
        return fetch(baseFnUrl, request(baseFn))
            .then((res) => {

                if(!mergeConfig.validateStatus(res.status)) {// arguments

                    throw new Error(minorFnUrl, res.statusText);

                }
                return res;

            })
            .then(async(res) => {

                const data = await res.json();
                return response({
                    config: this.default,
                    data: data,
                    headers: mergeConfig.headers,
                    request: res,
                    status: res.status,
                    statusText: res.statusText
                });

            })
            .catch(error => {

                console.log(`请求失败：${error}`);

            });

    }
}

// fetchInstance
const fetchInstance = new Fetch();

// createInstance
function createInstance(...args) {

    if(args.length !== 0) {

        return fetchInstance.request(...args);

    }
    return fetchInstance;

}

export default createInstance;
