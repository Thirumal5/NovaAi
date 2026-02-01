import { useEffect, useState } from 'react';
import logo from '../assets/chatbotlogo.jpeg'



function Chat(){
    const[message,Setmessage]=useState([])
    const[input,Setinput]=useState('');
    const[loading,setLoading]=useState(false);
     
  async function handleclick()
    {
        
        if(!input.trim())
            return;
       const newMessage = {
         text: input,
           sender: "user"
          };
          Setmessage(prev=>[...prev,newMessage])
            Setinput("")
            setLoading(true)
          try{
            
          const res=await fetch('http://localhost:5000/api/chat',
            {
                method:"POST",
                headers:{
                    "content-type":"application/json",
                },
                body:JSON.stringify({message:input}),
                
            }
          )
          const data=await res.json()

            const botmessage={
                text:data.airesponse,
                sender:"bot"
            }
            Setmessage(prev=>[...prev,botmessage])
         }
          catch(err)
          {
            Setmessage(prev=>[...prev,{text:"Novai Ai error",sender:"bot"}])
          }
          finally
          {
            setLoading(false)
          }
       
    }
    return (
        <>
            <div className='bg-slate-900 min-h-screen flex flex-col'>
                
                <div className="h-[70px] bg-slate-800 sticky top-0 z-50 flex items-center justify-center">
                    
                    <div className='h-[50px] w-[50px] rounded-full  mr-2 relative'>
                        <img className='h-full w-full object-cover rounded-full' src={logo} alt='bot_logo'/>     
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-green-400 rounded-full"></span>
                    </div>
                    
                    <div className='flex flex-col gap-1 ml-10'>
                        <p className='text-white text-3xl'>Nova-Ai</p>
                        <p className='text-green-300 text-sm'>Online</p>
                    
                    </div>
                
                </div>
                
                <div className="flex flex-col ">
                    
                       
                      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-32">
                     <div className="w-full">
                       {message.map((msg, index) => (
                   <div key={index} className={`flex ${msg.sender==='user'?"justify-end":"justify-start"} my-2`}>
                <div className={`${msg.sender === "user" ? "bg-blue-600" : "bg-slate-700"} px-4 py-2 rounded-xl max-w-[70%] text-white`}>

                                 {msg.text}
                    </div>
                         </div>
                        ))}
                        {
                                loading&&(
                        <div className='flex justify-start my-2'>
                            <div className='text-white bg-slate-700 px-4 py-2 rounded-xl'>
                               <p>Novai Ai is typing</p>
                                </div>
                           </div>
                                )}
                    </div>
                 </div>


                       
                           
                      
                    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 to-transparent">
                        <div className="max-w-3xl mx-auto px-4 pb-4">
                        <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-4 py-3 shadow-lg border border-slate-700">

                            <input
                            type="text"
                            value={input}
                            onChange={(e)=>Setinput(e.target.value)}
                            placeholder="Send a message..."
                            className="flex-1 bg-transparent text-white outline-none placeholder-gray-400 p-2"
                            />

                            <button className=" bg-gradient-to-r from-blue-600 to-emerald-600  w-12 hover: bg-gradient-to-r from-blue-600 to-emerald-600  p-1 rounded-lg" onClick={handleclick}>
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