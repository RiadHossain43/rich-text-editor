export default function Image(props) {
  if (!!props.src) {
    return <img src={props.src} alt="..." />;
  }
  return null;
}
