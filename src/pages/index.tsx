import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import { Input } from '../pages/components/ui/Input';
import { Button } from '../pages/components/ui/Button';
import Link from 'next/link';

import logoImg from '../../public/TopLanches.svg';

export default function Home() {
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
          <form>
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
