import Link from "next/link";
import Script from "next/script";
import Perfil from "./perfil";
import {useEffect} from "react";
import Logo from '/assets/logo.png'
import Image from "next/image";

function Navbar({transparent, userInfo}) {
    const option = userInfo[0] ? "Desconectar" : "Entrar"
    const optionRedirect = userInfo[0] ? "/logout" : "/signin"
    const background = transparent ? "bg-transparent" : "bg-dark"
    useEffect(() => {
        if (userInfo[0]) {
            const cadastrar = document.querySelector('#cadastrar')
            if (cadastrar != null) cadastrar.remove()
        }
    })
    return (
        /* Código da barra de navegação superior */
        <>
            <nav
                className={['navbar navbar-dark navbar-expand-lg position-relative py-lg-2 py-3', background].join(" ")}>
                <div className="container-fluid">
                    <Link href='/'><a
                        className="navbar-brand ms-lg-5 mx-auto"><Image src={Logo} width={72} height={72} alt="Integraliza"/></a></Link> {/* Logo da barra de navegação */}
                    {/* Ícone para estender na barra de navegação em resoluções pequenas */}
                    <button className="navbar-toggler me-2 position-absolute top-0 start-0 mt-3 ms-3" type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Links da barra de navegação */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="ms-lg-3 navbar-nav ms-lg-auto me-lg-5 mt-3 align-items-center my-lg-auto">
                            <Link href='/buy'>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page">Imprimir</a>
                                </li>
                            </Link>
                            <Link href='/#sobre'>
                                <li className="nav-item">
                                    <a className="nav-link">Sobre</a>
                                </li>
                            </Link>
                            <div id='cadastrar'>
                                <Link href='/signout'>
                                    <li className="nav-item">
                                        <a className="nav-link">Cadastrar</a>
                                    </li>
                                </Link>
                            </div>
                            <li className='nav-item dropdown px-4'>
                                {/* Dropdown do terceiro link */}
                                <a className='nav-link dropdown-toggle d-flex align-items-center' href="#" role="button"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    <Perfil logged={userInfo[0]} userName={userInfo[1]} userIcon={userInfo[2]}/>
                                </a>
                                <ul className='dropdown-menu dropdown-menu-md-center dropdown-menu-end rounded-4 px-4 py-3'>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li><Link href='/pedidos'><a href='#'
                                                                 className='dropdown-item link-primary rounded-3 py-2'><i
                                        className="bi bi-bag me-2"></i>Meus Pedidos</a></Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li><Link href='/perfil'><a className='dropdown-item link-primary rounded-3 py-2'><i
                                        className="bi bi-person me-2"></i>Minha Conta</a></Link></li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li><Link href={optionRedirect}><a href='#'
                                                                       className='dropdown-item link-primary rounded-3 py-2'><i
                                        className="bi bi-gear me-2"></i>{option}</a></Link></li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8"
                    crossOrigin="anonymous"></Script>
        </>
    )
}

export default Navbar