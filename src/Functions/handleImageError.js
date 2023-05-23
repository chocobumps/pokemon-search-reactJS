import image_not_available from "../images/image_not_available.png"

export default function handleImageError(event) {

        event.target.src = image_not_available;
}