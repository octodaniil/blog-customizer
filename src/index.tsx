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
	const [siteSetting, setSiteSettings] = useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': siteSetting.fontFamilyOption.value,
					'--font-size': siteSetting.fontSizeOption.value,
					'--font-color': siteSetting.fontColor.value,
					'--container-width': siteSetting.contentWidth.value,
					'--bg-color': siteSetting.backgroundColor.value,
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
