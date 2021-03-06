import React from 'react';
import Admin from './Admin';
import UserBasic from '../UserBasic/UserBasic';
import { useSelector } from 'react-redux';

export default function DefaultRoom() {
  const { me } = useSelector(state => state.mypage);
  if (me.code === 3) {
    return <UserBasic></UserBasic>;
  } else {
    return <Admin></Admin>;
  }
}
