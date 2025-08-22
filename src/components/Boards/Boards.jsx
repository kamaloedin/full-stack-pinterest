import './Boards.css';
import Image from '../Image/Image';
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import { format } from 'timeago.js';
import { Link } from 'react-router';

const Boards = ({ userId }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['boards', userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return 'Loading...';

  if (error) return 'Something went wrong...';

  if (!data) return 'User data not found';

  return (
    <div className="collections">
      {data?.map((board) => (
        <Link to={`/search?boardId=${board._id}`} className="collection" key={board._id}>
          <Image src={board.firstPin.media} alt="" />
          <div className="collectionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} Pins . {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
