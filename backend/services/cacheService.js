class CacheService {
  static cache = new Map();
  static defaultTTL = 5 * 60 * 1000; // 5 minutes
  static MAX_CACHE_SIZE = 1000; // Maximum number of items
  static MAX_ITEM_SIZE = 1024 * 1024; // 1MB per item
  static CLEANUP_INTERVAL = 60 * 1000; // 1 minute

  static {
    // Start cleanup interval
    setInterval(() => {
      this.cleanupExpired();
    }, this.CLEANUP_INTERVAL);
  }

  static set(key, value, ttl = this.defaultTTL) {
    // Check cache size and evict if necessary
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.evictLRU();
    }

    // Check item size
    const itemSize = this.getItemSize(value);
    if (itemSize > this.MAX_ITEM_SIZE) {
      console.warn(`Cache item too large (${itemSize} bytes), not caching`);
      return;
    }

    const item = {
      value,
      expiry: Date.now() + ttl,
      size: itemSize,
      lastAccessed: Date.now(),
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

    // Update last accessed time
    item.lastAccessed = Date.now();
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

  static evictLRU() {
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, item] of this.cache.entries()) {
      if (item.lastAccessed < oldestTime) {
        oldestTime = item.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  static cleanupExpired() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  static getItemSize(item) {
    try {
      return Buffer.byteLength(JSON.stringify(item));
    } catch (error) {
      console.error("Error calculating item size:", error);
      return 0;
    }
  }

  static invalidatePattern(pattern) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(pattern)) {
        this.cache.delete(key);
      }
    }
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
