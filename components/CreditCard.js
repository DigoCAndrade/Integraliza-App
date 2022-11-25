import Style from '../styles/card.module.css'

function CreditCard({name, number, expiry}) {
    if (number == null || undefined) number = "0000 0000 0000 0000"
    if (name == null || undefined) name = "John Doe"
    if (expiry == null || undefined) expiry = "00/00"
    return (
        <>
            <div className={Style.card}>
                <p className={Style.number}>{number}</p>
                <p className={Style.name}>{name}</p>
                <p className={Style.expiry}>{expiry}</p>
            </div>
        </>
    )
}

export default CreditCard