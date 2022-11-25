import Image from "next/image";

function Perfil({logged, userName, userIcon}) {
    if (!logged) {
        return (<i className='bi bi-people fs-4'></i>)
    } else
        return (
            <>
                <Image src={userIcon} alt='' height={32} width={32}/>
                <label className='ms-2 cursor-pointer'>{userName}</label>
            </>
        )
}

export default Perfil