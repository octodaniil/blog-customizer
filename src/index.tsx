import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArticleStateType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [siteSettings, setSiteSettings] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': siteSettings.fontFamilyOption.value,
					'--font-size': siteSettings.fontSizeOption.value,
					'--font-color': siteSettings.fontColor.value,
					'--container-width': siteSettings.contentWidth.value,
					'--bg-color': siteSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setSiteSettings={setSiteSettings}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
