const Notification = ({ message }) => {
  if (!message || !message.msg) {
    return null;
  }

  return (
    <>
      {message.status === 'success' && (
        <div className='success'>
          {message.msg}
        </div>
      )}
      {message.status === 'error' && (
        <div className='error'>
          {message.msg}
        </div>
      )}
    </>
  );
}

export default Notification;