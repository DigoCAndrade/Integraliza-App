import {parseCookies} from "nookies";
import {createUser, hashPassword, hasUser} from "../../contexts/DataContext";

async function handler(req, res) {
    if (req.method === 'POST') {
        const token = parseCookies({req})
        if (token['impress.token'] != null) {
            res.status(406).json('Already logged in')
        } else {
            const email = req.body.email
            const password = req.body.password
            const firstname = req.body.firstname
            const lastname = req.body.lastname
            const state = req.body.state
            const birthdate = req.body.birthdate

            if (email == null || !email.includes('@') || (!email.endsWith('.com')
                && !email.endsWith('.br') && !email.endsWith('.net'))) {
                res.status(400).json('Email invalid')
                return
            } else if (password == null || password.length < 8) {
                res.status(400).json('Password invalid')
                return
            } else if (firstname == null || firstname.length > 16) {
                res.status(400).json('Firstname invalid')
                return
            } else if (lastname == null || lastname.length > 16) {
                res.status(400).json('Lastname invalid')
                return
            } else if (state == null) {
                res.status(400).json('State invalid')
                return
            } else if (birthdate == null) {
                res.status(400).json('Birthdate invalid')
                return
            }

            if (await hasUser({email}) != null) {
                res.status(200).json('User already created')
            } else {
                const encryptedPassword = await hashPassword({email, password})
                const query = await createUser({
                    email,
                    password: encryptedPassword,
                    firstname,
                    lastname,
                    state,
                    birthdate
                })
                if (query) {
                    res.status(200).json('User created')
                } else {
                    res.status(200).json('Error in creating user')
                }
            }
        }
    }else {
        res.status(405).json('Invalid request method')
    }
}

export default handler