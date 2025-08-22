import './ProfilePage.css';
import Image from '../../components/Image/Image';
import Gallery from '../../components/Gallery/Gallery';
import Boards from '../../components/Boards/Boards';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import FollowButton from './FollowButton';

const ProfilePage = () => {
  const [type, setType] = useState('saved');
  const { username } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return 'Loading...';

  if (error) return 'Something went wrong...';

  if (!data) return 'User data not found';

  return (
    <div className="profilePage">
      <Image path={data.img || '/general/noAvatar.png'} />
      <h1 className="profileName">{data.displayName}</h1>
      <span className="profileUsername">@{data.username}</span>
      <div className="followCounts">
        {data.followerCount} followers . {data.followingCount} following
      </div>
      <div className="profileInteractions">
        <Image path="/general/share.svg" />
        <div className="profileButtons">
          <button>Message</button>
          <FollowButton isFollowing={data.isFollowing} username={data.username} />
        </div>
        <Image path="/general/more.svg" />
      </div>
      <div className="profileOptions">
        <span onClick={() => setType('created')} className={type === 'created' ? 'active' : ''}>
          Created
        </span>
        <span onClick={() => setType('saved')} className={type === 'saved' ? 'active' : ''}>
          Saved
        </span>
      </div>
      {type === 'created' ? <Gallery userId={data._id} /> : <Boards userId={data._id} />}
    </div>
  );
};

export default ProfilePage;
