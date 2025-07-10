import {createClient} from 'redis'
import config from './index.js';


const redisClient = createClient({
  url: config.redis.redis_url,
});

redisClient.on('error', (err) => console.error('❌ Redis error:', err));


export {
    redisClient
}