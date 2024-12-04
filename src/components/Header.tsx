
interface HeaderItem {
    onClick : () => void
}

const Header : React.FC<HeaderItem> = ({onClick}) => {

    return(
        <>
            <div className="w-full bg-primary py-4 px-8 fixed top-0 z-100"> 
                <p className="text-3xl font-bold tracking-widest">RoleMaster</p>
                <button onClick={onClick} className="absolute right-5 top-5">Thme</button>
            </div>
        </>
    )
}

export default Header