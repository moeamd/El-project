export default function CustomButton(props) {
    return  <button
        onClick={props.onClick}
        type={props.type}
        className="w-full py-3 bg-[#3DCBB1] text-white rounded-lg hover:bg-gray-500 transition rounded-xl[14px] text-16px "
      >
      {props.text}
      </button>
      
}