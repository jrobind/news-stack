export default async ({ lat, lng }) => {
	try {
		const weather = await fetch(`https://api.apixu.com/v1/forecast.json?key=945662b0093f46b9a3f212001191102&q=${lat}=${lng}&days=6`);
		return weather.json();
	} catch(e) {
		return handleError(e);
	}
}

export const fetchUVIndex = async ({ lat, lon }) => {
	try {
		const uvIndex = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=63a86f0f410d1650aed27460d8b457a4`);
		return uvIndex.json();
	} catch(e) {
		throw e;
	}
}

export const fetchPollutionIndex = async ({ lat, lon }) => {
	try {
		const pollutionIndex = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=NQWFi7DBJzeXq6m3t`);
		return pollutionIndex.json();
	} catch(e) {
		throw e;
	}
}
