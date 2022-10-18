import {ADOBE_FONTS, GOOGLE_FONTS} from '../constants/config';

function WebFonts(){
	const JSX_ADOBE = ADOBE_FONTS ? (
		<div>
			<link
				rel="stylesheet" 
				href={ADOBE_FONTS}
			/>
		</div>
	) : '';
	const JSX_GOOGLE = GOOGLE_FONTS ? (
		<div>
			<link 
				rel="preconnect" 
				href="https://fonts.googleapis.com"
			/>
			<link 
				rel="preconnect" 
				href="https://fonts.gstatic.com" 
				crossOrigin="crossOrigin"
			/>
			<link 
				href={GOOGLE_FONTS}
				rel="stylesheet"
			/> 
		</div>
	) : '';
	if (ADOBE_FONTS || GOOGLE_FONTS){
		return(
			<div>
				{JSX_ADOBE}
				{JSX_GOOGLE}
			</div>
		)
	} else {
		return (
			<div></div>
		)
	}
}

export default WebFonts;