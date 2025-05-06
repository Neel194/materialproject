class CacheService {
  static cache = new Map();
  static defaultTTL = 5 * 60 * 1000; // 5 minutes

  static set(key, value, ttl = this.defaultTTL) {
    const item = {
      value,
      expiry: Date.now() + ttl,
    };
    this.cache.set(key, item);
  }

  static get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  static delete(key) {
    this.cache.delete(key);
  }

  static clear() {
    this.cache.clear();
  }

  static generateKey(prefix, params) {
    return `${prefix}:${JSON.stringify(params)}`;
  }

  // Cache middleware for Express
  static cacheMiddleware(ttl = this.defaultTTL) {
    return (req, res, next) => {
      const key = this.generateKey(req.originalUrl, req.query);
      const cachedResponse = this.get(key);

      if (cachedResponse) {
        return res.json(cachedResponse);
      }

      // Store original res.json
      const originalJson = res.json;

      // Override res.json
      res.json = function (body) {
        CacheService.set(key, body, ttl);
        return originalJson.call(this, body);
      };

      next();
    };
  }
}

module.exports = CacheService;
