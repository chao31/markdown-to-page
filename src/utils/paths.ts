// return the new address linked to 
function getAnchorLink({search, pathname, to, anchorId} : AnchorLink) {
  let searchParams = new URLSearchParams(search);
  searchParams.set(anchorId, to);
  return `#${pathname}?${searchParams.toString()}`;
}

export { getAnchorLink };