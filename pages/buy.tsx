import Navbar from "../components/navbar";
import {parseInformation} from "../contexts/Utils";
import {Modal, Text, Input, Tooltip} from "@nextui-org/react";
import CreditCard from '../components/CreditCard'
import Style from 'styles/buy.module.css'
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import Head from 'next/head'
import BuyAnimation from '../components/BuyAnimation'

function Buy({token}) {
    const [visible, setVisible] = React.useState(false);
    const [visiblePayment, setVisiblePayment] = React.useState(false);
    const [number, setNumber] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [expiry, setExpiry] = React.useState(null);
    const handler = () => {
        setVisible(true);
        setTimeout(() => {
            disableCardButton()
        }, 200);
    }
    const router = useRouter()

    useEffect(() => {
        disableButton()
    })

    function checkBuyButton() {
        const tamanho = (document.querySelector('input[name="tamanhos"]:checked') as HTMLInputElement);
        const gramatura = (document.querySelector('input[name="gramaturas"]:checked') as HTMLInputElement);
        const cor = (document.querySelector('input[name="cores"]:checked') as HTMLInputElement);
        if (tamanho == null || gramatura == null || cor == null) return false;
        const values = {
            "tamanho": tamanho.value,
            "gramatura": gramatura.value,
            "cor": cor.value,
            "arquivo": (document.querySelector('#documentUpload') as HTMLInputElement).files.item(0)
        }

        return !(values['tamanho'] == null || values['gramatura'] == null || values['cor'] == null || values['arquivo'] == null);
    }

    function disableButton() {
        const buyButton = (document.querySelector('#buyButton') as HTMLInputElement);
        if (checkBuyButton()) {
            buyButton.disabled = false;
            buyButton.classList.remove('disabled');
        } else {
            buyButton.disabled = true;
            buyButton.classList.add('disabled');
        }
    }

    function checkCardButton() {
        const number = (document.querySelector('input[name="card-number"]') as HTMLInputElement);
        const name = (document.querySelector('input[name="card-name"]') as HTMLInputElement);
        const expiry = (document.querySelector('input[name="card-expiry"]') as HTMLInputElement);
        const cvv = (document.querySelector('input[name="card-cvv"]') as HTMLInputElement);
        if (number == null || name == null || expiry == null || cvv == null) return false;
        return !(number.value.length < 16 || name.value.length < 5 || expiry.value.length < 4 || cvv.value.length < 3);
    }

    function disableCardButton() {
        const check = checkCardButton()
        const finalizeButton = (document.querySelector('#finalizeButton') as HTMLInputElement);
        if (check) {
            if (finalizeButton == null) return
            finalizeButton.disabled = false;
            finalizeButton.classList.remove('disabled');
        } else {
            if (finalizeButton == null) return
            finalizeButton.disabled = true;
            finalizeButton.classList.add('disabled');
        }
    }

    const updateCard = (e) => {
        const value = e.target.value.replace(/[^0-9a-zA-Z\s]/, "")
        e.target.value = value
        switch (e.target.name) {
            case 'card-number':
                if (!new RegExp(/^[0-9]{0,16}$/).test(value)) {
                    e.target.value = value.slice(0, -1)
                } else {
                    disableCardButton()
                    if (value == null || value.length <= 0) {
                        setNumber(null)
                    } else {
                        let format = new RegExp(/^(\d{4})(\d{4})(\d{4})(\d{4})/).exec(value)
                        setNumber((format == null) ? value : (format[1] + " " + format[2] + " " + format[3] + " " + format[4]))
                    }
                }
                break
            case 'card-name':
                if (!new RegExp(/^[a-zA-Z\s]{0,20}$/).test(value)) {
                    e.target.value = value.slice(0, -1)
                } else {
                    disableCardButton()
                    if (value == null || value.length <= 0) {
                        setName(null)
                    } else setName(value)
                }
                break
            case 'card-expiry':
                if (!new RegExp(/^[0-9]{0,4}$/).test(value)) {
                    e.target.value = value.slice(0, -1)
                } else {
                    if (value.length > 0 && ((value[0] != 0 && value[1] > 2)) || (value[0] == 0 && value[1] == 0)) {
                        e.target.value = value.slice(0, -1)
                        return;
                    }
                    disableCardButton()
                    if (value.length <= 0) {
                        setExpiry(null)
                    } else {
                        let format = new RegExp(/^(\d{2})(\d{2})/).exec(value)
                        setExpiry((format == null) ? value : (format[1] + "/" + format[2]))
                    }
                }
                break
            case 'card-cvv':
                if (!new RegExp(/^[0-9]{0,4}$/).test(value)) {
                    e.target.value = value.slice(0, -1)
                    return;
                }
                disableCardButton()
                break
        }
    }

    const closeHandler = () => {
        setVisible(false);
    };

    const changePaper = (e) => {
        disableButton()
        let width = 0
        let height = 0
        switch (e.target.value) {
            case '1':
                width = 14.8
                height = 21.0
                break
            case '2':
                width = 21.0
                height = 29.7
                break
            case '3':
                width = 29.7
                height = 42.0
                break
            case '4':
                width = 42.0
                height = 59.4
                break
            case '5':
                width = 59.4
                height = 84.1
                break
        }
        (document.querySelector('#document-preview') as HTMLElement).style.width = (width * 37.7952755906) / 6 + "px";
        (document.querySelector('#document-preview') as HTMLElement).style.height = (height * 37.7952755906) / 6 + "px";
        (document.querySelector('#paper-size') as HTMLElement).innerText = (height + ' x ' + width + ' cm')
    }

    const fileDataURL = file => new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = reject;
        fr.readAsDataURL(file)
    });

    const submitFile = (e) => {
        disableButton()
        fileDataURL(e.target.files.item(0))
            .then(data => {
                ((document.querySelector("#document-preview") as HTMLDivElement).style.backgroundImage = "url('" + data + "')");
            })
            .catch(() => {
                ((document.querySelector("#document-preview") as HTMLDivElement).style.backgroundImage = "");
            });
    }

    async function confirmBuy() {
        const buttonBuy = (document.querySelector('#finalizeButton') as HTMLButtonElement)
        buttonBuy.disabled = true
        buttonBuy.innerText = 'Finalizando...'
        let file = null
        const fileInput = (document.querySelector('#documentUpload') as HTMLInputElement).files.item(0)
        await fileDataURL(fileInput)
            .then(data => {
                file = data
            })
            .catch((err) => console.log(err))
        const values = {
            "tamanho": (document.querySelector('input[name="tamanhos"]:checked') as HTMLInputElement).value,
            "gramatura": (document.querySelector('input[name="gramaturas"]:checked') as HTMLInputElement).value,
            "cor": (document.querySelector('input[name="cores"]:checked') as HTMLInputElement).value,
            "arquivo": file
        }

        const data = await fetch('/api/process_buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then((res) => res.json())
        console.log(data)
        switch (data) {
            case 'Not logged in':
                await router.push('/signin')
                break
            case 'Sucessful':
                closeHandler()
                setVisiblePayment(true)
                break
        }
    }

    return (<>
        <Head>
            <title>Nova Impressão - Integraliza</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbar transparent={false} userInfo={parseInformation(token)}/>
        <section className="mt-5 col-12 row position-relative m-0">

            <div
                className={[Style.preview, 'mt-5 shadow-lg position-fixed rounded-3 d-flex flex-column align-items-center justify-content-center'].join(" ")}
                id='preview-area'>
                <div
                    className={[Style.document, 'd-flex flex-column justify-content-center align-items-center mt-4'].join(" ")}
                    id='document-preview'>
                </div>
                <p className='mt-2 text-secondary' id='paper-size'>297 x 210 mm</p>
            </div>

            <div className="ms-lg-auto me-lg-5 mx-auto col-lg-5 col-11">
                <h1 className='fs-2 mb-0 SF-Pro'>Nova Impressão</h1>
                <p className='fs-6 mb-4 text-secondary'>Monte sua impressão</p>
                <h2 className="fs-5 mb-3 SF-Pro">Tamanho</h2>

                <section className='row row-cols-md-3 flex-wrap'>

                    <div className='col-lg-4 col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="tamanhos" id="tamanho1"
                                   autoComplete="off" value='1' onFocus={changePaper} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="tamanho1">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">A5</h3>
                                <p className="fs-6 m-0 text-secondary">210 x 148 mm</p>
                            </label>
                        </Tooltip>
                    </div>

                    <div className='col-lg-4 col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="tamanhos" id="tamanho2" autoComplete="off"
                                   value='2' onFocus={changePaper} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="tamanho2">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">A4</h3>
                                <p className="fs-6 m-0 text-secondary">297 x 210 mm</p>
                            </label>
                        </Tooltip>
                    </div>

                    <div className='col-lg-4 col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="tamanhos" id="tamanho3" autoComplete="off"
                                   value='3' onFocus={changePaper} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="tamanho3">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">A3</h3>
                                <p className="fs-6 m-0 text-secondary">420 x 297 mm</p>
                            </label>
                        </Tooltip>
                    </div>

                    <div className='col-lg-4 col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="tamanhos" id="tamanho4" autoComplete="off"
                                   value='4' onFocus={changePaper} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="tamanho4">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">A2</h3>
                                <p className="fs-6 m-0 text-secondary">594 x 420 mm</p>
                            </label>
                        </Tooltip>
                    </div>

                    <div className='col-lg-4 col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="tamanhos" id="tamanho5" autoComplete="off"
                                   value='5' onFocus={changePaper} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="tamanho5">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">A1</h3>
                                <p className="fs-6 m-0 text-secondary">841 x 594 mm</p>
                            </label>
                        </Tooltip>
                    </div>

                </section>
                <hr/>
                <h2 className="fs-5 mb-3 SF-Pro">Gramatura</h2>
                <section className='row row-cols-md-2 flex-wrap'>

                    <div className='col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="gramaturas" id="gramatura1"
                                   autoComplete="off" value='1' onFocus={disableButton} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="gramatura1">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">90g</h3>
                                <p className="fs-6 m-0 text-secondary">Papéis timbrados e envelopes</p>
                            </label>
                        </Tooltip>
                    </div>

                    <div className='col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="gramaturas" id="gramatura2"
                                   autoComplete="off" value='2' onFocus={disableButton} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="gramatura2">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">115g</h3>
                                <p className="fs-6 m-0 text-secondary">Cartazes, panfletos e folhetos</p>
                            </label>
                        </Tooltip>
                    </div>

                    <div className='col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="gramaturas" id="gramatura3"
                                   autoComplete="off" value='3' onFocus={disableButton} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="gramatura3">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">150g</h3>
                                <p className="fs-6 m-0 text-secondary">Folders, flyers e capas de revistas</p>
                            </label>
                        </Tooltip>
                    </div>

                    <div className='col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="gramaturas" id="gramatura4"
                                   autoComplete="off" value='4' onFocus={disableButton} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="gramatura4">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">300g</h3>
                                <p className="fs-6 m-0 text-secondary">Cartões de visita e cartões postais </p>
                            </label>
                        </Tooltip>
                    </div>
                </section>
                <hr/>
                <h2 className="fs-5 mb-3 SF-Pro">Cor</h2>
                <section className='row row-cols-md-2 flex-wrap'>
                    <div className='col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="cores" id="cor1"
                                   autoComplete="off" value='1' onFocus={disableButton} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="cor1">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">
                                    <i className="bi bi-droplet-half color-gradient"></i>
                                </h3>
                                <p className="fs-6 m-0 text-secondary">Colorido</p>
                            </label>
                        </Tooltip>
                    </div>
                    <div className='col-md-6 col-12'>
                        <Tooltip content={"R$ 1,94"} color={"primary"} style={{width: 100 + "%"}}>
                            <input type="radio" className="btn-check" name="cores" id="cor2" autoComplete="off"
                                   value='2' onFocus={disableButton} required/>
                            <label
                                className="btn mb-3 col-12 border border-secondary border-opacity-50 rounded-4 align-items-center justify-content-center p-4"
                                htmlFor="cor2">
                                <h3 className="m-0 mb-1 fs-2 SF-Pro text-black text-opacity-75">
                                    <i className="bi bi-droplet-half"></i>
                                </h3>
                                <p className="fs-6 m-0 text-secondary">Preto & Branco</p>
                            </label>
                        </Tooltip>
                    </div>
                </section>
                <hr/>
                <h2 className="fs-5 mb-3 SF-Pro">Arquivo</h2>
                <div>
                    <input className="form-control form-control-lg" id="documentUpload" type="file"
                           onChange={submitFile} accept='image/*' onFocus={disableButton} required/>
                </div>
                <button id='buyButton' type='button'
                        className='btn btn-primary rounded-3 col-12 fs-5 p-2 mt-5 d-flex align-items-center justify-content-center mb-5'
                        onClick={handler}>
                    <i className="bi bi-cart-check-fill fs-4 me-2"></i>Finalizar Pedido
                </button>
                <Modal
                    closeButton
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                    width='90%'
                    style={{maxWidth: 800 + "px"}}
                    className='mx-auto'
                >
                    <Modal.Header>
                        <Text id="modal-title" size={20}>
                            Finalizar Pedido
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <CreditCard name={name} number={number} expiry={expiry}/>
                            <div className='mt-4'>
                                <div>
                                    <Input
                                        clearable
                                        bordered
                                        fullWidth
                                        color="primary"
                                        size="lg"
                                        placeholder="Número do Cartão"
                                        name='card-number'
                                        aria-label='card-number'
                                        onChange={updateCard}
                                        required
                                    />
                                    <Input
                                        clearable
                                        bordered
                                        fullWidth
                                        color="primary"
                                        size="lg"
                                        placeholder="Nome do Cartão"
                                        className='mt-3'
                                        name='card-name'
                                        aria-label='card-name'
                                        onChange={updateCard}
                                        required
                                    />
                                </div>
                                <div className='d-flex flex-row justify-content-between col-12 mt-3'>
                                    <Input
                                        clearable
                                        bordered
                                        color="primary"
                                        size="lg"
                                        width={45 + "%"}
                                        placeholder="Data de Expiração"
                                        name='card-expiry'
                                        aria-label='card-expiry'
                                        onChange={updateCard}
                                        required
                                    />
                                    <Input
                                        clearable
                                        bordered
                                        color="primary"
                                        size="lg"
                                        type={"password"}
                                        width={45 + "%"}
                                        placeholder="CVV"
                                        aria-label='card-cvv'
                                        name='card-cvv'
                                        onChange={updateCard}
                                        required
                                    />
                                </div>
                                <div className='mt-4 d-flex flex-row justify-content-between text-dark'>
                                    <p>Valor Total:</p>
                                    <p className='SF-Pro-Bold text-opacity-50'>R$ 34,90</p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' id='finalizeButton'
                                className='btn btn-primary col-md-3 col-12 rounded-4 py-3 px-5' onClick={confirmBuy}>
                            Comprar
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <BuyAnimation visible={visiblePayment}/>
        </section>
    </>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['impress.token']: token } = parseCookies(ctx)

    return {
        props: {
            token: (token == null) ? false : token,
        }
    }
}

export default Buy