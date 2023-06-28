import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.100:42005'

class WSService {

  initializeSocket = async() => {
    try {

      this.socket = io(SOCKET_URL, {
        transports: ['websocket']
      })
      console.log('initializing socket', this.socket)

      this.socket.on('connect', (data) => {
        console.log('=== socket connecter ===')
      })

      this.socket.on('connect', (data) => {
        console.log('=== socket disconnected ===')
      })
      
      this.socket.on('connect', (data) => {
        console.log('socket error', data)
      })
    } catch (error) {
      console.log('socket is not initialized', error)
    }
    
  }
  emit(event, data = {}){
    this.socket.emit(event, data)
  }
  on(event, cb) {
    this.socket.on(event, cb)
  }

  removeListener(listenerName) {
    this.socket.removeListener(listenerName)
  }
}

const socketServices = new WSService()

export default socketServices