module.exports={
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        return res.redirect('/auth/login')
    },
    isNotLoggedIn(req, res, next) {
        if (req.isAuthenticated()==false) {
            return next()
        }
        return res.redirect('/dashboard')
    },
    isITdepartamento(req, res, next){
        if (req.user.Tipo==100) {
            return next()
        }
        return res.redirect('/dashboard')
        
    },isRector(req, res, next){
        if (req.user.Tipo==100 || req.user.Tipo==101) {
            return next()
        }
        return res.redirect('/dashboard')
        
    },isCoordinador(req, res, next){
        if (req.user.Tipo==100 || req.user.Tipo==101 || req.user.Tipo==102) {
            return next()
        }
        return res.redirect('/dashboard')
        
    },isSecretario(req, res, next){
        if (req.user.Tipo==100 || req.user.Tipo==101 || req.user.Tipo==102 || req.user.Tipo==103) {
            return next()
        }
        return res.redirect('/dashboard')
        
    },isDocente(req, res, next){
        if (req.user.Tipo==100 || req.user.Tipo==104) {
            return next()
        }
        return res.redirect('/dashboard')
        
    },isEstudiante(req, res, next){
        if (req.user.Tipo==100 || req.user.Tipo==105) {
            return next()
        }
        return res.redirect('/dashboard')
        
    },
}