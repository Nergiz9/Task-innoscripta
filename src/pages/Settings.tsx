import React from 'react';
import { FeedSettings } from '../components/Features/FeedSettings/FeedSettings';
import { Heading } from '../components/Elements/Heading/Heading';

const Settings: React.FC = () => {
  return (
    <>
      <Heading title="Settings" subtitle="Customize your news feed" />

      <FeedSettings />
    </>
  );
};

export default Settings;
