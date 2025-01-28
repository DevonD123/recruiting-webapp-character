import React from 'react';
import Classes from './classes/classes';
import Modifiers from './modifiers/modifiers';
import Skills from './skills/skills';
import SaveButton from './actions/SaveButton';
import SkillCheck from './skillcheck/SkillCheck';

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <div className="layout">
        <Modifiers />
        <Classes />
        <Skills />
      </div>
      <div style={{ margin: '5px auto', width: 200, textAlign: 'center' }}>
        <SaveButton />
      </div>
      <SkillCheck />
    </div>
  );
};

export default Layout;
