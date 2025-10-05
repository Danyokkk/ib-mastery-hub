import React from 'react';
import { AtlSkill, User } from '../../types';
import Card from '../shared/Card';

interface AtlSkillsChartProps {
  skills: User['atlSkills'];
  focusedSkills?: AtlSkill[];
}

const AtlSkillsChart: React.FC<AtlSkillsChartProps> = ({ skills, focusedSkills = [] }) => {
  const size = 200;
  const center = size / 2;
  const labels: AtlSkill[] = Object.keys(skills) as AtlSkill[];
  const numSides = labels.length;
  
  // Calculates absolute positions for labels outside the transformed group
  const getAbsolutePoint = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / numSides - Math.PI / 2;
    const radius = (value / 100) * (center * 0.8);
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };
  
  // Calculates relative positions for elements inside the transformed group
  const getRelativePoint = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / numSides - Math.PI / 2;
    const radius = (value / 100) * (center * 0.8);
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  };

  const points = labels.map((label, i) => {
    const { x, y } = getRelativePoint(skills[label], i);
    return `${x},${y}`;
  }).join(' ');

  return (
    <Card>
      <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">ATL Skills Radar</h2>
      <div className="flex justify-center items-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${center}, ${center}) scale(0.9)`} transform-origin={`${center} ${center}`}>
            {/* Grid lines */}
            {[25, 50, 75, 100].map(val => (
                <polygon 
                    key={val}
                    points={labels.map((_, i) => {
                        const {x, y} = getRelativePoint(val, i);
                        return `${x},${y}`
                    }).join(' ')}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                />
            ))}
            
            {/* Axis lines */}
            {labels.map((label, i) => {
              const {x, y} = getRelativePoint(100, i);
              const isFocused = focusedSkills.includes(labels[i]);
              return (
                <line 
                  key={i} 
                  x1={0} 
                  y1={0} 
                  x2={x} 
                  y2={y} 
                  stroke={isFocused ? "#A7F3D0" : "#E5E7EB"} 
                  strokeWidth={isFocused ? "2" : "1"} 
                />
              )
            })}
            
            {/* Data shape */}
            <polygon points={points} fill="rgba(34, 197, 94, 0.3)" stroke="#16A34A" strokeWidth="2" />
            
             {/* Data points */}
            {labels.map((label, i) => {
                 const { x, y } = getRelativePoint(skills[label], i);
                 const isFocused = focusedSkills.includes(labels[i]);
                 return (
                    <g key={label}>
                        <circle cx={x} cy={y} r={isFocused ? "5" : "3"} fill={isFocused ? "#16A34A" : "#22C55E"} stroke="#fff" strokeWidth="1" />
                    </g>
                 )
            })}
          </g>

           {/* Labels - use absolute points as they are outside the transformed group */}
          {labels.map((label, i) => {
              const {x,y} = getAbsolutePoint(120, i);
              const isFocused = focusedSkills.includes(labels[i]);
              return (
                <text 
                  key={label} 
                  x={x} 
                  y={y} 
                  textAnchor="middle" 
                  alignmentBaseline="middle" 
                  fontSize="11" 
                  fontWeight={isFocused ? "800" : "600"}
                  fill={isFocused ? "#15803D" : "#6B7280"}
                >
                    {label}
                </text>
              )
          })}
        </svg>
      </div>
    </Card>
  );
};

export default AtlSkillsChart;