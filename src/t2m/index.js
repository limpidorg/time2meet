import { requestEndpoint } from "./RequestMapConnect"

class T2MClient {
    constructor({ autoAuth = true } = {}) {
        this.autoAuth = autoAuth
    }

    async request(enpointIdentifier, data = {}, { handleErrors = true, autoAuth = null } = {}) {
        if (autoAuth === null) {
            autoAuth = this.autoAuth
        }
        if (autoAuth) {
            data.token = localStorage.getItem("token")
            data.userId = localStorage.getItem("userId")
        }
        let responseData = await requestEndpoint(
            enpointIdentifier,
            data,
        )
        if (handleErrors) {
            if (responseData.code < 0) {
                try {
                    return await this.handleError(enpointIdentifier, data, responseData)
                } catch (e) {
                    // Reject
                    throw e
                }
            }
        }
        await this.postRequest(enpointIdentifier, data, responseData)
        return responseData
    }

    endpoint(endpointIdentifier, options) {
        return async (data) => {
            return this.request(endpointIdentifier, data, options)
        }
    }
    async handleError(endpointIdentifier, data, responseData) {
        switch (responseData.code) {
            case -200:
                // Token expired
                console.log("Invalid Token")
                break
            default:
                break
        }
        // Default: Not handled.
        throw new Error(responseData.message)


    }

    async postRequest(enpointIdentifier, data, responseData) {
        if (enpointIdentifier === "login") {
            localStorage.setItem("token", responseData.token)
            localStorage.setItem("userId", responseData.userId)
        } else if (enpointIdentifier === "logout") {
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
        }
    }

    async login(email, password) {
        return this.request("login", { email, password })
    }

    async logout() {
        return this.request("logout")
    }
}

const API = new T2MClient()
export {
    T2MClient,
    API
}