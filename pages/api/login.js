import {parseCookies, setCookie} from "nookies";
import {generateToken, hashPassword, matchUser} from "../../contexts/DataContext";

async function handler(req, res) {
    if (req.method === 'POST') {
        const token = parseCookies({req})
        if (token['impress.token'] != null) {
            res.status(406).json('Already logged in')
        }else {
            const email = req.body.email
            const password = req.body.password
            if (email == null || password == null) {
                res.status(400).json('Informations missing')
            }else {
                const encryptedPassword = await hashPassword({email, password})
                const data = await matchUser({email, password: encryptedPassword})
                if (data == null) {
                    res.status(200).json('User not found')
                }else {
                    const jwt = await generateToken({
                        id: data[0],
                        firstname: data[1],
                        lastname: data[2],
                        email: data[3],
                        avatar_url: data[4]
                    })
                    setCookie({res}, 'impress.token', jwt, {
                        maxAge: 24 * 60 * 60, // 1 day
                        path: '/',
                    })
                    res.status(200).json('Sucessful')
                }
            }
        }
    }else {
        res.status(405).json('Invalid request method')
    }
}

export default handler