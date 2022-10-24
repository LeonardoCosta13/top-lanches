import { useContext, FormEvent } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import { Input } from '../pages/components/ui/Input';
import { Button } from '../pages/components/ui/Button';
import Link from 'next/link';

import logoImg from '../../public/TopLanches.svg';

import { AuthContext } from '../contexts/AuthContext';

export default function Home() {

  const { signIn } = useContext(AuthContext)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email: "algum@teste.com",
      password: "123123"
    }

    await signIn(data);
  }

  return (
    <>
    <Head>
      <title>
        Top Lanches - Faça seu login
      </title>
    </Head>
      <div className={styles.contanerCenter}>
        <Image src={logoImg} alt="Logo Top Lanches"/>
        <div className={styles.login}>

          <form onSubmit={handleLogin}>

            <Input placeholder='Digite seu email' type='text'/>
            <Input placeholder='Digite sua senha' type='password'/>

            <Button
            type="submit"
            loading={false}
            >
              Acessar
              </Button>
          </form>
          <Link href="/signup">
          <a className={styles.text}> Não possui uma conta? Cadrastre-se</a>
          </Link>
        </div>
      </div>
    </>

  )
}
