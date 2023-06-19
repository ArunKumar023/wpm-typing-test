import React, { useEffect } from 'react';
import { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Button } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [user, Loading] = useAuthState(auth);
  const [dataLoading, setDataLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUserData = () => {
    const resultsRef = db.collection('Result');
    console.log(resultsRef);
    const { uid } = auth.currentUser;
    console.log(uid);
    let tempData = [];
    let tempGraphData = [];
    resultsRef
      .where('userId', '==', uid)
      .orderBy('timeStamp', 'desc')
      .get()
      .then((snapshot) => {
        console.log('snapshot');
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([
            doc.data().timeStamp.toDate().toLocaleString().split(',')[0],
            doc.data().wpm,
          ]);
        });
        setData(tempData);
        console.log(data);
        setGraphData(tempGraphData.reverse());
        setDataLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    if (!Loading) {
      fetchUserData();
    }
    if (!Loading && !user) {
      navigate('/');
    }
  }, [Loading]);

  const handleBackButtonClick = () => {
    navigate('/');
  };

  if (Loading || dataLoading) {
    return (
      <div className='center-of-screen'>
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div className='canvas'>
      <div className='profile-header'>
        <Button style={{marginLeft:"-1200px" }}  onClick={handleBackButtonClick} startIcon={<ArrowBackIcon />} />
      </div>
      <UserInfo totalTestTaken={data.length} />
      <div className='graph-user-page'>
        <Graph graphData={graphData} />
      </div>
      <TableUserData data={data} />
    </div>
  );
};

export default UserPage;
