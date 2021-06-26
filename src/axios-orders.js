import axios from 'axios'

const instance = axios.create({
    baseUrl: 'https://react-burger-builder-28789-default-rtdb.europe-west1.firebasedatabase.app'
})

export default instance