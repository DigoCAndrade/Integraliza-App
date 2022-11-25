import React from "react";
import {Modal, Text, Loading} from "@nextui-org/react";
import {useRouter} from "next/router";

export default function App({visible}) {
    const router = new useRouter();
    const closeHandler = () => {
        visible = false
    };

    async function animation() {
         setTimeout(async () => {
             document.querySelector('#loading').remove()
             document.querySelector('#BuyAnimationBody').innerHTML = "<div class='mx-auto d-flex flex-column justify-content-center align-items-center'><img src='https://cdn-icons-png.flaticon.com/512/4436/4436481.png' width='128' height='128' class='expandImage' alt=''/> <p class='expandText mt-3 fs-3 text-dark text-center'>Pagamento Autorizado</p></div>";
             setTimeout(async () => {
                 closeHandler()
                 await router.push('/pedidos')
             }, 2000)
        }, 3000)
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            preventClose
            onOpen={animation}
            className='col-lg-12 col-10 mx-auto'>
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Processando Pagamento
                </Text>
            </Modal.Header>
            <Modal.Body className='p-md-5 p-4' id='BuyAnimationBody'>
                <Loading color="primary" textColor='primary' id='loading' size='xl' type='default'>
                    <p className='mt-3'>Aguarde...</p>
                </Loading>
            </Modal.Body>
        </Modal>
    );
}
