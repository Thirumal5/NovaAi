import MenuIcon from '../assets/three-bars-icon.jpg';
import HomeIcon from '../assets/home-page-icon.jpg';
import JobIcon from '../assets/job-page-icon.jpg';
import ChatIcon from '../assets/chat-bot-logo.jpg';
import StudyIcon from '../assets/study-page-icon.jpg';
import UserIcon from '../assets/chat-user-logo.jpg';
import Icon from './Icon.jsx';

export default function Iconlist(){

    const icons_list = [
        {id:2, image:HomeIcon},
        {id:3, image:JobIcon},
        {id:4, image:ChatIcon},
        {id:5, image:StudyIcon},
        {id:6, image:UserIcon},
    ]

    return (
        <div className='pt-[10px] flex flex-col justify-center gap-5'>
            {icons_list.map((ic)=>
                <Icon key={ic.id} image={ic.image}/>
            )}
        </div>
    );
}