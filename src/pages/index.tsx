import { useContext, FormEvent, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/TopLanches.svg';

import { Input } from '../pages/components/ui/Input';
import { Button } from '../pages/components/ui/Button';

import Link from 'next/link';
import { toast } from 'react-toastify';



import { AuthContext } from '../contexts/AuthContext';

export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('');
  
  const [ loading, setLoading] = useState(false);



  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email ==='' || password === ''){
      toast.warning('Preencha todos os dados!')
      return;
    }

    setLoading(true);

    let data = {
     email,
     password
    }

    await signIn(data);

    setLoading(false);

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
              <Input 
              placeholder='Digite seu email' 
              type='text'
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
              />


            < Input placeholder='Digite sua senha'
             type='password'
             value={password}
             onChange={ (e) => setPassword(e.target.value)}
             />

            <Button
            type="submit"
            loading={loading}
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
