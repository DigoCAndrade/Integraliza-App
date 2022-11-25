import Navbar from "../components/navbar";
import Style from "../styles/perfil.module.css"
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import jwt from "jsonwebtoken";
import {parseInformation} from "../contexts/Utils";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import {Popover, Avatar, Button, Badge, Modal, Text} from "@nextui-org/react";

function Perfil(props) {
    const [avatar, setAvatar] = React.useState(props.avatar);
    const [visible, setVisible] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    function changeAvatar(e) {
        setAvatar(e.target.src)
    }

    const close = () => {
        setAvatar(props.avatar)
        setIsOpen(false)
    }

    const closeSaving = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Head>
                <title>Meu Perfil - Integraliza</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar transparent={false} userInfo={parseInformation(props.token)}/>
            <section className="mx-auto pb-5 col-md-10 col-11 mt-lg-5 d-flex flex-lg-row flex-column justify-content-lg-evenly align-items-lg-start align-items-center">
                <div className="col-lg-3 col-8 mt-5 text-lg-start text-center">
                    <h2 className="mb-lg-3 mb-4 h2">Configurações</h2>
                    <ul className="w-100 nav">
                        <li className="nav-item w-100">
                            <a href="#"
                               className="my-1 nav-link bg-dark bg-opacity-10 rounded-5 text-black fw-bold text-start">Conta</a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex flex-column col-lg-8 col-12 bg-white shadow-lg mt-5 rounded-3 p-5 h-100">
                    <h1>Minha Conta</h1>
                    <fieldset
                        className="border border-secondary border-opacity-25 border-top-0 border-start-0 border-end-0 py-4">
                        <legend className="h5">Avatar</legend>
                        <div className='col-12 d-flex flex-lg-row flex-column align-items-center justify-content-start'>
                            <Popover isOpen={isOpen} onOpenChange={setIsOpen} onClose={close} placement='bottom'>
                                <Popover.Trigger>
                                    <div className={Style.userImage}>
                                        <Badge color="default" content={<i className="bi bi-caret-down-fill" style={{padding: 0.1 + "rem"}}></i>} placement='bottom-right' horizontalOffset="20%">
                                            <Image src={avatar} className="rounded-pill" alt='' height={100 + '%'} width={100 + '%'}/>
                                        </Badge>
                                    </div>
                                </Popover.Trigger>
                                <Popover.Content className='p-5 shadow-lg col-lg-4 col-8' style={{backgroundColor: "#g8g8g8"}}>
                                    <h2 className='text-center h3'>Escolha um avatar</h2>
                                    <div className='col-12 d-flex flex-row flex-wrap justify-content-around align-items-center'>
                                        <Avatar
                                            size="xl"
                                            src="https://cdn-icons-png.flaticon.com/512/4526/4526437.png"
                                            color="primary"
                                            className='border-0 m-3'
                                            onClick={changeAvatar}
                                            zoomed
                                            pointer
                                        />
                                        <Avatar
                                            size="xl"
                                            src="https://cdn-icons-png.flaticon.com/512/4526/4526236.png"
                                            color="primary"
                                            className='border-0 m-3'
                                            onClick={changeAvatar}
                                            zoomed
                                            pointer
                                        />
                                        <Avatar
                                            size="xl"
                                            src="https://cdn-icons-png.flaticon.com/512/4526/4526301.png"
                                            color="primary"
                                            className='border-0 m-3'
                                            onClick={changeAvatar}
                                            zoomed
                                            pointer
                                        />
                                        <Avatar
                                            size="xl"
                                            src="https://cdn-icons-png.flaticon.com/512/4526/4526194.png"
                                            color="primary"
                                            className='border-0 m-3'
                                            onClick={changeAvatar}
                                            zoomed
                                            pointer
                                        />
                                        <Avatar
                                            size="xl"
                                            src="https://cdn-icons-png.flaticon.com/512/4526/4526308.png"
                                            color="primary"
                                            className='border-0 m-3'
                                            onClick={changeAvatar}
                                            zoomed
                                            pointer
                                        />
                                        <Avatar
                                            size="xl"
                                            src="https://cdn-icons-png.flaticon.com/512/4526/4526244.png"
                                            color="primary"
                                            className='border-0 m-3'
                                            onClick={changeAvatar}
                                            zoomed
                                            pointer
                                        />
                                        <Avatar
                                            size="xl"
                                            src="https://cdn-icons-png.flaticon.com/512/4526/4526281.png"
                                            color="primary"
                                            className='border-0 m-3'
                                            onClick={changeAvatar}
                                            zoomed
                                            pointer
                                        />
                                        <Avatar
                                            size="xl"
                                            src="https://cdn-icons-png.flaticon.com/512/4526/4526201.png"
                                            color="primary"
                                            className='border-0 m-3'
                                            onClick={changeAvatar}
                                            zoomed
                                            pointer
                                        />
                                    </div>
                                    <Button size='sm' className='ms-auto me-lg-0 me-auto mt-3' ghost onClick={closeSaving}>Salvar</Button>
                                </Popover.Content>
                            </Popover>
                        </div>
                    </fieldset>

                    <fieldset className="border border-secondary border-opacity-25 border-top-0 border-start-0 border-end-0 py-4">
                        <div className="d-flex flex-lg-row flex-column justify-content-between">
                            <div className="col-lg-6 col-12 mt-lg-0 mt-3">
                                <div className="d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-between">
                                    <label htmlFor="fullname">Nome</label>
                                    <p className="mb-0 text-secondary text-opacity-75">Visível para todos</p>
                                </div>
                                <input type="text" placeholder={props.firstname} className="form-control" id="fullname"/>
                            </div>
                            <div className="col-lg-5 col-12 mt-lg-0 mt-3">
                                <div className="d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-between">
                                    <label htmlFor="username">Sobrenome</label>
                                    <p className="mb-0 text-secondary text-opacity-75">Visível apenas para você</p>
                                </div>
                                <input type="text" placeholder={props.lastname} className="form-control" id="username"/>
                            </div>
                        </div>

                        <div className="d-flex flex-lg-row flex-column justify-content-between mt-4">
                            <div className="col-lg-6 col-12">
                                <div className="d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-between">
                                    <label htmlFor="email">E-mail</label>
                                    <p className="mb-0 text-secondary text-opacity-75">Para autenticação e
                                        notificação</p>
                                </div>
                                <input type="email" placeholder={props.email}
                                       className="form-control" id="email"/>
                            </div>
                            <div className="col-lg-5 col-12 mt-lg-0 mt-3">
                                <div className="d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-between">
                                    <label htmlFor="password">Senha</label>
                                    <p className="mb-0 text-secondary text-opacity-75">Para autenticação</p>
                                </div>
                                <input type="password" className="form-control" id="password"/>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset
                        className="py-4 border border-secondary border-opacity-25 border-top-0 border-start-0 border-end-0 d-flex flex-lg-row flex-column justify-content-between">
                        <div>
                            <p className="mb-0">Deletar conta</p>
                            <p className="mb-0 text-secondary text-opacity-75">Ao deletar a conta todos os dados serão
                                perdidos.</p>
                            <Modal
                                closeButton
                                blur
                                aria-labelledby="modal-title"
                                width='90%'
                                style={{maxWidth: 800 + "px"}}
                                open={visible}
                                className='mx-auto'
                                onClose={closeHandler}
                            >
                                <Modal.Header>
                                    <Text id="modal-title" size={18}>
                                        Encerrar Conta
                                    </Text>
                                </Modal.Header>
                                <Modal.Body>
                                    <h2 className='h5'>Tem certeza que deseja excluir sua conta?</h2>
                                    <ul>
                                        <li>Todos os seus dados serão perdidos;</li>
                                        <li>Os pedidos pendentes serão cancelados;</li>
                                        <li>Não terá como recuperar o estado atual da sua conta;</li>
                                    </ul>
                                </Modal.Body>
                                <Modal.Footer>
                                    <form method='POST' action='/api/delete-account'>
                                        <Button type='submit' auto color="error" ghost onClick={close}>
                                            Confirmar Exclusão
                                        </Button>
                                    </form>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <button className="btn btn-outline-danger align-self-lg-end align-self-center text-center mt-lg-0 mt-3 col-lg-auto col-12" onClick={handler}>Deletar Conta...</button>
                    </fieldset>
                    <button className="btn btn-primary mt-4 align-self-end">Salvar Alterações</button>
                </div>
            </section>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['impress.token']: token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            }
        }
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err) {
        if (err) {
            return {
                redirect: {
                    destination: '/logout',
                    permanent: false,
                }
            }
        }
    });

    const data = jwt.decode(token)

    return {
        props: {
            token: token,
            firstname: data['firstname'],
            lastname: data['lastname'],
            email: data['email'],
            avatar: data['avatar'],
        }
    }
}

export default Perfil