import Navbar from "../components/navbar";
import {parseInformation} from "../contexts/Utils";
import React from "react";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import Head from 'next/head'
import Pedidos from '../components/Pedidos'
import jwt from 'jsonwebtoken'
import executeQuery from "../services/database";

function App({token, data}) {
    return (<>
        <Head>
            <title>Meus Pedidos - Integraliza</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbar transparent={false} userInfo={parseInformation(token)}/>
        <section className='col-10 mx-auto mt-5'>
            <h1>Pedidos</h1>
            <hr/>
            <Pedidos data={data}/>
        </section>
    </>)
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['impress.token']: token } = parseCookies(ctx)

    if (!token) {
        return {
            props: {},
            redirect: {
                destination: '/signin',
                permanent: false,
            }
        }
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err) {
        if (err) {
            return {
                props: {},
                redirect: {
                    destination: '/logout',
                    permanent: false,
                }
            }
        }
    });

    const data = jwt.decode(token)
    const user_id = data['id']
    let results = []

    try {
        const result = (await executeQuery({
            query: 'SELECT id, user_id, tamanho, gramatura, cor, data FROM requests WHERE user_id = ?',
            values: [user_id],
        }) as Array<any>)

        result.forEach(element => {
            results.push({id: element['id'],
                user_id: element['user_id'],
                tamanho: element['tamanho'],
                gramatura: element['gramatura'],
                cor: element['cor'], data: formatDate(element['data'])})
        })
    }catch (error) {
        console.log(error)
        return {
            props: {}
        }
    }

    return {
        props: {
            token: token,
            data: results,
        }
    }
}

export default App