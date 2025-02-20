import {useSearchParams} from 'react-router-dom';

const Hero = () => {
  const [params, setParams] = useSearchParams();

  // when the form is submitted
  const handleSubmit = e => {
    // prevent page refresh
    e.preventDefault();

    // access the searched keyword
    const text = e.target[0].value;

    // add the text from the form to the URL as a parameter
    setParams({query: text});
  };

  return (
    <div className="px-10 py-20 lg:px-20 bg-[linear-gradient(#00000071,#00000071),url('prison.jpg')] bg-center bg-cover text-white">
      <h1 className="text-4xl text-blue-100 md:text-5xl font-bold">Welcome </h1>
      <h2 className="text-xl  text-blue-100 sm:text-2xl md:text-3xl font-bold">
        Discover Millions of Movies, Series, and Actors
      </h2>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg overflow-hidden flex mt-5">
        <input
          defaultValue={params.get('query')}
          className="w-full py-2 px-4 text-black"
          type="text"
          placeholder="Search Movies, Series, Actors..."
        />
        <button className="bg-blue-500 px-5 font-semibold hover:bg-blue-600">
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
