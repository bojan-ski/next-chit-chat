import { JSX } from 'react';
import LoadingContainer from '@/components/LoadingContainer';

function loading(): JSX.Element {
  return <div className='global-loading mt-56'>
    <LoadingContainer />
  </div>
}

export default loading