import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult }  from 'next';
import { parseCookies } from 'nookies';
 
// função para paginas que só pode ser acessados por visitantes

export function canSSRGuest<P>(fn: GetServerSideProps<P>){

    return async (contexto: GetServerSidePropsContext ): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(contexto);

        if(['@toplanches.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        // se o cara tentar acessar a pagina tendo ja um login salvo redirecionamos
        return await fn(contexto);
    }
}