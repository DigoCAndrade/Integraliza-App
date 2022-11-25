import Styles from '../styles/index.module.css'
import Navbar from "../components/navbar";
import ImageMain from "../assets/img.png"
import Image from "next/image";
import {parseInformation} from "../contexts/Utils";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import {Collapse, Text, Table} from "@nextui-org/react";
import Link from "next/link";
import Head from "next/head";
import React from "react";

function Home({token}) {
    return (
        <>
            <Head>
                <title>Início - Integraliza</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className='bg-black'>
                <Navbar transparent={true} userInfo={parseInformation(token)}/>
                <main>
                    <section
                        className={[Styles.mainArea, 'text-center px-5 d-flex flex-column justify-content-evenly'].join(" ")}>
                        <div>
                            <h1 className={[Styles.mainTitle, 'text-white SF-Pro-Bold'].join(" ")}>Integraliza</h1>
                            <p className={[Styles.mainText, 'text-white text-opacity-50'].join(" ")}>Imprima de qualquer
                                lugar, a qualquer hora.</p>
                            <a href='#sobre' className='link-primary fs-5 mb-4'>Saiba mais &gt;</a>
                        </div>
                        <div className={Styles.mainImage}>
                            <Image src={ImageMain} width={577} height={433} alt=''/>
                        </div>
                    </section>
                    {middle()}
                </main>
            </div>
        </>
    )
}

