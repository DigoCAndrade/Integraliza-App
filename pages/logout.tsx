import {GetServerSideProps} from "next";
import nookies from "nookies";


export function Logout() {
    return <></>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    nookies.destroy(ctx, 'impress.token', {priority: "high", path: '/'});
    return {
        redirect: {
            destination: '/signin',
            permanent: false,
        }
    }
}

export default Logout