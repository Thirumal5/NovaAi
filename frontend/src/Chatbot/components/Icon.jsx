import icon from '../assets/three-bars-icon.jpg';

function Icon({image = icon}){
    return(
        <>
            <div className='flex flex-col items-center justify-center '>
                <img className="h-[42px] w-[42px] rounded-full 
                   hover:scale-110 transition cursor-pointer" src={image} alt="chat-icon" />
            </div>
        </>
    );
}
export default Icon;