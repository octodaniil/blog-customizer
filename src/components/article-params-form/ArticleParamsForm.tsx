import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useState } from 'react';
import { Select } from '../select/Select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Text } from '../text/Text';
import { Separator } from '../separator/Separator';
import { RadioGroup } from '../radio-group/RadioGroup';
import clsx from 'clsx';

export type ArticleParamsFormSettings = {
	setSiteSettings: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormSettings) => {
	const { setSiteSettings } = props;
	const [isOpen, setOpen] = useState(false);
	const [optionValue, setOptionValue] = useState<ArticleStateType>(defaultArticleState);

	const handleToggleOpen = () => {
		setOpen((currentIsOpen) => !currentIsOpen);
	};

	const updateFormField = (fieldName: string, value: OptionType) => {
		setOptionValue((prevState) => ({
			...prevState,
			[fieldName]: value,
		}));
	};

	const handleChange = (fieldName: string) => (value: OptionType) => {
		updateFormField(fieldName, value);
	};

	const handleReset = (event: FormEvent) => {
		event.preventDefault();
		setOptionValue(defaultArticleState);
		setSiteSettings(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setSiteSettings(optionValue);
	};

	const handleClickOutside = (event: MouseEvent) => {
		const formElement = document.querySelector(`.${styles.container}`);
		if (formElement && !formElement.contains(event.target as Node)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
				>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={optionValue.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='qwe'
						title='Размер шрифта'
						selected={optionValue.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={optionValue.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={optionValue.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={optionValue.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
