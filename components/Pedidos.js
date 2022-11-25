import Pedido from "./Pedido";
import React from "react";

export default function Pedidos({data}) {
    return (
        <>
            <section className='col-12 d-flex flex-column mb-5' id='pedidos'>
                {data.map((element) => (
                    <Pedido key={element.id} id={element['id']} tamanho={element['tamanho']} gramatura={element['gramatura']} cor={element['cor']} data={element['data']}/>
                ))}
            </section>
        </>
    )
}