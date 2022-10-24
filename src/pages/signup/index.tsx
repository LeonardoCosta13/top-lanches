import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import { Input } from '../../pages/components/ui/Input';
import { Button } from '../../pages/components/ui/Button';
import Link from 'next/link';

import logoImg from '../../../public/TopLanches.svg';

export default function SignUp() {
  return (
    <>
    <Head>
      <title>
       Faça seu cadastro agora!
      </title>
    </Head>
      <div className={styles.contanerCenter}>
        <Image src={logoImg} alt="Logo Top Lanches"/>
        <div className={styles.login}>

        <h1>Criando sua conta</h1>

          <form>
            <Input placeholder='Digite seu nome' type='text'/>
            <Input placeholder='Digite seu email' type='text'/>
            <Input placeholder='Digite sua senha' type='password'/>

            <Button
            type="submit"
            loading={false}
            >
              Cadastrar
              </Button>
          </form>

          <Link href="/">
          <a className={styles.text}> Já possui uma conta? Faça o login!</a>
          </Link>

        </div>
      </div>
    </>

  )
}
