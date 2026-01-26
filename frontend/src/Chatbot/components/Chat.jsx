import bot_logo from '../assets/chat-bot-logo.jpg';
import user_logo from '../assets/chat-user-logo.jpg';
import Icon from './Icon';
import Iconlist from './Iconlist';
function Chat(){
    return (
        <>
            <div className='bg-slate-900 min-h-screen flex flex-col'>
                
                <div className="h-[70px] bg-slate-800 sticky top-0 z-50 flex items-center justify-center">
                    
                    <div className='h-[50px] w-[50px] rounded-full  mr-2 relative'>
                        <img className='h-full w-full object-cover rounded-full' src={bot_logo} alt='bot_logo'/>     
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-green-400 rounded-full"></span>
                    </div>
                    
                    <div className='flex flex-col gap-1'>
                        <p className='text-white text-3xl'>Nova-Ai</p>
                        <p className='text-green-300 text-sm'>Online</p>
                    
                    </div>
                
                </div>
                
                <div className="flex flex-1">
                    
                    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-32">
                        <div className="max-w-3xl mx-auto text-white">
                            
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 to-transparent">
                        <div className="max-w-3xl mx-auto px-4 pb-4">
                        <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-3 shadow-lg border border-slate-700">

                            <input
                            type="text"
                            placeholder="Send a message..."
                            className="flex-1 bg-transparent text-white outline-none placeholder-gray-400"
                            />

                            <button className="bg-green-500 hover:bg-green-600 p-2 rounded-lg">
                            ➤
                            </button>

                        </div>
                        </div>
                    </div>


                </div>
            </div>
            
        </>
    )
}

export default Chat;