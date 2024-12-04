interface ButtonItems{
    label : string
    onClick : () => void
}

const Button : React.FC<ButtonItems> = ({label, onClick}) => {

    return(
        <>
        <button onClick={onClick} className="w-full text-lg font-thick tracking-wide bg-text text-primary h-14 hover:opacity-75 transition duration-200">
            {label}
        </button>
        </>
    )
}

export default Button