import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir:'./tests', use:{baseURL:'http://localhost:4321',channel:'msedge'}, webServer:{command:'npm run dev',url:'http://localhost:4321',reuseExistingServer:true}, reporter:'list' });
