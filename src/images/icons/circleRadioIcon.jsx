export const CircleRadioIcon = ({baseColor = 'white', isActive}) => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Checked Radio button">
      <circle id="Ellipse 38" cx="8.41406" cy="8.64258" r="7.5" stroke={baseColor} />
      {isActive ? (
        <circle id="Ellipse 39" cx="8.41406" cy="8.64258" r="5" fill={baseColor} />
      ) : null}
    </g>
  </svg>
);
