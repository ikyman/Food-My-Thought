/* What is the point of this & This function?
 * It was origionally born of my CSRF Struggles. But the Cookies set by CSRP are HttpOnly cookies,
 * Unable to be read by Javascript. I repeat, Unable to be read by Javascript!
 * (This function attempts to read a cookie with Javascript)
 * 
 * There's a Django setting for this HttpOnly/Javascript readability conundrum.
 * From It's documentation: "There aren’t many good reasons for turning this off.
 * Your code shouldn’t read session cookies from JavaScript."
 * 
 * Again, Why does this function exist? It may be neat if I ever need front-end cookies, but I don't currently forsee such a use.
 */

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrfCookieToken = getCookie('csrftoken');

export default csrfCookieToken;