import axios from 'axios';
const MAGIC_ENDPOINT = 'https://time2meetapis.yyjlincoln.app/science';

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function requestEndpoint(enpointIdentifier, data = {}, {
    maxRetries = 3,
    waitBeforeRetry = 1000,
} = {}) {
    if (data === "") {
        data = {}
    }
    var succeeded = false;
    while (maxRetries >= 0 && succeeded === false) {
        try {
            let formData = new FormData();
            formData.append('endpointIdentifier', enpointIdentifier);
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    formData.append(key, data[key]);
                }
            }
            let response = await axios.post(MAGIC_ENDPOINT, formData);
            succeeded = true;
            return response.data;
        } catch (e) {
            maxRetries--;
            console.error(e);
            await sleep(waitBeforeRetry);
            continue
        }
    }
    throw new Error('Failed to request endpoint.');
}

export {
    requestEndpoint,
}