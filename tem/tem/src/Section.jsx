import { useContext } from 'react';
import { LevelContext } from './LevelContext';

export default function Section({ children, level }) {
  const currentLevel = useContext(LevelContext);
  const nextLevel = level || currentLevel + 1;

  return (
    <section className="section">
      <LevelContext.Provider value={nextLevel}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}