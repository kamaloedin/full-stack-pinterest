import { useSearchParams } from 'react-router';
import Gallery from '../../components/Gallery/Gallery';
import './SearchPage.css';

const SearchPage = () => {
  let [searchParams] = useSearchParams();

  const search = searchParams.get('search');
  const boardId = searchParams.get('boardId');
  return (
    <div>
      <Gallery search={search} boardId={boardId} />
    </div>
  );
};

export default SearchPage;
