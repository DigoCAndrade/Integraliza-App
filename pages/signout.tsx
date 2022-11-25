import Navbar from "../components/navbar";
import Link from "next/link";
import React, {FormEvent} from "react";
import {useRouter} from "next/router";
import {parseInformation} from "../contexts/Utils";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import Head from "next/head";

function Signout({token}) {
    const router = useRouter()
    async function onSubmit(event: FormEvent) {
        event.preventDefault()
        const email = (document.querySelector('#email') as HTMLInputElement)
        const password = (document.querySelector('#password') as HTMLInputElement)
        const firstname = (document.querySelector('#firstName') as HTMLInputElement)
        const lastname = (document.querySelector('#lastName') as HTMLInputElement)
        const state = (document.querySelector('#state') as HTMLInputElement)
        const birthdate = (document.querySelector('#birthdate') as HTMLInputElement)
        const values = {"email": email.value, "password": password.value, "firstname": firstname.value, "lastname": lastname.value, "state": state.value, "birthdate": birthdate.value}
        const data = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then((res) => res.json())
        switch (data) {
            case 'Email invalid':
                email.classList.add('is-invalid');
                (document.querySelector('#emailValidation') as HTMLDivElement).innerText = 'Email inválido.'
                break
            case 'Password invalid':
                password.classList.add('is-invalid')
                break
            case 'Firstname invalid':
                firstname.classList.add('is-invalid')
                break
            case 'Lastname invalid':
                lastname.classList.add('is-invalid')
                break
            case 'State invalid':
                state.classList.add('is-invalid')
                break
            case 'Birthdate invalid':
                birthdate.classList.add('is-invalid')
                break
            case 'User already created':
                email.classList.add('is-invalid');
                (document.querySelector('#emailValidation') as HTMLDivElement).innerText = 'Email já cadastrado.'
                break
            case 'User created':
                await router.push('/signin')
                break
        }
    }

    return (
        <>
            <Head>
                <title>Cadastrar - Integraliza</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar transparent={false} userInfo={parseInformation(token)}/>
            <section className='col-lg-5 col-md-8 col-10 mx-auto my-5'>
                <h1 className='text-center SF-Pro'>Crie sua conta Integraliza</h1>
                <p className='text-center text-secondary'>Desfrute dos incríveis benefícios de uma conta
                    Integraliza.<br></br>Já possui uma conta?<Link href='/signin'><a className='text-decoration-none ms-1'>Entre
                        aqui.</a></Link>
                </p>
                <form method='post' className='needs-validation' onSubmit={onSubmit} noValidate>
                    <div className='row col-12 mx-0 mt-md-5 mt-4'>
                        <div className='col-md-6 col-12 form-floating'>
                            <input type='text' className='form-control rounded-1' id='firstName' placeholder='Nome'
                                   required autoFocus onFocus={clearToolTips} onBlur={validInput}/>
                            <label htmlFor='firstName' className='text-secondary ps-4'>Nome</label>
                            <div className="invalid-tooltip">
                                Nome inválido.
                            </div>
                        </div>
                        <div className='col-md-6 col-12 mt-md-0 mt-3 form-floating'>
                            <input type='text' className='form-control rounded-1' id='lastName' placeholder='Sobrenome'
                                  required onFocus={clearToolTips} onBlur={validInput}/>
                            <label htmlFor='lastName' className='text-secondary ps-4'>Sobrenome</label>
                            <div id="lastnameValidation" className="invalid-tooltip">
                                Sobrenome inválido.
                            </div>
                        </div>
                    </div>
                    <div className='col-12 mt-3 px-2'>
                        <label htmlFor='state' className='text-secondary SF-Pro'>REGIÃO</label>
                        <select className="form-select py-3 rounded-1" id="state" onFocus={clearToolTips} onBlur={validInput} required>
                            <option value="1">São Paulo</option>
                            <option value="2">Rio de Janeiro</option>
                            <option value="3">Minas Gerais</option>
                        </select>
                        <div id="stateValidation" className="invalid-tooltip">
                            Estado inválido.
                        </div>
                        <div className='col-12 form-floating'>
                            <input type='date' className='form-control rounded-1 mt-3' id='birthdate'
                                   placeholder='Data de Nascimento' onFocus={clearToolTips} onBlur={validInput} required/>
                            <label htmlFor='birthdate' className='text-secondary'>Data de Nascimento</label>
                            <div id="birthdateValidation" className="invalid-tooltip">
                                Data de Nascimento inválida.
                            </div>
                        </div>
                        <hr></hr>
                        <div className='col-12 form-floating'>
                            <input type='email' className='form-control rounded-1 mt-3' id='email'
                                   placeholder='nome@exemplo.com' onFocus={clearToolTips} onBlur={validInput} required/>
                            <label htmlFor='email' className='text-secondary'>nome@exemplo.com</label>
                            <div id="emailValidation" className="invalid-tooltip">
                                Email inválido.
                            </div>
                        </div>
                        <div className='col-12 form-floating'>
                            <input type='password' className='form-control rounded-1 mt-3' id='password'
                                   placeholder='Senha' pattern='[a-z0-9]{1,15}' onFocus={clearToolTips} onBlur={validInput} required/>
                            <label htmlFor='password' className='text-secondary'>Senha</label>
                            <div id="passwordValidation" className="invalid-tooltip">
                                Senha inválida.
                            </div>
                        </div>
                        <div className='col-12 form-floating'>
                            <input type='password' className='form-control rounded-1 mt-3' id='confirmPassword'
                                   placeholder='Confirmar senha' pattern='[a-z0-9]{1,15}' onFocus={clearToolTips} onBlur={validInput}
                                   required/>
                            <label htmlFor='confirmPassword' className='text-secondary'>Confirmar senha</label>
                            <div id="passwordConfirmValidation" className="invalid-tooltip">
                                As senhas não se coincidem.
                            </div>
                        </div>
                        <button className='col-12 btn btn-primary rounded-3 mt-3'>Criar conta</button>
                    </div>
                </form>
            </section>
        </>
)
}

