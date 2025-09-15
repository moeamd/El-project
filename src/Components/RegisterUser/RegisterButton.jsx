
function RegisterButton(props) {
    return (
        <button onClick={props.onClick}
            className={props.bgColor + props.hover +
                " w-full text-white font-semibold py-[9px] rounded-[14px] items-center border"}>
            <div className='flex justify-center items-center'>
                {<img src={props.image} className='w-[20px] h-[20px] mr-2 rounded-4xl' alt="loading" />}
                <span className={props.textColor}>{props.text}</span>
            </div>
        </button>
    )
}

export default RegisterButton