import Navbar from "../components/navbar";
import Link from "next/link";
import React, {FormEvent} from "react";
import {useRouter} from "next/router";
import {parseInformation} from "../contexts/Utils";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import Head from "next/head";

function Signin({token}) {
    const router = useRouter()
    async function onSubmit(event: FormEvent) {
        event.preventDefault()
        const email = (document.querySelector('#email') as HTMLInputElement)
        const password = (document.querySelector('#password') as HTMLInputElement)
        const values = {"email": email.value, "password": password.value}

        const data = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then((res) => res.json())
        switch (data) {
            case 'User not found':
                email.classList.add('is-invalid')
                password.classList.add('is-invalid')
                break
            case 'Sucessful':
                await router.push('/perfil')
                break
        }
    }

    return (
        <>
            <Head>
                <title>Entrar - Integraliza</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar transparent={false} userInfo={parseInformation(token)}/>
            <section className='col-lg-4 col-md-8 col-10 mx-auto my-5'>
                <h1 className='text-center SF-Pro'>Entre em sua conta</h1>
                <p className='text-center text-secondary'>Desfrute dos incríveis benefícios de uma conta
                    Integraliza.<br></br>Não possui uma conta? <Link href='/signout'><a className='text-decoration-none'>Crie
                        uma.</a></Link>
                </p>
                <form onSubmit={onSubmit}>
                    <div className='col-12 mt-5 px-2'>
                        <div className='col-12 form-floating'>
                            <input
                                name='email'
                                type='email'
                                className='form-control rounded-1 mt-3'
                                id='email'
                                placeholder='nome@exemplo.com'
                                onFocus={clearToolTips}
                                required
                            />
                            <label htmlFor='email' className='text-secondary'>nome@exemplo.com</label>
                        </div>
                        <div className='col-12 form-floating'>
                            <input
                                type='password'
                                className='form-control rounded-1 mt-3'
                                name='password'
                                id='password'
                                placeholder='Senha'
                                pattern='[a-z0-9]{1,15}'
                                onFocus={clearToolTips}
                                required/>
                            <label htmlFor='password' className='text-secondary'>Senha</label>
                            <div className="invalid-feedback">
                                Usuário ou senha não encontrado(s).
                            </div>
                        </div>
                        <button className='col-12 btn btn-primary rounded-3 mt-3'>Entrar</button>
                    </div>
                </form>
            </section>
        </>)
}

function clearToolTips() {
    (document.querySelector('#email') as HTMLInputElement).classList.remove('is-invalid');
    (document.querySelector('#password') as HTMLInputElement).classList.remove('is-invalid');
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['impress.token']: token } = parseCookies(ctx)

    return {
        props: {
            token: (token == null) ? false : token,
        }
    }
}

export default Signin