import type { NextConfig } from 'next'
import path from 'path';
 
const nextConfig: NextConfig = {
  pageExtensions: ['page.tsx', 'page.ts', 'jsx', 'js'], // Excludes *.test.tsx files
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@import "${path.join(__dirname, 'styles/core/base-init.scss')}";`,
  },
}
 
export default nextConfig