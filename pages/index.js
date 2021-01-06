import React from 'react';
import Link from 'next/link';

const Index = () => (
  <>
    {'Hello, World!\n Checkout my '}    
    <Link href="/my-first-blog-post">
      <a>First Blog Post</a>
    </Link>
  </>
)

export default Index;
