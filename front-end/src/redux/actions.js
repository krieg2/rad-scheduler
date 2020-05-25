export const actionTypes = {
    REQ_EVENTS: 'REQ_EVENTS',
    RCV_EVENTS: 'RCV_EVENTS',
    ERR_EVENTS: 'ERR_EVENTS'
  };
    
  export const requestEvents = () => ({
    type: actionTypes.REQ_EVENTS
  });
  
  export const receiveEvents = (events) => ({
    type: actionTypes.RCV_EVENTS,
    payload: { events }
  });
  
  export const errorEvents = (error) => ({
    type: actionTypes.ERR_EVENTS,
    payload: { error }
  });