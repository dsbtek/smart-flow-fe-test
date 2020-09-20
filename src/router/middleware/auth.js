const auth = require('../../store/modules/auth')
function isLoggedIn ({ next }){
    let authorized = auth.default.getters.authenticated(auth.default.state)
    if(authorized){
        return next({
            name: 'DashboardIndex'
        })
    }

    return next()
}

async function isAuthenticated ({ next }){
    let token = auth.default.getters.authenticated(auth.default.state)
    if(!token){
        return next({
            name: 'Home'
        })
    }
    token = JSON.parse(localStorage.getItem('auth_token'))
    const authorized = await auth.default.actions.confirmToken(token)
    localStorage.setItem('user', JSON.stringify(authorized.data));
    if (authorized.statusText !== 'OK') {
        auth.default.state.token = false
        return next({
            name: 'Home'
        })
    }
    return next()
}

module.exports = { isLoggedIn, isAuthenticated }