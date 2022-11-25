import {parseCookies} from "nookies";
import executeQuery from "../../services/database";
import {getUserIDByCookie} from "../../contexts/Utils";
import React from "react";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { ['impress.token']: token } = parseCookies({req})
        if (token == null) {
            res.status(406).json('Not logged in')
        }else {
            const tamanho = req.body.tamanho
            const gramatura = req.body.gramatura
            const cor = req.body.cor
            const arquivo = req.body.arquivo
            if (tamanho == null || gramatura == null || cor == null || arquivo == null) {
                res.status(400).json('Informations missing')
            }else {
                try {
                    await executeQuery({
                        query: 'INSERT INTO requests (user_id, tamanho, gramatura, cor, arquivo) VALUES (?, ?, ?, ?, ?)',
                        values: [getUserIDByCookie(token), tamanho, gramatura, cor, arquivo],
                    })
                    res.status(200).json('Sucessful')
                }catch (error) {
                    console.log(error)
                    res.status(200).json(error)
                    return false
                }
            }
        }
    }else {
        res.status(405).json('Invalid request method')
    }
}

export default handler