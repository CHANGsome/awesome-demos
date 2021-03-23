import React from 'react';

require('img/prev.svg');
require('img/next.svg');
require('img/pause.svg');
require('img/play.svg');
require('img/wave.svg');

type PropsType = {
  name: string;
} & React.SVGAttributes<SVGElement>;

const Icon: React.FC<PropsType> = (props) => {
  const { name, children, ...rest } = props;
  return (
    <svg {...rest}>
      <use xlinkHref={'#' + name} />
    </svg>
  );
};

export default Icon;
