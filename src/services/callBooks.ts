export async function getFirstAlbumTitle() {
  const data = await fetch("https://jsonplaceholder.typicode.com/albums");
  const response = await data.json();
  return response?.[0].title;
}
