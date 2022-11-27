import Navbar from "../components/navbar";
import Link from "next/link";
import React, {FormEvent, useEffect} from "react";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import Head from "next/head";
import {Button, Input, Loading, Modal, Spacer, useInput} from "@nextui-org/react";
import {helper, parseInformation, validateEmail, validatePassword} from '../contexts/Utils'

function Signin({token}) {
    const router = useRouter()
    const {value: emailValue, reset: emailReset, bindings: emailBindings} = useInput("");
    const {value: passwordValue, reset: passwordReset, bindings: passwordBindings} = useInput("");
    const [values, setValues] = React.useState({email: '', password: ''});
    const [buttonState, setButtonSate] = React.useState({disabled: true, loading: false})
    const [visibleError, setVisibleError] = React.useState(false);
    const [visibleSuccess, setVisibleSucess] = React.useState(false);
    const [userData, setUserData] = React.useState(null);

    const emailHelper = helper({
        value: values['email'],
        validator: validateEmail,
        errorMessage: "E-mail inválido",
        successMessage: "E-mail válido"
    })

    const passwordHelper = helper({
        value: values['password'],
        validator: validatePassword,
        errorMessage: "Senha inválida",
        successMessage: "Senha válida"
    })

    const openModalError = () => {
        setVisibleError(true)
    }

    const closeModalError = () => {
        setVisibleError(false)
    }

    const openModalSuccess = () => {
        setVisibleSucess(true)
    }

    const closeModalSuccess = () => {
        setVisibleSucess(false)
    }

    useEffect(() => {
        if (!validateEmail(values['email']) || !validatePassword(values['password'])) {
            setButtonSate({disabled: true, loading: buttonState['loading']})
            return
        }

        setButtonSate({disabled: false, loading: buttonState['loading']})
    }, [values])

    const redirectPrint = async () => {
        await router.push('/buy')
    }

    const redirectMyAccount = async () => {
        await router.push('/perfil')
    }

    /* Função para o envio dos dados para o back-end*/
    async function onSubmit(event: FormEvent) {
        event.preventDefault()
        const validEmail = validateEmail(values['email'])
        const validPassword = validatePassword(values['password'])

        if (!validEmail || !validPassword) return

        setButtonSate({disabled: buttonState['disabled'], loading: true})

        const payload = {"email": values['email'], "password": values['password']}

        const data = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then((res) => res.json())

        setTimeout(async () => {
            setButtonSate({disabled: buttonState['disabled'], loading: false})
            if (data['Error'] != null) {
                switch (data['Error']) {
                    case 'User not found':
                        openModalError()
                        break
                }
            } else if (data['Success'] != null) {
                setUserData(data['Success'])
                openModalSuccess()
            }
        }, 1000);
    }

    return (
        <>
            <Head>
                <title>Entrar - Integraliza</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Navbar transparent={false} userInfo={parseInformation(token)}/>
            <section className='col-lg-4 col-md-8 col-10 mx-auto my-5'>
                <h1 className='text-center SF-Pro'>Entre em sua conta</h1>
                <p className='text-center text-secondary'>Desfrute dos incríveis benefícios de uma conta
                    Integraliza.<br></br>Não possui uma conta? <Link href='/signout'><a
                        className='text-decoration-none'>Crie
                        uma.</a></Link>
                </p>
                <form onSubmit={onSubmit}>
                    <div className='col-12 mt-5 px-2'>
                        <Input
                            {...emailBindings}
                            clearable
                            bordered
                            borderWeight='light'
                            onChange={(e) => {
                                setValues({email: e.target.value, password: values['password']})
                            }
                            }
                            onClearClick={emailReset}
                            status={(emailHelper.color == "success") ? "success" : "error"}
                            color={(emailHelper.color == "success") ? "success" : "error"}
                            helperColor={(emailHelper.color == "success") ? "success" : "error"}
                            helperText={emailHelper.text}
                            type="email"
                            size='lg'
                            fullWidth
                            label='E-mail'
                            placeholder='exemplo@email.com'
                        />
                        <Spacer y={1.3}/>
                        <Input.Password
                            {...passwordBindings}
                            clearable
                            bordered
                            borderWeight='light'
                            onChange={(e) => {
                                setValues({email: values['email'], password: e.target.value})
                            }}
                            onClearClick={emailReset}
                            status={(passwordHelper.color == "success") ? "success" : "error"}
                            color={(passwordHelper.color == "success") ? "success" : "error"}
                            helperColor={(passwordHelper.color == "success") ? "success" : "error"}
                            helperText={passwordHelper.text}
                            type="password"
                            size='lg'
                            fullWidth
                            label='Senha'
                            placeholder='Digite a sua senha'
                        />
                        <Spacer y={1.7}/>
                        <div className='col-12'>
                            {!buttonState['loading']
                                ? <Button type='submit' color='primary' disabled={buttonState['disabled']}
                                          css={(buttonState['disabled']) ? {
                                              '&:disabled': {
                                                  background: 'rgba(52, 152, 219,0.9)',
                                                  color: 'white',
                                              }
                                          } : {}} size='lg'
                                          className='d-block w-100'>Entrar</Button>
                                : <Button type='submit' color='primary' disabled size='lg' className='d-block w-100'>
                                    <Loading type='points' color="currentColor" size="sm"/>
                                </Button>
                            }
                            <Modal
                                closeButton
                                aria-labelledby="modal-title"
                                open={visibleError}
                                onClose={closeModalError}
                                width='90%'
                                style={{maxWidth: 450 + "px", margin: '0 auto'}}
                            >
                                <Modal.Header>
                                    <h2>Nenhum usuário encontrado</h2>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className='text-center'>As informações inseridas não correspondem a um usuário
                                        cadastrado no banco de dados.</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button auto flat rounded color="primary" onClick={closeModalError}>
                                        Tentar Novamente
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal
                                preventClose
                                className='pt-4 pb-3'
                                aria-labelledby="modal-title"
                                open={visibleSuccess}
                                onClose={closeModalSuccess}
                                width='90%'
                                style={{maxWidth: 430 + "px", margin: '0 auto'}}
                            >
                                <Modal.Header>
                                    {(userData == null) ? <h2> Olá!</h2>
                                        : <h2>Olá, {userData['firstname']}!</h2>}
                                </Modal.Header>
                                <Modal.Body className='px-5'>
                                    <p className='text-center'>Obrigado por utilizar os nossos serviços, para onde você
                                        deseja ir?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button auto rounded color="error" onClick={redirectPrint} className='mx-auto'
                                            icon={<i className='bi bi-heart-fill mt-1'></i>}>
                                        Imprimir Agora
                                    </Button>
                                    <Button auto rounded color="success" onClick={redirectMyAccount} className='mx-auto'
                                            icon={<i className='bi bi-person-fill fs-5 mt-1'></i>}>
                                        Ir para Minha Conta
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </form>
            </section>
        </>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {['impress.token']: token} = parseCookies(ctx)

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

export default Signin