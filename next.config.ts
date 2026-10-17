import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next', outputFileTracingRoot: process.cwd(), images: { unoptimized: true }, devIndicators: false };
export default config;
