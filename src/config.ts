export const config = {
  listenPort: 6010,
  database: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/blockchain-lab01-pt2'
  }
}
