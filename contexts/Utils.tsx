import jwt from 'jsonwebtoken';

export function parseInformation(token) {
    if (!token) return [false, null, null]
    const data = jwt.decode(token)
    return [true, data['firstname'], data['avatar']]
}

export function getUserIDByCookie(token) {
    if (!token) return null
    let data = jwt.decode(token)
    console.log(data)
    return [data['id']]
}