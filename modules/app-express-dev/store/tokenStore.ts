import { LRUCacheTokenStore } from "../../api-security/store/LRUCacheTokenStore";

export const tokenStore = new LRUCacheTokenStore(10);