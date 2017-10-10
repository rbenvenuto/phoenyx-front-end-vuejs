export const apiDomain = 'http://phoenyx.dev'
export const loginUrl = apiDomain + '/oauth/token'
export const userUrl = apiDomain + '/api/user'


/**
 * Adiciona headers específicas para dar a chave token
 */
export const getHeader = function() {
    const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + tokenData.access_token
    }

    return headers
}