import executeQuery from "../services/database";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function hashPassword({email, password}) {
    return crypto.pbkdf2Sync(password, email, 1000, 64, 'sha512').toString('hex')
}

export async function createUser({firstname, lastname, cpf, email, password}) {
    try {
        const result = await executeQuery({
            query: 'INSERT INTO users (firstname, lastname, cpf, email, password) VALUES (?, ?, ?, ?, ?)',
            values: [firstname, lastname, cpf, email, password],
        })

        return (result['error'] == null)
    }catch (error) {
        console.log(error)
        return false
    }
}

export async function hasUser({email}) {
    try {
        const result = await executeQuery({
            query: 'SELECT id FROM users WHERE email = ?',
            values: [email],
        })
        if (result[0] == null) return null
        return [result[0]['id']]
    }catch (error) {
        console.log(error)
    }
}

export async function matchUser({email, password}) {
    try {
        const result = await executeQuery({
            query: 'SELECT id, firstname, lastname, email, avatar_url FROM users WHERE email = ? AND password = ?',
            values: [email, password],
        })
        if (result[0] == null) return null
        return [result[0]['id'], result[0]['firstname'], result[0]['lastname'], result[0]['email'], result[0]['avatar_url']]
    }catch (error) {
        console.log(error)
    }
}

export async function generateToken({id, firstname, lastname, email, avatar_url}) {
    return jwt.sign({
        id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        avatar: avatar_url,
    }, process.env.SECRET_KEY, {
        expiresIn: 86400 // 1 day
    })
}