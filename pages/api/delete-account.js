import nookies, {parseCookies} from "nookies";
import {getUserIDByCookie} from "../../contexts/Utils";
import executeQuery from "../../services/database";

async function handler(req, res) {
    if (req.method === 'POST') {
        const { ['impress.token']: token } = parseCookies({req})
        if (token == null) {
            res.status(406).json('No account login')
        }else {
            const id = getUserIDByCookie(token)
            try {
                await executeQuery({
                    query: 'DELETE FROM users WHERE id=?',
                    values: [id],
                })
                nookies.destroy({res}, 'impress.token', {priority: "high", path: '/'});
                res.redirect(307, '/signin')
            }catch (error) {
                res.status(503).json('Erro')
                console.log(error)
                return false
            }
        }
    }else {
        res.status(405).json('Invalid request method')
    }
}

export default handler