
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
 import { AuthTokenErrors } from '../services/errors/AuthTokenErrors';
 //'../services/errors/AuthTokenError'


//funcao para paginas que só users logados podem ter acesso.
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);    

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
      return await fn(ctx);
    }catch(err){
      if(err instanceof AuthTokenErrors ){
        destroyCookie(ctx, '@toplanches.token');

        return{
          redirect:{
            destination: '/',
            permanent: false
          }
        }

      }
    }


  }

}