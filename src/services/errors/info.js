
class infoErrorGenerator{
    emailNotFound({email} ){
        return `No se encontró el email ${email}, debe registrarse.`
    }
}

module.exports = infoErrorGenerator
