const isProd = process.env.NODE_ENV === "production"

export const basename = isProd ? process.env.REACT_APP_BASE_URL : ''
