import React from 'react';
import { Bars } from 'react-loader-spinner';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Bars
      height="80"
      width="80"
      color="#3498db"
      ariaLabel="bars-loading"
    />
  </div>
);

export default Loader;
