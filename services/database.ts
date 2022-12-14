import mysql from 'serverless-mysql'

const database = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    },
})


export default async function executeQuery({query, values}) {
    try {
        const results = await database.query(query, values)
        await database.end()
        return results
    } catch (error) {
        console.log(error)
        return { error }
    }
}

