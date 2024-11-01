import React from 'react';
import { Footer } from '../Footer';

const BlogLayout = ({ children }) => {
  return (
    <div className='w-full'>
      {children}
      <Footer />
    </div>
  );
};

export default BlogLayout;