import React from 'react';
import InputField from '../components/InputField';
import {inputs} from '../utils/constants';
import api from '../utils/api';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const movieData = Object.fromEntries(formData.entries());

    console.log(movieData);

    movieData.genre = movieData.genre.split(',');

    movieData.cast = movieData.cast.split(',');

    api
      .post('/api/movies', movieData)
      .then(res => {
        //send note
        toast.success('New Movie added');

        //dto Detail
        navigate(`/movie/${res.data.id}`);
      })
      .catch(err => {
        console.log('hata oldu', err);
        toast.error('Üzgünüz :( İşlem Başarısız');
      });
  };

  return (
    <div className="min-h-screen bg-yellow-600 flex items-center justify-center px-5 py-8">
      <div className="bg-white w-full max-w-[1000px] p-10 rounded shodow-lg grid grid-cols-1 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <h1 className="text-3xl font-semibold">Yeni Film Oluştur</h1>

          {inputs.map(props => (
            <InputField {...props} />
          ))}
          <button className="shadow border py-3 rounded-lg hover:shadow-lg hover:bg-gray-200 transition">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