function clearToolTips() {
    const active = (document.activeElement as HTMLInputElement)
    active.classList.remove('is-invalid')
    active.classList.remove('is-valid')
}

const validInput = event => {
    const active = (event.target as HTMLInputElement)
    switch (active.id) {
        case 'firstName':
            if (active.value == null || active.value.length < 5 || active.value.length > 16) {
                active.classList.add('is-invalid')
            }else active.classList.add('is-valid')
            break
        case 'lastName':
            if (active.value == null || active.value.length < 5 || active.value.length > 16) {
                active.classList.add('is-invalid')
            }else active.classList.add('is-valid')
            break
        case 'state':
            if (active.value == null) {
                active.classList.add('is-invalid')
            }else active.classList.add('is-valid')
            break
        case 'birthdate':
            if (active.value == null || !active.value.includes('-')) {
                active.classList.add('is-invalid')
            }else active.classList.add('is-valid')
            break
        case 'email':
            if (active.value == null || !active.value.includes('@') || (!active.value.endsWith('.com') && !active.value.endsWith('.br') && !active.value.endsWith('.net'))) {
                active.classList.add('is-invalid');
                (document.querySelector('#emailValidation') as HTMLDivElement).innerText = 'Email inválido.'
            }else active.classList.add('is-valid')
            break
        case 'password':
            if (active.value == null || active.value.length < 8) {
                active.classList.add('is-invalid')
            }else active.classList.add('is-valid')
            break
        case 'confirmPassword':
            if (active.value !== (document.querySelector('#password') as HTMLInputElement).value) {
                active.classList.add('is-invalid')
            }else active.classList.add('is-valid')
            break
    }
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['impress.token']: token } = parseCookies(ctx)

    if (token) {
        return {
            redirect: {
                destination: '/perfil',
                permanent: false,
            }
        }
    }

    return {
        props: {
            token: (token == null) ? false : token,
        }
    }
}

export default Signout