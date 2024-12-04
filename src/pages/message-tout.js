import { useDispatch } from "react-redux";
import { modifiesession } from "./session";

export const Message_Tous=({messages,loding,sessionid})=>{

    const dispatch = useDispatch()
  
    const filtermsgbold =(item)=>{
        const partiemsg = item.split('*')
          return partiemsg?.map((item,i)=>( i % 2 ===0 ?item:<em key={i}>{item}</em>));
      }



      const filtermsgitalique = (item) =>{
        const parts = item.split('`');
        return parts?.map((part, i) => (i % 2 === 0?filtermsgbold(part):<i key={i}>"{part}"</i>));
      };



      const filtermsgstrong =(prt)=>{
        const partiemsg = prt.split('**')
        return partiemsg?.map((item,i)=>(i % 2 ===0 ?filtermsgitalique(item):<b key={i}>{item}</b>))
      }
       const filerbalisbr = (message)=>{
        const partiemsg = message.split('--')
        return (<>
                {partiemsg?.map((item,i)=>(item?<span key={i}>{filtermsgstrong(item)} <br/></span>:''))}
        </>)
       }
      // console.log(messages)
    
    
      const renderMessage = (msg) => {
        const codeRegex = /```(\w+)?\n([\s\S]*?)```/;
        const match = msg?.content.match(codeRegex);
    // console.log(msg.content);
    // console.log(match);
        if (match) {
          const language = match[1] || 'javascript';
          const codeContent = match[2];
          const toutpartiemess = msg?.content.split('```')
          
          
          return (
            <>
            {
              toutpartiemess?.map((prt,i)=>{
                return(
                  < div key={i}>
                  {
                    i % 2 === 0 ?<p>{filerbalisbr([...prt.split('\n')].join('--'))}</p>
                    :<pre>
                        <button className="btn-copy" type="button" onClick={(e)=>{
                            navigator.clipboard.writeText(prt);
                            e.target.classList.add('copied');
                            setTimeout(() => {
                                e.target.classList.remove('copied');
                            },2000)
                        }}>
                            <span>copy</span>
                        </button>
                    <code className={`language-${language}`}>
                      {prt}
                    </code>
                  </pre>
                  }
                  </div>
                )
              })
            }
            </>
          );
        } else {
          return <span>{filerbalisbr([...msg.content.split('\n')].join('--'))}</span>;
        }
      };
    return(
                            <div className='affiche-message-tous'>
                              
                                {messages?.map((msg, index) => (
                                <div key={index} className={msg.role === 'user' ?'user-message':'Assistant-message'}>
                                    <div>{msg.role === 'user' ? '' : <img src='/logo.png' className='img-message-assistant'/>}   </div>
                                    <div className='message'>{renderMessage(msg)}</div>
                                </div>
                                ))}
                                {
                                  loding?<p className="writing-indicator">write</p>:''
                                }
                            </div>
    )
}