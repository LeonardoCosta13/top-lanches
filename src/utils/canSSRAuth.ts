import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult }  from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenErrors } from '../services/errors/AuthTokenErrors';

// função para paginas que somente users podem ter acesso.

export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (contexto: GetServerSidePropsContext ): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(contexto);

        const token = cookies['@toplanches.token'];

        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try{
            return await fn(contexto);
        }catch(err){
            if(err instanceof AuthTokenErrors){
                destroyCookie(contexto, '@toplanches.token');

                return{
                    redirect:{
                    permanent: false,
                    destination: '/',
                    }
                }
            }
        }

    }

}