import type { NextConfig } from 'next'
import path from 'path';
 
const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@import "${path.join(__dirname, 'styles/core/base-init.scss')}";`,
  },
}
 
export default nextConfig