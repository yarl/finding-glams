import { simplify } from "wikidata-sdk";

export function getIDsList(entity = {}) {
  const { claims = [] } = simplify.entity(entity, { keepTypes: true });
  const ids = [];

  Object.values(claims).forEach(values =>
    values
      .filter(value => value.type === "wikibase-item")
      .forEach(value => ids.push(value.value))
  );

  return [...Object.keys(claims), ...ids];
}
