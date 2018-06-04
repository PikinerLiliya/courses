import React from 'react';
import { NavLink } from 'react-router-dom'

export default function () {
  return (
    <div>
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/addPost">Add Posts</NavLink>
      <NavLink to="/myProfile">My Profile</NavLink>
    </div>
  );
}