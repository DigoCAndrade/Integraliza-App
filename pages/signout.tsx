import Navbar from "../components/navbar";
import Link from "next/link";
import React, {FormEvent, useEffect} from "react";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import Head from "next/head";
import {Button, Input, Loading, Modal, Spacer, useInput} from "@nextui-org/react";
import {helper, parseInformation, validateCPF, validateEmail, validateName, validatePassword} from '../contexts/Utils'

function Signout({token}) {
    const router = useRouter()
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [emailErrorVisible, setEmailErrorVisible] = React.useState(false)
    const [createdSuccess, setCreatedSuccess] = React.useState(false)
    const [buttonState, setButtonSate] = React.useState({disabled: true, loading: false})
    const {value: nameValue, reset: nameReset, bindings: nameBindings} = useInput("");
    const {value: lastnameValue, reset: lastnameReset, bindings: lastnameBindings} = useInput("");
    const {value: cpfValue, reset: cpfReset, bindings: cpfBindings} = useInput("");
    const {value: emailValue, reset: emailReset, bindings: emailBindings} = useInput("");
    const {value: passwordValue, reset: passwordReset, bindings: passwordBindings} = useInput("");
    const {value: passwordConfirmValue, reset: passwordConfirmReset, bindings: passwordConfirmBindings} = useInput("");

    const firstnameHelper = helper({
        value: values['firstName'],
        validator: validateName,
        errorMessage: "Nome inválido",
        successMessage: "Nome válido"
    })

    const lastnameHelper = helper({
        value: values['lastName'],
        validator: validateName,
        errorMessage: "Nome inválido",
        successMessage: "Nome válido"
    })

    const cpfHelper = helper({
        value: values['cpf'],
        validator: validateCPF,
        errorMessage: "CPF inválido",
        successMessage: "CPF válido"
    })

    const emailHelper = helper({
        value: values['email'],
        validator: validateEmail,
        errorMessage: "E-mail inválido",
        successMessage: "E-mail válido"
    })

    const passwordHelper = helper({
        value: values['password'],
        validator: validatePassword,
        errorMessage: "Senha fraca",
        successMessage: "Senha forte"
    })

    const confirmHelper = helper({
        value: values['confirmPassword'],
        validator: () => (values['password'] === values['confirmPassword']),
        errorMessage: "As senhas não se coincidem",
        successMessage: "Senha confirmada"
    })

    const setButtonDisabled = (value) => {
        setButtonSate({disabled: value, loading: buttonState['loading']})
    }

    const setButtonLoading = (value) => {
        setButtonSate({disabled: buttonState['disabled'], loading: value})
    }

    useEffect(() => {
        if (!validateName(values['firstName']) || !validateName(values['lastName']) || !validateCPF(values['cpf']) || !validateEmail(values['email']) || !validatePassword(values['password']) || values['password'] !== values['confirmPassword']) {
            setButtonDisabled(true)
            return
        }
        setButtonDisabled(false)
    }, [values])

    const openModalError = () => {
        setEmailErrorVisible(true)
    }

    const closeModalError = () => {
        setEmailErrorVisible(false)
    }

    const openModalSuccess = () => {
        setCreatedSuccess(true)
    }

    const closeModalSuccess = () => {
        setCreatedSuccess(false)
    }

    const redirectLogin = async () => {
        await router.push('/signin')
    }

    async function onSubmit(event: FormEvent) {
        event.preventDefault()
        if (!validateName(values['firstName']) || !validateName(values['lastName']) || !validateCPF(values['cpf']) || !validateEmail(values['email']) || !validatePassword(values['password']) || values['password'] !== values['confirmPassword']) return
        setButtonLoading(true)
        const payload = {
            "firstname": values['firstName'],
            "lastname": values['lastName'],
            "cpf": values['cpf'],
            "email": values['email'],
            "password": values['password'],
        }

        const data = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then((res) => res.json())

        setTimeout(async () => {
            setButtonLoading(false)
            if (data['Error'] != null) {
                switch (data['Error']) {
                    case 'User already created':
                        openModalError()
                        break
                }
            } else if (data['Success'] != null) {
                openModalSuccess()
            }
        }, 1000);
    }

    return (
        <>
            <Head>
                <title>Cadastrar - Integraliza</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Navbar transparent={false} userInfo={parseInformation(token)}/>
            <section className='col-lg-5 col-md-8 col-10 mx-auto my-5'>
                <h1 className='text-center SF-Pro'>Crie sua conta Integraliza</h1>
                <p className='text-center text-secondary'>Desfrute dos incríveis benefícios de uma conta
                    Integraliza.<br></br>Já possui uma conta?<Link href='/signin'><a
                        className='text-decoration-none ms-1'>Entre
                        aqui.</a></Link>
                </p>
                <form method='post' onSubmit={onSubmit}>
                    <div className='d-flex'>
                        <Input
                            {...nameBindings}
                            clearable
                            bordered
                            borderWeight='light'
                            onClearClick={nameReset}
                            onChange={(event) => {
                                setValues({
                                    firstName: event.target.value,
                                    lastName: values['lastName'],
                                    cpf: values['cpf'],
                                    email: values['email'],
                                    password: values['password'],
                                    confirmPassword: values['confirmPassword']
                                })
                            }}
                            status={(firstnameHelper.error == null) ? "default" : (firstnameHelper.error) ? "error" : "success"}
                            color={(firstnameHelper.error == null) ? "default" : (firstnameHelper.error) ? "error" : "success"}
                            helperColor={(firstnameHelper.error == null) ? "default" : (firstnameHelper.error) ? "error" : "success"}
                            helperText={firstnameHelper.text}
                            type="text"
                            size='lg'
                            width='50%'
                            label='Nome'
                            placeholder='Digite seu nome'
                        />
                        <Spacer y={1.3}/>
                        <Input
                            {...lastnameBindings}
                            clearable
                            bordered
                            borderWeight='light'
                            onClearClick={lastnameReset}
                            onChange={(event) => {
                                setValues({
                                    firstName: values['firstName'],
                                    lastName: event.target.value,
                                    cpf: values['cpf'],
                                    email: values['email'],
                                    password: values['password'],
                                    confirmPassword: values['confirmPassword']
                                })
                            }}
                            status={(lastnameHelper.error == null) ? "default" : (firstnameHelper.error) ? "error" : "success"}
                            color={(lastnameHelper.error == null) ? "default" : (firstnameHelper.error) ? "error" : "success"}
                            helperColor={(lastnameHelper.error == null) ? "default" : (firstnameHelper.error) ? "error" : "success"}
                            helperText={lastnameHelper.text}
                            type="text"
                            size='lg'
                            width='50%'
                            label='Sobrenome'
                            placeholder='Digite seu sobrenome'
                        />
                    </div>
                    <Spacer y={1.3}/>
                    <Input
                        {...cpfBindings}
                        clearable
                        bordered
                        borderWeight='light'
                        onClearClick={cpfReset}
                        onChange={(event) => {
                            setValues({
                                firstName: values['firstName'],
                                lastName: values['lastName'],
                                cpf: event.target.value,
                                email: values['email'],
                                password: values['password'],
                                confirmPassword: values['confirmPassword']
                            })
                        }}
                        status={(cpfHelper.error == null) ? "default" : (cpfHelper.error) ? "error" : "success"}
                        color={(cpfHelper.error == null) ? "default" : (cpfHelper.error) ? "error" : "success"}
                        helperColor={(cpfHelper.error == null) ? "default" : (cpfHelper.error) ? "error" : "success"}
                        helperText={cpfHelper.text}
                        type="text"
                        size='lg'
                        fullWidth
                        label='CPF'
                        placeholder='000.000.000-00'
                    />
                    <Spacer y={0.5}/>
                    <hr/>
                    <Spacer y={0.5}/>
                    <Input
                        {...emailBindings}
                        clearable
                        bordered
                        borderWeight='light'
                        onClearClick={emailReset}
                        onChange={(event) => {
                            setValues({
                                firstName: values['firstName'],
                                lastName: values['lastName'],
                                cpf: values['cpf'],
                                email: event.target.value,
                                password: values['password'],
                                confirmPassword: values['confirmPassword']
                            })
                        }}
                        status={(emailHelper.error == null) ? "default" : (emailHelper.error) ? "error" : "success"}
                        color={(emailHelper.error == null) ? "default" : (emailHelper.error) ? "error" : "success"}
                        helperColor={(emailHelper.error == null) ? "default" : (emailHelper.error) ? "error" : "success"}
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
                        onClearClick={passwordReset}
                        onChange={(event) => {
                            setValues({
                                firstName: values['firstName'],
                                lastName: values['lastName'],
                                cpf: values['cpf'],
                                email: values['email'],
                                password: event.target.value,
                                confirmPassword: values['confirmPassword']
                            })
                        }}
                        status={(passwordHelper.error == null) ? "default" : (passwordHelper.error) ? "error" : "success"}
                        color={(passwordHelper.error == null) ? "default" : (passwordHelper.error) ? "error" : "success"}
                        helperColor={(passwordHelper.error == null) ? "default" : (passwordHelper.error) ? "error" : "success"}
                        helperText={passwordHelper.text}
                        type="password"
                        size='lg'
                        fullWidth
                        label='Senha'
                        placeholder='Crie uma senha'
                    />
                    <Spacer y={1.3}/>
                    <Input.Password
                        {...passwordConfirmBindings}
                        clearable
                        bordered
                        borderWeight='light'
                        onClearClick={passwordConfirmReset}
                        onChange={(event) => {
                            setValues({
                                firstName: values['firstName'],
                                lastName: values['lastName'],
                                cpf: values['cpf'],
                                email: values['email'],
                                password: values['password'],
                                confirmPassword: event.target.value
                            })
                        }}
                        status={(confirmHelper.error == null) ? "default" : (confirmHelper.error) ? "error" : "success"}
                        color={(confirmHelper.error == null) ? "default" : (confirmHelper.error) ? "error" : "success"}
                        helperColor={(confirmHelper.error == null) ? "default" : (confirmHelper.error) ? "error" : "success"}
                        helperText={confirmHelper.text}
                        type="password"
                        size='lg'
                        fullWidth
                        label='Confirmar Senha'
                        placeholder='Confirme sua senha'
                    />
                    <Spacer y={1.3}/>
                    {!buttonState['loading']
                        ? <Button type='submit' color='primary' disabled={buttonState['disabled']}
                                  css={buttonState['disabled'] ? {
                                      '&:disabled': {
                                          background: 'rgba(52, 152, 219,0.9)',
                                          color: 'white',
                                      }
                                  } : {}} size='lg'
                                  className='d-block w-100'>Criar Conta</Button>
                        : <Button type='submit' color='primary' disabled size='lg' className='d-block w-100'>
                            <Loading type='points' color="currentColor" size="sm"/>
                        </Button>
                    }
                    <Modal
                        closeButton
                        aria-labelledby="modal-title"
                        open={emailErrorVisible}
                        onClose={closeModalError}
                        width='90%'
                        style={{maxWidth: 450 + "px", margin: '0 auto'}}
                    >
                        <Modal.Header>
                            <h2>E-mail já cadastrado</h2>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='text-center'>O e-mail &apos;<span className='text-primary'>{values['email']}</span>&apos; já foi cadastrado, caso não tenha
                                acesso a esta conta <a href='#' className='text-decoration-none'>obtenha ajuda</a>.</p>
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
                        open={createdSuccess}
                        onClose={closeModalSuccess}
                        width='90%'
                        style={{maxWidth: 430 + "px", margin: '0 auto'}}
                    >
                        <Modal.Header>
                            {(values['firstName'] == null) ? <h2> Bem vindo(a)!</h2>
                                : <h2>Bem vindo(a), {values['firstName']}!</h2>}
                        </Modal.Header>
                        <Modal.Body className='px-5'>
                            <p className='text-center'>Sua conta foi criada com sucesso! Agora você só está a um passo
                                de realizar diversas impressões.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button auto rounded color="success" onClick={redirectLogin} className='mx-auto'
                                    icon={<i className='bi bi-person-fill fs-5 mt-1'></i>}>
                                Entrar Agora
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </form>
            </section>
        </>
    )
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

export default Signout