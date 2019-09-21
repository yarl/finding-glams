import wdk from "wikidata-sdk";



export function simplifyEntity(entity = {}) {
  const simplificationOptions = {
    // claims
    keepRichValues: true,
    keepQualifiers: true,
    keepReferences: true,
    keepIds: true,
    keepTypes: true,
    keepHashes: true,
    // sitelinks
    addUrl: true
  };
  return wdk.simplify.entity(entity, simplificationOptions);
}
