export class AuthTokenErrors extends Error{
    constructor(){
        super('Erro na autenticação do token.')
    }
}