import arrow from 'src/images/arrow.svg';
import clsx from 'clsx'
import styles from './ArrowButton.module.scss';

export type OnClick = {
	isOpen: boolean;
	onClick: () => void;
};

export const ArrowButton = (props: OnClick) => {
	const { isOpen, onClick } = props;

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={onClick}
		>
			<img
				src={arrow}
				alt='Иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
