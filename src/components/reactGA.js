import ReactGA from 'react-ga'
const isProduction = (process.env.NODE_ENV === 'production')

isProduction && ReactGA.initialize('UA-121564214-2')

export default ReactGA