function middle() {
    return (
        <>
            <section className='row col-12 m-0'>
                <div className='col-lg-6 col-12 bg-white p-0 d-flex flex-column align-items-center'>
                    <h3 className='h2 mt-5'>Como montar seu pedido</h3>
                    <div
                        className='col-sm-8 col-10 mx-auto bg-secondary bg-opacity-10 py-3 rounded-2 mt-5 mb-3 position-relative'>
                        <i className={[Styles.square, 'bi bi-1-square-fill position-absolute position-circle fs-3 text-primary'].join(" ")}></i>
                        <p className='text-center fs-5 m-0 d-flex align-items-center justify-content-center'><i
                            className='bi bi-geo-alt-fill me-3 fs-2'></i>Escolha uma gráfica próxima</p>
                    </div>
                    <div className={Styles.line}></div>
                    <div
                        className='col-sm-8 col-10 mx-auto bg-secondary bg-opacity-10 py-3 rounded-2 mt-3 mb-3 position-relative'>
                        <i className={[Styles.square, 'bi bi-2-square-fill position-absolute position-circle fs-3 text-primary'].join(" ")}></i>
                        <p className='text-center fs-5 m-0 d-flex align-items-center justify-content-center'><i
                            className='bi bi-cart-fill me-3 fs-2'></i>Monte seu pedido</p>
                    </div>
                    <div className={Styles.line}></div>
                    <div
                        className='col-sm-8 col-10 mx-auto bg-secondary bg-opacity-10 py-3 rounded-2 mt-3 mb-3 position-relative'>
                        <i className={[Styles.square, 'bi bi-3-square-fill position-absolute position-circle fs-3 text-primary'].join(" ")}></i>
                        <p className='text-center fs-5 m-0 d-flex align-items-center justify-content-center'><i
                            className='bi bi-clock-fill me-3 fs-2'></i>Escolha a forma de retirar</p>
                    </div>
                    <div className={Styles.line}></div>
                    <div
                        className='col-sm-8 col-10 mx-auto bg-secondary bg-opacity-10 py-3 rounded-2 mt-3 mb-5 position-relative'>
                        <i className={[Styles.square, 'bi bi-4-square-fill position-absolute position-circle fs-3 text-primary'].join(" ")}></i>
                        <p className='text-center fs-5 m-0 d-flex align-items-center justify-content-center'><i
                            className='bi bi-credit-card-fill me-3 fs-2'></i>Finalize seu pedido</p>
                    </div>
                </div>
                <div
                    className={['col-lg-6 d-flex flex-column align-items-center p-0 py-5 bg-white', Styles.planetImage].join(" ")}>
                    <h3 className='h2 mb-5 text-center SF-Pro text-black'>Imprima de maneira rápida<br></br>e
                        sustentável</h3>
                    <Link href='/buy'>
                        <a className='btn btn-primary px-5 rounded-3 mt-auto mb-lg-5 mb-0'>Imprimir Agora</a>
                    </Link>
                </div>
            </section>
            <section
                className='my-5 ms-lg-5 mx-auto d-flex flex-lg-row flex-column col-11 p-lg-5 p-3 align-items-center text-md-start text-center'>
                <div>
                    <Text
                        h1
                        size={60}
                        css={{
                            textGradient: "45deg, $blue600 -20%, $pink600 50%",
                        }}
                        weight="bold"
                    >
                        Impressão
                    </Text>
                    <Text
                        h1
                        size={60}
                        css={{
                            textGradient: "45deg, $purple600 -20%, $pink600 100%",
                        }}
                        weight="bold"
                        className='ms-lg-4'
                    >
                        Pensamento
                    </Text>
                    <Text
                        h1
                        size={60}
                        css={{
                            textGradient: "45deg, $yellow600 -20%, $red600 100%",
                        }}
                        weight="bold"
                        className='ms-lg-5'
                    >
                        Criatividade
                    </Text>
                </div>
                <div className='ms-lg-auto me-lg-0 mx-auto col-lg-5 col-12 mt-lg-0 mt-5'>
                    <Table
                        bordered
                        shadow={false}
                        color="secondary"
                        css={{
                            height: "auto",
                            minWidth: "100%",
                        }}
                        className='bg-light bg-opacity-75'
                    >
                        <Table.Header>
                            <Table.Column>CATEGORIA</Table.Column>
                            <Table.Column>ESPECIFICAÇÃO</Table.Column>
                            <Table.Column>PREÇO</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row key="1">
                                <Table.Cell>Tamanho</Table.Cell>
                                <Table.Cell>A5</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="2">
                                <Table.Cell>Tamanho</Table.Cell>
                                <Table.Cell>A4</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="3">
                                <Table.Cell>Tamanho</Table.Cell>
                                <Table.Cell>A3</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="4">
                                <Table.Cell>Tamanho</Table.Cell>
                                <Table.Cell>A2</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="5">
                                <Table.Cell>Tamanho</Table.Cell>
                                <Table.Cell>A1</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="6">
                                <Table.Cell>Gramatura</Table.Cell>
                                <Table.Cell>90g</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="7">
                                <Table.Cell>Gramatura</Table.Cell>
                                <Table.Cell>115g</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="8">
                                <Table.Cell>Gramatura</Table.Cell>
                                <Table.Cell>150g</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="9">
                                <Table.Cell>Gramatura</Table.Cell>
                                <Table.Cell>300g</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="10">
                                <Table.Cell>Cor</Table.Cell>
                                <Table.Cell>Colorido</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                            <Table.Row key="11">
                                <Table.Cell>Cor</Table.Cell>
                                <Table.Cell>Preto e Branco</Table.Cell>
                                <Table.Cell>R$ 1,99</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                        <Table.Pagination
                            shadow
                            noMargin
                            align="center"
                            rowsPerPage={5}
                            color="primary"
                        />
                    </Table>
                </div>
            </section>
            <section className='col-12 bg-white p-5'>
                <div className='col-12 mx-auto p-md-5'>
                    <h2 className='text-center mt-5' id='sobre'>F.A.Q</h2>
                    <hr/>
                    <Collapse.Group>
                        <Collapse title="Missão" expanded>
                            <p>
                                A nossa missão é oferecer produtos e serviços com materiais de alta qualidade e
                                agilidade nas
                                entregas, priorizando o conforto, bem estar, segurança e satisfação dos nossos
                                consumidores.
                            </p>
                        </Collapse>
                        <Collapse title="Visão">
                            <p>
                                Temos como visão aumentar os investimentos para melhorar a qualidade, conseguir expandir
                                os negócios, crescer e se tornar referência em serviços gráficos na região.
                            </p>
                        </Collapse>
                        <Collapse title="Valores">
                            <p>
                                Dentre nossos valores estão:
                            </p>
                            <ul>
                                <li>Qualidade nas produções;</li>
                                <li>Velocidade nas entregas;</li>
                                <li>Comprometimento;</li>
                                <li>Dedicação e respeito;</li>
                                <li>Sustentabilidade;</li>
                            </ul>
                        </Collapse>
                    </Collapse.Group>
                </div>
            </section>
            <footer className='col-12 p-5 d-flex flex-md-row flex-column justify-content-around'>
                <div>
                    <h3 className='text-light'>Páginas</h3>
                    <ul className='nav flex-column text-md-start'>
                        <li className='nav-item'><Link href='#'><a href='#' className='nav-link p-0'>Início</a></Link>
                        </li>
                        <li className='nav-item'><Link href='buy'><a href='#'
                                                                     className='nav-link p-0'>Imprimir</a></Link></li>
                        <li className='nav-item'><Link href='#sobre'><a href='#'
                                                                        className='nav-link p-0'>Sobre</a></Link></li>
                        <li className='nav-item'><Link href='pedidos'><a href='#' className='nav-link p-0'>Meus
                            Pedidos</a></Link></li>
                        <li className='nav-item'><Link href='perfil'><a href='#' className='nav-link p-0'>Minha
                            Conta</a></Link></li>
                    </ul>
                </div>
                <div className='mt-md-0 mt-4'>
                    <h3 className='text-light'>Termos</h3>
                </div>
                <div className='mt-md-0 mt-4'>
                    <h3 className='text-light'>Contato</h3>
                    <ul className='nav flex-column'>
                        <li className='nav-item'><a className='nav-link p-0'>suporte@integralizagrafica.com</a></li>
                        <li className='nav-item'><a className='nav-link p-0'>+55 (00) 00000000000</a></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {['impress.token']: token} = parseCookies(ctx)

    return {
        props: {
            token: (token == null) ? false : token,
        }
    }
}

export default Home