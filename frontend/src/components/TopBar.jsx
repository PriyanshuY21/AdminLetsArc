import PropTypes from 'prop-types';

const TopBar = ({ buttonText, handleButtonClick }) => {
  return (
    <div className="flex h-20 items-center justify-end bg-indigo-100">
      <button
        type="button"
        className="mr-3.5 h-12 w-36 rounded-lg bg-blue1/90 text-xl font-semibold tracking-wider text-white2 hover:bg-blue1 disabled:opacity-85"
        onClick={handleButtonClick}
        aria-label={buttonText}
      >
        {buttonText}
      </button>
    </div>
  );
};

TopBar.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

TopBar.defaultProps = {
  buttonText: 'Click Me',
};

export default TopBar;
