require('img/prev.svg');
require('img/next.svg');
require('img/pause.svg');
require('img/play.svg');
require('img/wave.svg');

type PropsType = {
  name: string;
};

const Icon: React.FC<PropsType> = (props) => {
  const { name } = props;
  return (
    <svg>
      <use xlinkHref={'#' + name} />
    </svg>
  );
};

export default Icon;
