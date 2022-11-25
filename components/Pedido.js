import {useState} from "react";
import { Modal, Text} from "@nextui-org/react";
import Image from "next/image";

export default function Pedido({id, tamanho, gramatura, cor, data}) {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    let tamanhoName = 'A4';
    let gramaturaName = '90g';
    let corName = 'Colorido';

    switch (tamanho) {
        case 1:
            tamanhoName = 'A5'
            break
        case 2:
            tamanhoName = 'A4'
            break
        case 3:
            tamanhoName = 'A3'
            break
        case 4:
            tamanhoName = 'A2'
            break
        case 5:
            tamanhoName = 'A1'
            break
    }

    switch (gramatura) {
        case 1:
            gramaturaName = '90g'
            break
        case 2:
            gramaturaName = '115g'
            break
        case 3:
            gramaturaName = '150g'
            break
        case 4:
            gramaturaName = '300g'
            break
    }

    if (cor === 2) {
        corName = 'Preto e Branco'
    }

    return (
        <>
            <div className='col-12 h-auto p-lg-5 p-md-4 p-2 bg-light shadow-sm my-3 d-flex align-items-center justify-content-center border border-5 rounded-3 border-primary border-end-0 border-top-0 border-bottom-0'>
                <div className='col-12 d-flex flex-md-row flex-column align-items-center flex-wrap'>
                    <div className='d-flex align-items-center col-lg-auto col-md-12 justify-content-center col-10 mt-md-0 mt-3 pt-md-0 pt-3 mx-lg-0 mx-auto ms-lg-5'>
                        <div className='d-flex flex-column justify-content-center align-items-center me-5'>
                            <h3 className='fs-1 SF-Pro-Bold m-0'>{tamanhoName}</h3>
                            <p className='m-0 mt-1'>Formato</p>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center ms-5'>
                            <h3 className='fs-1 SF-Pro-Bold m-0'>{gramaturaName}</h3>
                            <p className='m-0 mt-1'>Gramatura</p>
                        </div>
                    </div>
                    <div className='d-flex align-items-md-center col-md-auto col-12 flex-wrap mt-lg-0 mt-md-5 mt-4 ms-md-auto me-lg-0 mx-auto me-lg-5'>
                        <div className='d-flex flex-column justify-content-center align-items-center me-md-5 me-sm-4 ms-sm-auto mx-md-0 mx-auto'>
                            <h3 className='fs-1 SF-Pro-Bold m-0'><i className='bi bi-droplet-fill'></i></h3>
                            <p className='m-0 mt-1 text-center' style={{width: 100 + 'px'}}>{corName}</p>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center me-md-0'>
                            <h3 className='fs-1 SF-Pro-Bold m-0'><i className='bi bi-calendar-date'></i></h3>
                            <p className='m-0 mt-1'>{data}</p>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center mx-auto mt-md-0 mt-4 pb-md-0 pb-3 ms-md-5 ms-sm-4 me-md-0'>
                            <h3 className='fs-1 SF-Pro-Bold m-0'>Arquivo</h3>
                            <button className='btn btn-link m-0 mt-1 p-1 text-decoration-none' onClick={handler}>Visualizar</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                width='90%'
                style={{maxWidth: 500 + "px"}}
                className='mx-auto'
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Arquivo #{id}
                    </Text>
                </Modal.Header>
                <Modal.Body className='p-4 pb-5'>
                    <div className='mx-auto'>
                        <Image src='https://cdn-icons-png.flaticon.com/512/3585/3585596.png' width='100%' height='100%' alt='Contéudo não disponível'/>
                    </div>
                    <h3 className='text-center'>Conteúdo não disponível</h3>
                    <p className='text-center'>Oh! Infelizmente esse recurso ainda não está disponível, estamos cada vez mais melhorando nossos sistemas!</p>
                </Modal.Body>
            </Modal>
        </>
    )
}