import css from './Button.module.css';

export const Button = ({ title, transparent }) => {
  return (
    <button
      className={`${css.button} ${transparent ? css.transparent : css.general}`}
    >
      {title}
    </button>
  );
};
