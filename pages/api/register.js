import {parseCookies} from "nookies";
import {createUser, hashPassword, hasUser} from "../../contexts/DataContext";
import {validateCPF, validateEmail, validateName, validatePassword} from "../../contexts/Utils";

async function handler(req, res) {
    if (req.method === 'POST') {
        const token = parseCookies({req})
        if (token['impress.token'] != null) {
            res.status(406).json({"Error": "Already logged in"})
            return
        }

        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const cpf = (req.body.cpf).replaceAll('.', '').replaceAll('-', '')
        const email = req.body.email
        const password = req.body.password

        if (!validateName(firstname) || !validateName(lastname) || !validateCPF(cpf) || !validateEmail(email) || !validatePassword(password)) {
            res.status(400).json({"Error": "Invalid informations"})
            return
        }

        if (await hasUser({email}) != null) {
            res.status(200).json({"Error": "User already created"})
            return
        }

        const encryptedPassword = await hashPassword({email, password})
        const query = await createUser({
            firstname,
            lastname,
            cpf,
            email,
            password: encryptedPassword,
        })

        if (query) {
            res.status(200).json({"Success": "User created"})
        } else {
            res.status(200).json({"Error": "Error in creating user"})
        }
    }else res.status(405).json({"Error": "Invalid request method"})
}

export default handler