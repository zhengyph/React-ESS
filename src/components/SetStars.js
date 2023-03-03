import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as solidStar, faStarHalfAlt as halfStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as regularStar} from "@fortawesome/free-regular-svg-icons";

function starColor(num) {
	if (num >= 5) {
		return '#26d221';
	} else if (num > 3) {
		return '#f0b41e';
	} else {
		return '#ff4500';
	}
}

function renderStars(num) {
	const fullStars = Math.floor(num);
	const halfStars = Math.round(num - fullStars);
	const emptyStars = 5 - fullStars - halfStars;

	const stars = [];
	for (let i = 0; i < fullStars; i++) {
		stars.push(<FontAwesomeIcon
			key={i} icon={solidStar} style={{ color: starColor(num) }}
		/>);
	}
	if (halfStars) {
		stars.push(<FontAwesomeIcon
			key={stars.length} icon={halfStar} style={{ color: starColor(num) }}
		/>);
	}
	for (let i = 0; i < emptyStars; i++) {
		stars.push(<FontAwesomeIcon
			key={i + fullStars + halfStars} icon={regularStar} style={{ color: starColor(num) }}
		/>);
	}
	return stars;
}

export default renderStars;
