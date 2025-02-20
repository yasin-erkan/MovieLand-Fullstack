import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import api from '../utils/api';
import Loader from '../components/Loader';
import Error from '../components/Error';
import DeleteButton from '../components/DeleteButton';
import ListField from '../components/ListField';

const Detail = () => {
  const {id} = useParams();

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: ['movie'],
    queryFn: () => api.get(`/api/movies/${id}`).then(res => res.data),
  });

  if (isLoading) return <Loader />;

  if (error) return <Error info={error} refetch={refetch} />;

  return (
    <div className="bg-gray-800 text-white p-8 md:p-16 rounded-lg shadow-lg max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <DeleteButton id={data.id} />
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/3">
          <img
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            src={`https://picsum.photos/seed/${data.id}/300/450`}
            alt="poster"
          />
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <p className="text-lg">{data.description}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Audience Rating"
              value={Number(data.rating).toFixed(1)}
            />
            <Field label="Duration" value={data.duration} />
            <Field label="Language" value={data.language} />
            <Field label="Year" value={data.year} />
            <Field label="Director" value={data.director} />
          </div>

          <div className="mt-6">
            <ListField label="Cast" arr={data.cast} />
            <ListField label="Genres" arr={data.genre} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

const Field = ({label, value}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center">
      <span className="font-semibold text-sm sm:w-32">{label}:</span>
      <span className="p-2 px-4 rounded-full font-semibold bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-300">
        {value}
      </span>
    </div>
  );
};
