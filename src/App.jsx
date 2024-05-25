import { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [shrink, setShrink] = useState('');
  const [views, setViews] = useState(-1);
  const [shortId, setShortId] = useState('');

  const HOST = 'https://url-shrink-backend.vercel.app';

  const handleRedirect = (id) => {
    window.open(`${HOST}/u/${id}`, '_blank');
  };

  const shrinkUrl = async () => {
    const response = await axios.post(`${HOST}/new`, {
      url: url
    });

    if (response.status === 200) {
      setShrink(response.data.url);
    }
  };

  const getViews = async (id) => {
    console.log(`Here: ${id}`);
    const response = await axios.get(`${HOST}/info/${id}`);
    console.log(response);
    if (response.status === 200) {
      setViews(response.data.views);
    }
  };

  return (
    <div className='flex items-center justify-center bg-[#000918] w-[100vw] h-[100vh] text-white'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-5xl font-semibold'>Shorten a long URL</h1>
        <form
          autoComplete='off'
          className='flex items-center gap-5'
          onSubmit={(e) => {
            e.preventDefault();
            shrinkUrl();
          }}
        >
          <input
            type='text'
            name='url'
            placeholder='Long URL'
            value={url}
            className='bg-stone-800 p-2 rounded-xl text-2xl'
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className='hover:bg-orange-600 hover:border-2 hover:border-white hover:text-black font-semibold border-2 border-transparent duration-200 bg-orange-700 px-6 py-3 rounded-xl'
            type='submit'
          >
            Shrink
          </button>
        </form>
        {shrink && (
          <p className='text-xl'>
            Your shortened URL is:{' '}
            <a
              className='p-2 rounded-lg font-semibold text-green-500 underline hover:bg-green-500 hover:text-black'
              href={shrink}
            >
              {shrink}
            </a>
          </p>
        )}
        <form
          autoComplete='off'
          className='flex items-center gap-5'
          onSubmit={(e) => {
            e.preventDefault();
            getViews(shortId);
          }}
        >
          <input
            type='text'
            name='url'
            placeholder='Short ID'
            value={shortId}
            className='bg-stone-800 p-2 rounded-xl text-2xl'
            onChange={(e) => setShortId(e.target.value)}
          />
          <button
            onClick={() => {
              handleRedirect(shortId);
            }}
            className='hover:bg-orange-600 hover:border-2 hover:border-white hover:text-black font-semibold border-2 border-transparent duration-200 bg-orange-700 px-6 py-3 rounded-xl'
          >
            Visit
          </button>
          <button
            className='hover:bg-orange-600 hover:border-2 hover:border-white hover:text-black font-semibold border-2 border-transparent duration-200 bg-orange-700 px-6 py-3 rounded-xl'
            type='submit'
          >
            Get Analytics
          </button>
        </form>
        {views >= 0 && <p>Your URL has {views} views.</p>}
      </div>
      <p className='absolute bottom-10'>
        Developed by{' '}
        <a
          className='underline font-semibold underline-offset-4'
          href='https://github.com/nithin-sivakumar'
        >
          Nithin Sivakumar
        </a>
      </p>
    </div>
  );
}

export default App;
