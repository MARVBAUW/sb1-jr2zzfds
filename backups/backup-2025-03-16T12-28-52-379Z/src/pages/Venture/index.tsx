import React, { useState } from 'react';
import { ProfileSelection } from './ProfileSelection';
import { ProjectForm } from './ProjectForm';
import { ProjectSwiper } from './ProjectSwiper';

type UserProfile = 'investor' | 'creator' | null;

export function Venture() {
  const [userProfile, setUserProfile] = useState<UserProfile>(null);

  if (!userProfile) {
    return <ProfileSelection onSelect={(profile) => setUserProfile(profile as UserProfile)} />;
  }

  if (userProfile === 'creator') {
    return <ProjectForm />;
  }

  return <ProjectSwiper />;
}