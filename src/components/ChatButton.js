const ChatButton = ({name}, {value}) => {
    return (
        <div>
          <button className="app__chat--buttons-button" value={value}>{name}</button>  
        </div>
    )
}

export default ChatButton;