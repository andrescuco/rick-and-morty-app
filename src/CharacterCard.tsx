import { Character } from "./types";

type CharacterCardProps = Omit<Character, "id">;

export default function CharacterCard({
  image,
  name,
  status,
  species,
  location
}: CharacterCardProps) {
  return (
    <div className="character-card-container">
      <div className="character-image-container">
        <img src={image} alt={`character ${name}`} />
      </div>
      <div className="character-info-container">
        <h1>{name}</h1>
        <span>
          {status} - {species}
        </span>
        <br></br>
        <span>Location</span>
        <br></br>
        <span>{location.name}</span>
      </div>
    </div>
  );
}
